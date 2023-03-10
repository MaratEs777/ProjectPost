import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

//// (register) http://localhost:3001/api/auth/register - endpoint

router.post("/register", register);

//// (login) http://localhost:3001/api/auth/login - endpoint

router.post("/login", login);

//// (getMe) http://localhost:3001/api/auth/me - endpoint

router.get("/me", checkAuth, getMe);

export default router;
