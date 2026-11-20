import { Router, type Router as ExpressRouter } from "express";
import { register, login } from "../Controller/authController";

const router: ExpressRouter = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
