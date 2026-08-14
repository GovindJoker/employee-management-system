import { Router } from "express";
import * as departmentController from '../controllers/department.conteroller.js'

const router = Router();

router.post('/',departmentController.createDepartment)
router.get('/',departmentController.getDepartments)
router.get('/:id',departmentController.getDepartmentById)
router.put('/:id',departmentController.updateDepartment)
router.patch('/:id/status',departmentController.updateDepartmentStatus)


export default router;