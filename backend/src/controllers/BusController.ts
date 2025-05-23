// src/controllers/BusController.ts
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { Bus } from "../models/bus";

const busRepo = AppDataSource.getRepository(Bus);

export class BusController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const buses = await busRepo.find();
            res.json(buses);
        } catch (err) {
            next(err);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const bus = await busRepo.findOneBy({ id });
            if (!bus) return res.status(404).json({ message: "Bus not found" });
            res.json(bus);
        } catch (err) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body as Partial<Bus>;
            const newBus = busRepo.create(data);
            const saved = await busRepo.save(newBus);
            res.status(201).json(saved);
        } catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const data = req.body as Partial<Bus>;
            await busRepo.update(id, data);
            const updated = await busRepo.findOneBy({ id });
            if (!updated) return res.status(404).json({ message: "Bus not found" });
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const result = await busRepo.delete(id);
            if (result.affected === 0) return res.status(404).json({ message: "Bus not found" });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
