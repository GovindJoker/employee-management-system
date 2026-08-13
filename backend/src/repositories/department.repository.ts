import prisma from "../config/prisma.js"
import { CreateDepartmentInput, GetDepartmentQuery } from "../validations/department.validation.js"



export const createDepartment = async (data:CreateDepartmentInput)=>{
    return await prisma.department.create({
        data
    })
}

export const findDepartmentByName = async (name:string)=>{
    return await prisma.department.findUnique({
        where:{
            name
        }
    })
}

export const getDepartments = async (query:GetDepartmentQuery)=>{
    const {
        page,
        limit,
        search,
        sortBy,sortOrder,
        isActive
    }=query;

    const skip = (page-1)*limit;

    const where = {
        ...(search&&{
            name:{
                contains:search
            }
        }),
        ...(isActive!=undefined&&{
            isActive
        })
    }

    const totalRecords = await prisma.department.count({
        where
    })

    const departments = await prisma.department.findMany({
        where,
        skip,
        take:limit,
        orderBy:{
            [sortBy]:sortOrder
        }
    })

    return {
        departments,
        meta:{
            page,
            limit,
            totalRecords,
            totalPages:Math.ceil(totalRecords/limit)
        }
    }
}

export const getDepartmentById = async (id:number)=>{
    return await prisma.department.findUnique({
        where:{
            id
        }
    }) 
}