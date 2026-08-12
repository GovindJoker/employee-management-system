import { Router } from "express";
import * as permissionController from '../controllers/permission.controller.js'
const router = Router();

router.post('/',permissionController.createPermission)
router.get('/',permissionController.getAllPermission);
router.get('/:id',permissionController.getPermissionById);
router.put('/:id',permissionController.updatePermissionById);
router.patch('/:id/status',permissionController.updatePermissionStatusById);

export default router;