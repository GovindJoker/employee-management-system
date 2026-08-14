import AppError from '../errors/AppError.js';
import * as departmentRepository from '../repositories/department.repository.js'
import { CreateDepartmentInput, GetDepartmentQuery, UpdateDepartmentInput, UpdateDepartmentStatusInput } from "../validations/department.validation.js";


export const createDepartment = async (data:CreateDepartmentInput)=>{
    const checkDepartmentNameExist = await departmentRepository.findDepartmentByName(data.name);
    if(checkDepartmentNameExist){
        throw new AppError("Department already exist",409);
    }
    return await departmentRepository.createDepartment(data);
}

export const getDepartments = async (query:GetDepartmentQuery)=>{
    return await departmentRepository.getDepartments(query)
}

export const getDepartmentById = async (id:number)=>{
    const data = await departmentRepository.getDepartmentById(id)
    if(!data){
        throw new AppError("Department not found",404)
    }
    return data;
}

export const updateDepartment = async (id:number,data:UpdateDepartmentInput)=>{
    const departmentDetailsById = await departmentRepository.getDepartmentById(id);
    if(!departmentDetailsById){
        throw new AppError("Department not found",404)
    }
    const name = data.name?.trim()
    if(name&&name!==""&&name!==departmentDetailsById.name){
        const departmentDetailsByName = await departmentRepository.findDepartmentByName(name)
        if(departmentDetailsByName){
            throw new AppError("Department already exist",409)
        }
    }
    return await departmentRepository.updateDepartment(id,data)
}

export const updateDepartmentStatus = async (id:number,data:UpdateDepartmentStatusInput)=>{
    const departmentDetailsById = await departmentRepository.getDepartmentById(id);
    if(!departmentDetailsById){
        throw new AppError("Department not found",404)
    }
    if(departmentDetailsById.isActive===data.isActive){
        throw new AppError(data.isActive?"Department status is already Active.":"Department status is already inActive.",409)
    }
    return await departmentRepository.updateDepartmentStatus(id,data)
}