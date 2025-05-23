// src/controllers/ScheduleController.ts
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { Schedule } from "../models/Schedule";

const scheduleRepo = AppDataSource.getRepository(Schedule);

export class ScheduleController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const schedules = await scheduleRepo.find({ relations: ["bus", "stop"] });
            res.json(schedules);
        } catch (err) {
            next(err);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const schedule = await scheduleRepo.findOne({
                where: { id },
                relations: ["bus", "stop"],
            });
            if (!schedule) return res.status(404).json({ message: "Schedule not found" });
            res.json(schedule);
        } catch (err) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body as Partial<Schedule>;
            const newSchedule = scheduleRepo.create(data);
            const saved = await scheduleRepo.save(newSchedule);
            res.status(201).json(saved);
        } catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const data = req.body as Partial<Schedule>;
            await scheduleRepo.update(id, data);
            const updated = await scheduleRepo.findOneBy({ id });
            if (!updated) return res.status(404).json({ message: "Schedule not found" });
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const result = await scheduleRepo.delete(id);
            if (result.affected === 0) return res.status(404).json({ message: "Schedule not found" });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
