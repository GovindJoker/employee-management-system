import { Router } from "express";
import * as departmentController from '../controllers/departmentConteroller.js'

const router = Router();

router.post('/',departmentController.createDepartment)
router.get('/',departmentController.getDepartments)
router.get('/:id',departmentController.getDepartmentById)


export default router;