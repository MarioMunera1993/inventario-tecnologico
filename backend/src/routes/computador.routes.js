import { Router } from "express";
import { listarComputadores, registrarComputador } from "../controllers/computador.controller.js";

const router = Router();

router.get("/", listarComputadores);
router.post("/", registrarComputador);

export default router;