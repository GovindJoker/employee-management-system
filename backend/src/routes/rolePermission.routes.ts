import { Router } from "express";
import { assignPermission } from "../controllers/rolePermission.controller.js";

const router = Router();

router.post(
  "/:roleId/permissions",
  assignPermission
);

export default router;