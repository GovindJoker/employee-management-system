import { Request, Response } from 'express'
import * as userService from '../services/user.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { createUserSchema, getUserSchema, updateUserSchema } from '../validations/user.validation.js'
import { successResponse } from '../utils/response.js'
import AppError from '../errors/AppError.js'


export const createUser = asyncHandler(
    async (req: Request, res: Response) => {
        const body = createUserSchema.parse(req.body);
        const result = await userService.createUser(body);

        successResponse({
            res,
            statusCode: 201,
            message: "User created successfully.",
            data: result
        })
    }
)


export const getUsers = asyncHandler(
    async (req: Request, res: Response) => {
        const query = getUserSchema.parse(req.query);
        const result = await userService.getUsers(query);

        successResponse({
            res,
            statusCode: 200,
            message: "User fund successfully",
            data: result.users,
            meta: result.meta
        })
    }
)


export const getUserById = asyncHandler(
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid User ID.", 400)
        }
        const result = await userService.getUserById(id);
        successResponse({
            res,
            statusCode: 200,
            message: "User found successfully",
            data: result
        })
    }
)


export const updateUser = asyncHandler(
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const body = updateUserSchema.parse(req.body);
        if (!Number.isInteger || id <= 0) {
            throw new AppError("Invalid User Id,", 400)
        }
        if (Object.keys(body).length === 0) {
            throw new AppError("Invalid body data", 400)
        }
        const result = await userService.updateUser(id, body)

        successResponse({
            res,
            statusCode: 200,
            message: "User updated sucessfully",
            data: result
        })
    }
)

export const updateUserStatus = asyncHandler(
    async (req:Request,res:Response) => {


    }
)