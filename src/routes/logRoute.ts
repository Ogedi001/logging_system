import { Router } from "express";
import { createLogs, createLogs_cloud } from "../controller/log-controller";


const router = Router()

router.route('/').post(createLogs)
router.route('/cloud').post(createLogs_cloud)
export {router as logRoute}
