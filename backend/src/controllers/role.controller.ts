import { Request, Response } from "express";

import * as roleService from '../services/role.service.js';
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getRolesSchema, updateRoleSchema, updateRoleStatusSchema } from "../validations/role.validation.js";

export const createRole = asyncHandler(async (req: Request, res: Response) => {
    const role = await roleService.createRole(req.body);
    successResponse({
        res,
        statusCode: 201,
        message: "Role created successfully",
        data: role,
    })
})


export const getAllRoles = asyncHandler(async (req: Request, res: Response) => {
    const query = getRolesSchema.parse(req.query);
    console.log("controller:-",req.query)
    const result = await roleService.getAllRoles(query);
    successResponse({
        res,
        statusCode: 200,
        message: "Roles fetched successfully",
        data: result.roles,
        meta: result.meta
    })
})

export const getRolebyId = asyncHandler(
    async (req: Request, res: Response) => {
        const id=Number(req.params.id)
        const result = await roleService.getRoleBiId(id);
        successResponse({
            res,
            statusCode:200,
            message:"Role fetched successfully",
            data:result,
        })
    }
)


export const updateRoleById = asyncHandler(
    async (req:Request,res:Response)=>{
        const id = Number(req.params.id);
        const data= updateRoleSchema.parse(req.body);
        const result =await roleService.updteRoleById(id,data)
        successResponse({
            res,
            statusCode:200,
            message:"Role updated Successfully.",
            data:result
        })
    }
)

export const updateRoleStatus = asyncHandler(
    async (req:Request,res:Response)=>{
        const id=Number(req.params.id);
        const data = updateRoleStatusSchema.parse(req.body);
        const result = await roleService.updateRoleStatus(id,data)
        successResponse({
            res,
            statusCode:200,
            message:"Status updated successfully.",
            data:result
        }) 
    }
)