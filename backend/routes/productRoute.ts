import { Router } from "express";
import { generateInovice } from "../controllers/generate.controller";

const router = Router()

router.route('/generate-invoice').post(generateInovice)

export default router;