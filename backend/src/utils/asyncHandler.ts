// src/utils/asyncHandler.ts
import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Обвиват асинхронна функция, за да може Express да я приеме като валиден middleware.
 * Автоматично хваща грешки и ги препраща на next().
 */
export function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}
