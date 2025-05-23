// src/routes/scheduleRoutes.ts
import { Router, Request, Response, NextFunction } from "express";
import { ScheduleController } from "../controllers/ScheduleController";

const router = Router();

router.get(
    "/",
    (req: Request, res: Response, next: NextFunction): void => {
        void ScheduleController.getAll(req, res, next);
    }
);
router.get(
    "/:id",
    (req: Request, res: Response, next: NextFunction): void => {
        void ScheduleController.getOne(req, res, next);
    }
);
router.post(
    "/",
    (req: Request, res: Response, next: NextFunction): void => {
        void ScheduleController.create(req, res, next);
    }
);
router.put(
    "/:id",
    (req: Request, res: Response, next: NextFunction): void => {
        void ScheduleController.update(req, res, next);
    }
);
router.delete(
    "/:id",
    (req: Request, res: Response, next: NextFunction): void => {
        void ScheduleController.remove(req, res, next);
    }
);

export default router;
