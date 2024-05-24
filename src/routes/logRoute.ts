import { Router } from "express";
import { createLogs } from "../controller/log-controller";


const router = Router()

router.route('/').post(createLogs)
export {router as logRoute}
