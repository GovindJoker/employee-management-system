import { Router } from "express";
import * as permissionController from '../controllers/permission.controller.js'
const router = Router();

router.post('/',permissionController.createPermission)
router.get('/',permissionController.getAllPermission);
router.get('/:id',permissionController.getPermissionById);
router.put('/:id',permissionController.updatePermissionById)

export default router;