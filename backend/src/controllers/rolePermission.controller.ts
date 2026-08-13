import { Request, Response } from "express";
import * as rolePermissionService from "../services/rolePermission.service.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { assignPermissionSchema } from "../validations/rolePermission.validation.js";

export const assignPermission = asyncHandler(
  async (req: Request, res: Response) => {
    
    // 1. Get roleId from URL
    const roleId = Number(req.params.roleId);

    // 2. Validate roleId
    if (!Number.isInteger(roleId) || roleId <= 0) {
      throw new Error("Invalid role ID");
    }

    // 3. Validate request body
    const data = assignPermissionSchema.parse(req.body);

    // 4. Call service
    const result = await rolePermissionService.assignPermission(
      roleId,
      data
    );

    // 5. Send response
    successResponse({
      res,
      statusCode: 200,
      message: "Permissions assigned successfully",
      data: result,
    });
  }
);