import { Router } from "express";
import * as rolePermissionController from "../controllers/rolePermission.controller.js";

const router = Router();

router.post(
  "/:roleId/permissions",
  rolePermissionController.assignPermission
);

router.get('/:roleId/permissions',rolePermissionController.getRolePermissions)
router.delete('/:roleId/permissions/:permissionId',rolePermissionController.removeRolePermission)

export default router;