import { Router } from "express";
import * as employmentType from '../controllers/employmentType.controller.js'

const router = Router();

router.post('/',employmentType.createEmploymentType)
router.get('/',employmentType.getEmploymentTypes)
router.get('/:id',employmentType.getEmploymentTypeById)
router.put('/:id',employmentType.updateEmploymentType)
router.patch('/:id/status',employmentType.updateEmploymentTypeStatus)


export default router;