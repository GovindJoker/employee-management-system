import { Request, Response } from 'express';
import * as employmentType from '../services/employmentType.service.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { createEmploymentTypeSchema, getEmploymentTypeSchema, updateEmploymentTypeSchema, updateEmploymentTypeStatusSchema } from '../validations/employmentType.validation.js';
import { successResponse } from '../utils/response.js';
import AppError from '../errors/AppError.js';



export const createEmploymentType = asyncHandler(
    async (req:Request,res:Response)=>{
        const data = createEmploymentTypeSchema.parse(req.body);
        const result =await employmentType.createEmploymentType(data);
        
        successResponse({
            res,
            statusCode:201,
            message:"EmploymentType created successfully.",
            data:result
        })
    }
)


export const getEmploymentTypes = asyncHandler(
    async(req:Request,res:Response)=>{
        const query = getEmploymentTypeSchema.parse(req.query);

        const result = await employmentType.getEmploymentTypes(query);

        successResponse({
            res,
            statusCode:200,
            message:"EmploymentType found successfully.",
            data:result.EmploymentTypes,
            meta:result.meta
        })
    }
)

export const getEmploymentTypeById = asyncHandler(
    async (req:Request,res:Response)=>{
        const id = Number(req.params.id);
        if(!Number.isInteger || id<=0){
            throw new AppError("Invalid EmploymentType id",400)
        }
        const result = await employmentType.getEmploymentTypeById(id)

        successResponse({
            res,
            statusCode:200,
            message:"EmploymentType found successfully",
            data:result
        })
    }
)


export const updateEmploymentType = asyncHandler(
    async(req:Request,res:Response)=>{
        const id = Number(req.params.id);
        console.log("first")
        const body = updateEmploymentTypeSchema.parse(req.body);
        if(!Number.isInteger(id) || id<=0){
            throw new AppError("Invalid EmploymentType id.",400)
        }
        const result = await employmentType.updateEmploymentType(id,body)

        successResponse({
            res,
            statusCode:200,
            message:"EmploymentType updated successfully",
            data:result
        })
    }
)

export const updateEmploymentTypeStatus = asyncHandler(
    async(req:Request,res:Response)=>{
        const id = Number(req.params.id);
        // console.log("first")
        const body = updateEmploymentTypeStatusSchema.parse(req.body);
        if(!Number.isInteger(id) || id<=0){
            throw new AppError("Invalid EmploymentType id.",400)
        }
        const result = await employmentType.updateEmploymentTypeStatus(id,body)

        successResponse({
            res,
            statusCode:200,
            message:"EmploymentType status updated successfully",
            data:result
        })
    }
)