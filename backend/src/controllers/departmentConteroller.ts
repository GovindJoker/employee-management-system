import { Request, Response } from 'express';
import * as departmentService from '../services/department.service.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { createDepartmentSchema, getDepartmentSchema } from '../validations/department.validation.js';
import { successResponse } from '../utils/response.js';
import AppError from '../errors/AppError.js';



export const createDepartment = asyncHandler(
    async (req:Request,res:Response)=>{
        const data = createDepartmentSchema.parse(req.body);
        const result =await departmentService.createDepartment(data);
        
        successResponse({
            res,
            statusCode:201,
            message:"Department created successfully.",
            data:result
        })
    }
)


export const getDepartments = asyncHandler(
    async(req:Request,res:Response)=>{
        const query = getDepartmentSchema.parse(req.query);

        const result = await departmentService.getDepartments(query);

        successResponse({
            res,
            statusCode:200,
            message:"Department found successfully.",
            data:result.departments,
            meta:result.meta
        })
    }
)

export const getDepartmentById = asyncHandler(
    async (req:Request,res:Response)=>{
        const id = Number(req.params.id);
        if(!Number.isInteger || id<=0){
            throw new AppError("Invalid department id",400)
        }
        const result = await departmentService.getDepartmentById(id)

        successResponse({
            res,
            statusCode:200,
            message:"Department found successfully",
            data:result
        })
    }
)