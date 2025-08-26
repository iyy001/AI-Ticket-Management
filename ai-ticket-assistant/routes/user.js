import express from "express";
import {
  getUsers,
  login,
  signup,
  updateUser,
  logout,
} from "../controllers/user.js";
import { verifyToken } from "../controllers/auth.js";
import { authenticate } from "../middlewares/auth.js";
const router = express.Router();

router.post("/update-user", authenticate, updateUser);
router.get("/users", authenticate, getUsers);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify-token", authenticate, verifyToken);

export default router;
