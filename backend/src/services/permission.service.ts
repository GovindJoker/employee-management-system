import { error } from 'node:console'
import AppError from '../errors/AppError.js'
import * as permissionRepository from '../repositories/permission.repository.js'
import { CreatePermissionInput, GetPermissionQuery, UpdatePermissionInput, UpdatePermissionStatusInput } from '../validations/permission.validation.js'


export const createPermission = async (data:CreatePermissionInput)=>{
    const findPermission = await permissionRepository.findPermissionByName(data.name)

    if(findPermission){
        throw new AppError("Permission already exist.",409)
    }
    return await permissionRepository.createPermission(data)
}

export const getAllPermission = async (query:GetPermissionQuery)=>{
    return await permissionRepository.getAllPermission(query)
}


export const getPermissionById = async (id:number)=>{
    const data = await permissionRepository.getPermissionById(id)
    if(!data){
        throw new AppError("Permission not found",404)
    }

    return data;
}

export const updatePermissionById = async (id:number,data:UpdatePermissionInput )=>{
    const checkPermissionExist = await permissionRepository.getPermissionById(id)
    if(!checkPermissionExist){
        throw new AppError("Permission does not exist.",404);
    }
    if(data.name && data.name!=""){
        const checkPermissionNameExist = await permissionRepository.findPermissionByName(data.name)
        if(checkPermissionNameExist){
            throw new AppError("Permission already exist",409)
        }
    }
    return await permissionRepository.updatePermissionById(id,data)
}

export const updatePermissionStatusById = async (id:number,data:UpdatePermissionStatusInput)=>{
    const findPermission= await permissionRepository.getPermissionById(id);
    if(!findPermission){
        throw new AppError("Permission does not exist",404);
    }
    
}