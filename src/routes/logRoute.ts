import { Router } from "express";
import { createLogs, createLogs_cloud } from "../controller/log-controller";


const router = Router()

router.route('/local/:logName').post(createLogs)
router.route('/cloud/:logName').post(createLogs_cloud)
export {router as logRoute}
