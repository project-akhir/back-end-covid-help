import express from "express";
const router = express.Router();

import { signin, signup, semua } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/semua",semua)

export default router;