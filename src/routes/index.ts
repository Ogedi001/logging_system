import { Router } from "express";
import { logRoute } from "./logRoute";

const router = Router()

router.use('/log',logRoute)

export {router as ApplicationRoute}