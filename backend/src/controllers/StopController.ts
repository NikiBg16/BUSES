// src/controllers/StopController.ts
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { Stop } from "../models/Stop";

const stopRepo = AppDataSource.getRepository(Stop);

export class StopController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const stops = await stopRepo.find();
            res.json(stops);
        } catch (err) {
            next(err);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const stop = await stopRepo.findOneBy({ id });
            if (!stop) return res.status(404).json({ message: "Stop not found" });
            res.json(stop);
        } catch (err) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body as Partial<Stop>;
            const newStop = stopRepo.create(data);
            const saved = await stopRepo.save(newStop);
            res.status(201).json(saved);
        } catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const data = req.body as Partial<Stop>;
            await stopRepo.update(id, data);
            const updated = await stopRepo.findOneBy({ id });
            if (!updated) return res.status(404).json({ message: "Stop not found" });
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const result = await stopRepo.delete(id);
            if (result.affected === 0) return res.status(404).json({ message: "Stop not found" });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
