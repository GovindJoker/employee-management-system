import { Request, Response } from 'express';
import * as employeeService from '../services/employee.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createEmployeeSchema } from '../validations/employee.validation.js';
import { successResponse } from '../utils/response.js';



export const createEmployee = asyncHandler(
    async (req:Request,res:Response)=>{
        const body = createEmployeeSchema.parse(req.body);
        console.log("first")
        const result = await employeeService.createEmployee(body);
        console.log("second")
        successResponse({
            res,
            statusCode:201,
            message:"Employee created successfully.",
            data:result
        })
    }
) 