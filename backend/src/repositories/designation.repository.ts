import prisma from "../config/prisma.js"
import { CreateDesignationInput, GetDesignationQuery, UpdateDesignationInput, UpdateDesignationStatusInput } from "../validations/designation.validation.js"



export const createDesignation = async (data:CreateDesignationInput)=>{
    return await prisma.designation.create({
        data
    })
}

export const findDesignationByName = async (name:string)=>{
    return await prisma.designation.findUnique({
        where:{
            name
        }
    })
}

export const getDesignations = async (query:GetDesignationQuery)=>{
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

    const totalRecords = await prisma.designation.count({
        where
    })

    const Designations = await prisma.designation.findMany({
        where,
        skip,
        take:limit,
        orderBy:{
            [sortBy]:sortOrder
        }
    })

    return {
        Designations,
        meta:{
            page,
            limit,
            totalRecords,
            totalPages:Math.ceil(totalRecords/limit)
        }
    }
}

export const getDesignationById = async (id:number)=>{
    return await prisma.designation.findUnique({
        where:{
            id
        }
    }) 
}

export const updateDesignation = async (id:number,data:UpdateDesignationInput)=>{
    return await prisma.designation.update({
        where:{
            id
        },
        data
    })
} 


export const updateDesignationStatus =  async (id:number,data:UpdateDesignationStatusInput)=>{
    return await prisma.designation.update({
        where:{
            id
        },
        data
    })
}