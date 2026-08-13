import prisma from "../config/prisma.js";
import { CreateUserInput } from "../validations/user.validation.js";


export const findUserByEmail = async (email:string)=>{
    return await prisma.user.findUnique({
        where:{
            email
        }
    })
}

export const findRoleById = async (id:number)=>{
    return await prisma.role.findUnique({
        where:{
            id
        }
    })
}

export const createUser = async (email:string,passwordHash:string,roleId:number)=>{
    return await prisma.user.create({
        data:{
            email,passwordHash,roleId
        },
        select:{
            id:true,
            roleId:true,
            email:true,
            createdAt:true,
            updatedAt:true,
            isActive:true,
            lastLoginAt:true
        }
    })
}