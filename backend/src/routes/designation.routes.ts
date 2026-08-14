import { Router } from "express";
import * as designationController from '../controllers/designation.controller.js'

const router = Router();

router.post('/',designationController.createDesignation)
router.get('/',designationController.getDesignations)
router.get('/:id',designationController.getDesignationById)
router.put('/:id',designationController.updateDesignation)
router.patch('/:id/status',designationController.updateDesignationStatus)


export default router;