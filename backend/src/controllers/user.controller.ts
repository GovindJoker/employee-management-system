import { Request, Response } from 'express'
import * as userService from '../services/user.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { createUserSchema } from '../validations/user.validation.js'
import { successResponse } from '../utils/response.js'


export const createUser = asyncHandler(
    async (req:Request,res:Response)=>{
        const body = createUserSchema.parse(req.body);
        const result = await userService.createUser(body);

        successResponse({
            res,
            statusCode:201,
            message:"User created successfully.",
            data:result
        })
    }
)