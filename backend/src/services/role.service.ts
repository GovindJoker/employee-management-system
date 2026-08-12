import AppError from '../errors/AppError.js';
import * as roleRepository from '../repositories/role.repository.js'
import { CreateRoleInput, GetRoleQuery, UpdateRoleInput, UpdateRoleStatusInput } from "../validations/role.validation.js";


export const createRole = async (data: CreateRoleInput) => {
    const existingRole = await roleRepository.findRoleByName(data.name);

    if (existingRole) {
        throw new AppError("Role already exists", 409);
    }
    return await roleRepository.createRole(data);
}

export const getAllRoles = async (query:GetRoleQuery) => {
    console.log("service:=", query)
    return await roleRepository.getAllRoles(query);
}

export const getRoleBiId= async (id:number)=>{
    const role=await roleRepository.findRoleById(id);
    if(!role){
        throw new AppError("Role does not exist",404);
    }
    return role;
}

export const updteRoleById = async (id:number,data:UpdateRoleInput)=>{
    const findRole=await roleRepository.findRoleById(id);
    if(!findRole){
        throw new AppError("Role does not exist",404)
    }
    if(data.name&&data.name!=""){
        const roleBySameName= await roleRepository.findRoleByName(data.name)
        if(roleBySameName && roleBySameName.id!==id){
            throw new AppError("Role Already Exists!",409)
        }
    }
    return await roleRepository.updateRoleById(id,data)
}


export const updateRoleStatus = async (id:number,data:UpdateRoleStatusInput)=>{
    const getRoleDetails = await roleRepository.findRoleById(id);
    if(!getRoleDetails){
        throw new AppError("Role Does Not Exist.",404)
    }
    if(getRoleDetails.isActive===data.isActive){
        throw new AppError(
            data.isActive?"Role is Already Active":
            "Role is Already Deactive.",
            400
        )
    }
    return await roleRepository.updateRoleStatus(id,data.isActive)
}