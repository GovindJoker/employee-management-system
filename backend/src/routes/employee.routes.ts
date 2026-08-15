import { Router } from "express";
import * as employeeController from '../controllers/employee.controller.js'
const router = Router()

router.post('/',employeeController.createEmployee)


export default router;