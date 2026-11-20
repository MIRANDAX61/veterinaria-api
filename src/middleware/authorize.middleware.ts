import type { Request, Response, NextFunction } from "express";

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "UNAUTHORIZED", message: "No autenticado" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "FORBIDDEN",
        message: `Requiere rol: ${roles.join(" o ")}`,
      });
    }

    next();
  };
};   