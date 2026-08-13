import prisma from "../config/prisma.js";
import { CreateUserInput, GetUserQuery, UpdateUserInput, UpdateUserStatusInput } from "../validations/user.validation.js";


export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

export const findRoleById = async (id: number) => {
    return await prisma.role.findUnique({
        where: {
            id
        }
    })
}

export const createUser = async (email: string, passwordHash: string, roleId: number) => {
    return await prisma.user.create({
        data: {
            email, passwordHash, roleId
        },
        select: {
            id: true,
            roleId: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            isActive: true,
            lastLoginAt: true
        }
    })
}

export const getUsers = async (query: GetUserQuery) => {
    const {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        isActive
    } = query

    const skip = (page - 1) * limit;

    // dynamic filter
    const where = {
        ...(
            search && {
                name: {
                    contains: search
                }
            }
        ),
        ...(
            isActive!==undefined&&{
                isActive
            }
        )
    }

    // total records
    const totalRecords = await prisma.user.count({
        where
    })

    const users = await prisma.user.findMany({
        where,
        skip,
        take:limit,
        orderBy:{
            [sortBy]:sortOrder
        },
        select:{
            id:true,
            email:true,
            createdAt:true,
            updatedAt:true,
            lastLoginAt:true,
            roleId:true
        }
    })

    return {
        users,
        meta:{
            page,
            limit,
            totalRecords,
            totalPages:Math.ceil(totalRecords/limit)
        }
    }

}


export const getUserById = async (id:number)=>{
    return await prisma.user.findUnique({
        where:{
            id
        },
        select:{
            id:true,
            email:true,
            isActive:true,
            createdAt:true,
            updatedAt:true,
            lastLoginAt:true,
            role:{
                select:{
                    id:true,
                    name:true,
                    description:true,
                    isActive:true
                }
            }
        }
        // include:{
        //     role:{
        //         select:{
        //             id:true,
        //             name:true,
        //             description:true,
        //             isActive:true
        //         }
        //     }
        // }
    })
}


export const updateUser = async (id:number,data:UpdateUserInput)=>{
    return prisma.user.update({
        where:{
            id
        },
        data
    })
}


export const updateUserStatus = async (id:number,data:UpdateUserStatusInput)=>{
    return await prisma.user.update({
        where:{
            id
        },
        data
    })
}