import prisma from "../config/prisma.js";
import { CreateRoleInput, GetRoleQuery, UpdateRoleInput } from "../validations/role.validation.js";

export const createRole = async (data:CreateRoleInput)=>{
    return await prisma.role.create({data});
}

export const findRoleByName=async (name:string)=>{
    return await prisma.role.findUnique({
        where:{
            name
        }
    })
}

export const getAllRoles = async (query: GetRoleQuery) => {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    isActive,
  } = query;
  console.log(query)
  // Pagination
  const skip = (page - 1) * limit;

  // Dynamic filters
  const where = {
    ...(search && {
      name: {
        contains: search,
      },
    }),

    ...(isActive !== undefined && {
      isActive,
    }),
  };

  // Total records
  const totalRecords = await prisma.role.count({
    where,
  });

  // Fetch roles
  const roles = await prisma.role.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return {
    roles,
    meta: {
      page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
    },
  };
};

export const findRoleById=async (id:number)=>{
    return await prisma.role.findUnique({
        where:{
            id
        }
    })
}

export const updateRoleById= async (id:number,data:UpdateRoleInput)=>{
    return await prisma.role.update({
        where:{
            id
        },
        data
    })
}

export const updateRoleStatus = async (id:number,isActive:boolean)=>{
    return await prisma.role.update({
        where:{
            id
        },
        data:{
            isActive
        }
    })
}