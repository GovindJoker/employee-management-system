import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";
import { createPermissionSchema, getPermissionSchema, updatePermissionSchema, updatePermissionStatusSchema } from "../validations/permission.validation.js";
import * as permissionService from '../services/permission.service.js'
import { id } from "zod/locales";


export const createPermission = asyncHandler(
    async (req:Request,res:Response)=>{
        const data = createPermissionSchema.parse(req.body)
        const result = await permissionService.createPermission(data)
        successResponse({
            res,
            statusCode:201,
            message:"Permission created successfully.",
            data
        })
    }
)


export const getAllPermission = asyncHandler(
    async (req:Request,res:Response)=>{
        const query = getPermissionSchema.parse(req.query);
        const result = await permissionService.getAllPermission(query)

        successResponse({
            res,
            statusCode:200,
            message:"Permission found successfully.",
            data:result.permissions,
            meta:result.meta

        })
    }
)

export const getPermissionById = asyncHandler(
    async (req:Request,res:Response)=>{
        const id=Number(req.params.id);
        const result = await permissionService.getPermissionById(id)
        successResponse({
            res,
            statusCode:200,
            message:"Permission found successfully.",
            data:result
        })
    }
)

export const updatePermissionById = asyncHandler(
    async (req:Request,res:Response)=>{
        const id = Number(req.params.id);
        const data = updatePermissionSchema.parse(req.body);
        const result = await permissionService.updatePermissionById(id,data);
        successResponse({
            res,
            statusCode:200,
            message:"Permission updated Successfully",
            data:result
        })
    }
) 


export const updatePermissionStatusById = asyncHandler(
    async ( req:Request , res:Response )=>{

        const id = Number(req.params.id);
        const data = updatePermissionStatusSchema.parse(req.body);
        const result  =  await permissionService.updatePermissionStatusById(id,data);
        successResponse({
            res,
            statusCode:200,
            message:"Permission status updated sucessfully.",
            data:result
        })
    }
)