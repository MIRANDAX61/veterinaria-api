import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

export const validateBody = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "VALIDATION_FAILED",
        details: result.error.flatten(),
      });
    }
    req.body = result.data;
    next();
  };
};

export const validateParams = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({
        error: "VALIDATION_FAILED",
        details: result.error.flatten(),
      });
    }
    req.params = result.data as typeof req.params;
    next();
  };
};

export const validateQuery = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        error: "VALIDATION_FAILED",
        details: result.error.flatten(),
      });
    }
    req.query = result.data as typeof req.query;
    next();
  };
};   