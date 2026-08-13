import { Request, Response } from "express";
import * as rolePermissionService from "../services/rolePermission.service.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { assignPermissionSchema } from "../validations/rolePermission.validation.js";
import AppError from "../errors/AppError.js";

export const assignPermission = asyncHandler(
  async (req: Request, res: Response) => {
    
    // 1. Get roleId from URL
    const roleId = Number(req.params.roleId);

    // 2. Validate roleId
    if (!Number.isInteger(roleId) || roleId <= 0) {
      throw new AppError("Invalid role ID",400);
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


export const getRolePermissions = asyncHandler(
    async (req:Request,res:Response)=>{
        const roleId=Number(req.params.roleId);
        if(!Number.isInteger(roleId) || roleId<=0){
            throw new AppError("Invalid role id.",400)
        }

        const result = await rolePermissionService.getRolePermissions(roleId)

        successResponse({
            res,
            statusCode:200,
            message:"role Permission found successfully.",
            data:result
        })
    }
) 

export const removeRolePermission = asyncHandler(
    async (req:Request,res:Response)=>{

        const roleId = Number(req.params.roleId);
        const permissionId = Number(req.params.permissionId);

        if(!Number.isInteger(roleId) || roleId<=0){
            throw new AppError("invalid role id",400)
        }
        if(!Number.isInteger(permissionId) || permissionId<=0){
            throw new AppError("invalid permission id",400)
        }

        const result = await rolePermissionService.removeRolePermission(roleId,permissionId)

        successResponse({
            res,
            statusCode:200,
            message:"Permission removed from role successfully.",
            data:result
        })
    }
)