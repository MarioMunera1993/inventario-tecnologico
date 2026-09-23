import { Router } from "express";
import { listarComputadores } from "../controllers/computador.controller.js";

const router = Router();

router.get("/", listarComputadores);

export default router;