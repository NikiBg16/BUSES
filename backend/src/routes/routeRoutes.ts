// src/routes/routeRoutes.ts
import { Router, Request, Response, NextFunction } from "express";
import { RouteController } from "../controllers/RouteController";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction): void => {
    void RouteController.getAll(req, res, next);
});
router.get("/:id", (req: Request, res: Response, next: NextFunction): void => {
    void RouteController.getOne(req, res, next);
});
router.post("/", (req: Request, res: Response, next: NextFunction): void => {
    void RouteController.create(req, res, next);
});
router.put("/:id", (req: Request, res: Response, next: NextFunction): void => {
    void RouteController.update(req, res, next);
});
router.delete("/:id", (req: Request, res: Response, next: NextFunction): void => {
    void RouteController.remove(req, res, next);
});

export default router;
