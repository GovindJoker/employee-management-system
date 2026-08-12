import prisma from "../config/prisma.js";
import { CreatePermissionInput, GetPermissionQuery, UpdatePermissionInput, UpdatePermissionStatusInput } from "../validations/permission.validation.js";



export const createPermission = async (data:CreatePermissionInput)=>{
    return await prisma.permission.create({
        data
    });
}

export const findPermissionByName= async ( name:string)=>{
    return await prisma.permission.findUnique({
        where:{
            name
        }
    })
}

export const getAllPermission = async ( query:GetPermissionQuery )=>{
    const {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        isActive
    }=query
    console.log("first--",isActive)
    const skip = (page-1)*limit;

    const where = {
        ...(search && {
            name:{
                contains:search
            }
        }),
        ...(
            isActive!==undefined&&{
                isActive
            }
        )
        
    }

    const totalRecords = await prisma.permission.count({
        where,
    })

    const permissions = await prisma.permission.findMany({
        where,
        skip,
        take:limit,
        orderBy:{
            [sortBy]:sortOrder
        }
    })

    return {
        permissions,
        meta:{
            page,
            limit,
            totalRecords,
            totalPages:Math.ceil(totalRecords/limit)
        }
    }

}


export const getPermissionById = async (id:number)=>{
    const data = await prisma.permission.findUnique({
        where:{
            id
        }
    })
    return data;
}


export const updatePermissionById = async (id:number,data:UpdatePermissionInput)=>{
    return await prisma.permission.update({
        where:{
            id
        },
        data
    })
}

export const updatePermissionStatusById = async (id:number,data:UpdatePermissionStatusInput)=>{
    return await prisma.permission.update({
        where:{
            id
        },
        data
    })
}