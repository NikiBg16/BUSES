// src/controllers/RouteController.ts
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { Route } from "../models/Route";

const routeRepo = AppDataSource.getRepository(Route);

export class RouteController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const routes = await routeRepo.find();
            res.json(routes);
        } catch (err) {
            next(err);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const route = await routeRepo.findOneBy({ id });
            if (!route) return res.status(404).json({ message: "Route not found" });
            res.json(route);
        } catch (err) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body as Partial<Route>;
            const newRoute = routeRepo.create(data);
            const saved = await routeRepo.save(newRoute);
            res.status(201).json(saved);
        } catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const data = req.body as Partial<Route>;
            await routeRepo.update(id, data);
            const updated = await routeRepo.findOneBy({ id });
            if (!updated) return res.status(404).json({ message: "Route not found" });
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const result = await routeRepo.delete(id);
            if (result.affected === 0) return res.status(404).json({ message: "Route not found" });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
