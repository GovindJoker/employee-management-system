import { Router } from "express";
import * as roleController from '../controllers/role.controller.js'

const  router = Router()

router.post('/',roleController.createRole)
router.get('/',roleController.getAllRoles)
router.get('/:id',roleController.getRolebyId)
router.put("/:id",roleController.updateRoleById);
router.patch("/:id/status",roleController.updateRoleStatus)
export default router;

