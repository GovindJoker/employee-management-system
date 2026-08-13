import AppError from '../errors/AppError.js';
import * as departmentRepository from '../repositories/department.repository.js'
import { CreateDepartmentInput, GetDepartmentQuery } from "../validations/department.validation.js";


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