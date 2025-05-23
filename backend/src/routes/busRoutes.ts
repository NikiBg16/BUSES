// src/routes/busRoutes.ts
import { Router, RequestHandler } from "express";
import { BusController } from "../controllers/BusController";
import { busValidationRules, validateBus } from "../validators/busValidator";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

// GET /api/buses
router.get("/", asyncHandler(BusController.getAll));

// GET /api/buses/:id
router.get("/:id", asyncHandler(BusController.getOne));

// POST /api/buses
router.post(
    "/",
    // разпакваме масива и казваме на TS, че това са RequestHandler-и
    ...(busValidationRules as unknown as RequestHandler[]),
    validateBus as RequestHandler,
    asyncHandler(BusController.create)
);

// PUT /api/buses/:id
router.put(
    "/:id",
    ...(busValidationRules as unknown as RequestHandler[]),
    validateBus as RequestHandler,
    asyncHandler(BusController.update)
);

// DELETE /api/buses/:id
router.delete("/:id", asyncHandler(BusController.remove));

export default router;
