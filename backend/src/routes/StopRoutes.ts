// src/routes/stopRoutes.ts
import { Router, Request, Response, NextFunction } from "express";
import { StopController } from "../controllers/StopController";

const router = Router();

// GET /api/stops
router.get("/", (req: Request, res: Response, next: NextFunction): void => {
    StopController.getAll(req, res, next);
});

// GET /api/stops/:id
router.get("/:id", (req: Request, res: Response, next: NextFunction): void => {
    StopController.getOne(req, res, next);
});

// POST /api/stops
router.post("/", (req: Request, res: Response, next: NextFunction): void => {
    StopController.create(req, res, next);
});

// PUT /api/stops/:id
router.put("/:id", (req: Request, res: Response, next: NextFunction): void => {
    StopController.update(req, res, next);
});

// DELETE /api/stops/:id
router.delete("/:id", (req: Request, res: Response, next: NextFunction): void => {
    StopController.remove(req, res, next);
});

export default router;
