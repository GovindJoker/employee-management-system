// employmentType
import AppError from '../errors/AppError.js';
import * as employmentTypeRepository from '../repositories/employmentType.repository.js'
import { CreateEmploymentTypeInput, GetEmploymentTypeQuery, UpdateEmploymentTypeInput, UpdateEmploymentTypeStatusInput } from "../validations/employmentType.validation.js";


export const createEmploymentType = async (data:CreateEmploymentTypeInput)=>{
    const checkEmploymentTypeNameExist = await employmentTypeRepository.findEmploymentTypeByName(data.name);
    if(checkEmploymentTypeNameExist){
        throw new AppError("Employment Type already exist",409);
    }
    return await employmentTypeRepository.createEmploymentType(data);
}

export const getEmploymentTypes = async (query:GetEmploymentTypeQuery)=>{
    return await employmentTypeRepository.getEmploymentTypes(query)
}

export const getEmploymentTypeById = async (id:number)=>{
    const data = await employmentTypeRepository.getEmploymentTypeById(id)
    if(!data){
        throw new AppError("Employment Type not found",404)
    }
    return data;
}

export const updateEmploymentType = async (id:number,data:UpdateEmploymentTypeInput)=>{
    const EmploymentTypeDetailsById = await employmentTypeRepository.getEmploymentTypeById(id);
    if(!EmploymentTypeDetailsById){
        throw new AppError("Employment Type not found",404)
    }
    const name = data.name?.trim()
    console.log(name)
    if(name&&name!==""&&name!==EmploymentTypeDetailsById.name){
        const EmploymentTypeDetailsByName = await employmentTypeRepository.findEmploymentTypeByName(name)
        if(EmploymentTypeDetailsByName){
            throw new AppError("Employment Type already exist",409)
        }
    }
    return await employmentTypeRepository.updateEmploymentType(id,data)
}

export const updateEmploymentTypeStatus = async (id:number,data:UpdateEmploymentTypeStatusInput)=>{
    const EmploymentTypeDetailsById = await employmentTypeRepository.getEmploymentTypeById(id);
    if(!EmploymentTypeDetailsById){
        throw new AppError("Employment Type not found",404)
    }
    if(EmploymentTypeDetailsById.isActive===data.isActive){
        throw new AppError(data.isActive?"EmploymentType status is already Active.":"EmploymentType status is already inActive.",409)
    }
    return await employmentTypeRepository.updateEmploymentTypeStatus(id,data)
}