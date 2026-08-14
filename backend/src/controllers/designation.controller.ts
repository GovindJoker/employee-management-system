import { Request, Response } from 'express';
import * as designationService from '../services/designation.service.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { createDesignationSchema, getDesignationSchema, updateDesignationSchema, updateDesignationStatusSchema } from '../validations/designation.validation.js';
import { successResponse } from '../utils/response.js';
import AppError from '../errors/AppError.js';
import { success } from 'zod';



export const createDesignation = asyncHandler(
    async (req:Request,res:Response)=>{
        const data = createDesignationSchema.parse(req.body);
        const result =await designationService.createDesignation(data);
        
        successResponse({
            res,
            statusCode:201,
            message:"Designation created successfully.",
            data:result
        })
    }
)


export const getDesignations = asyncHandler(
    async(req:Request,res:Response)=>{
        const query = getDesignationSchema.parse(req.query);

        const result = await designationService.getDesignations(query);

        successResponse({
            res,
            statusCode:200,
            message:"Designation found successfully.",
            data:result.Designations,
            meta:result.meta
        })
    }
)

export const getDesignationById = asyncHandler(
    async (req:Request,res:Response)=>{
        const id = Number(req.params.id);
        if(!Number.isInteger || id<=0){
            throw new AppError("Invalid Designation id",400)
        }
        const result = await designationService.getDesignationById(id)

        successResponse({
            res,
            statusCode:200,
            message:"Designation found successfully",
            data:result
        })
    }
)


export const updateDesignation = asyncHandler(
    async(req:Request,res:Response)=>{
        const id = Number(req.params.id);
        console.log("first")
        const body = updateDesignationSchema.parse(req.body);
        if(!Number.isInteger(id) || id<=0){
            throw new AppError("Invalid Designation id.",400)
        }
        const result = await designationService.updateDesignation(id,body)

        successResponse({
            res,
            statusCode:200,
            message:"Designation updated successfully",
            data:result
        })
    }
)

export const updateDesignationStatus = asyncHandler(
    async(req:Request,res:Response)=>{
        const id = Number(req.params.id);
        // console.log("first")
        const body = updateDesignationStatusSchema.parse(req.body);
        if(!Number.isInteger(id) || id<=0){
            throw new AppError("Invalid Designation id.",400)
        }
        const result = await designationService.updateDesignationStatus(id,body)

        successResponse({
            res,
            statusCode:200,
            message:"Designation status updated successfully",
            data:result
        })
    }
)