import prisma from "../config/prisma.js"
import { CreateEmploymentTypeInput, GetEmploymentTypeQuery, UpdateEmploymentTypeInput, UpdateEmploymentTypeStatusInput } from "../validations/employmentType.validation.js"



export const createEmploymentType = async (data:CreateEmploymentTypeInput)=>{
    return await prisma.employmentType.create({
        data
    })
}

export const findEmploymentTypeByName = async (name:string)=>{
    return await prisma.employmentType.findUnique({
        where:{
            name
        }
    })
}

export const getEmploymentTypes = async (query:GetEmploymentTypeQuery)=>{
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

    const totalRecords = await prisma.employmentType.count({
        where
    })

    const EmploymentTypes = await prisma.employmentType.findMany({
        where,
        skip,
        take:limit,
        orderBy:{
            [sortBy]:sortOrder
        }
    })

    return {
        EmploymentTypes,
        meta:{
            page,
            limit,
            totalRecords,
            totalPages:Math.ceil(totalRecords/limit)
        }
    }
}

export const getEmploymentTypeById = async (id:number)=>{
    return await prisma.employmentType.findUnique({
        where:{
            id
        }
    }) 
}

export const updateEmploymentType = async (id:number,data:UpdateEmploymentTypeInput)=>{
    return await prisma.employmentType.update({
        where:{
            id
        },
        data
    })
} 


export const updateEmploymentTypeStatus =  async (id:number,data:UpdateEmploymentTypeStatusInput)=>{
    return await prisma.employmentType.update({
        where:{
            id
        },
        data
    })
}