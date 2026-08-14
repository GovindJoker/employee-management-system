import AppError from '../errors/AppError.js';
import * as designationRepository from '../repositories/designation.repository.js'
import { CreateDesignationInput, GetDesignationQuery, UpdateDesignationInput, UpdateDesignationStatusInput } from "../validations/designation.validation.js";


export const createDesignation = async (data:CreateDesignationInput)=>{
    const checkDesignationNameExist = await designationRepository.findDesignationByName(data.name);
    if(checkDesignationNameExist){
        throw new AppError("Designation already exist",409);
    }
    return await designationRepository.createDesignation(data);
}

export const getDesignations = async (query:GetDesignationQuery)=>{
    return await designationRepository.getDesignations(query)
}

export const getDesignationById = async (id:number)=>{
    const data = await designationRepository.getDesignationById(id)
    if(!data){
        throw new AppError("Designation not found",404)
    }
    return data;
}

export const updateDesignation = async (id:number,data:UpdateDesignationInput)=>{
    const DesignationDetailsById = await designationRepository.getDesignationById(id);
    if(!DesignationDetailsById){
        throw new AppError("Designation not found",404)
    }
    const name = data.name?.trim()
    console.log(name)
    if(name&&name!==""&&name!==DesignationDetailsById.name){
        const DesignationDetailsByName = await designationRepository.findDesignationByName(name)
        if(DesignationDetailsByName){
            throw new AppError("Designation already exist",409)
        }
    }
    return await designationRepository.updateDesignation(id,data)
}

export const updateDesignationStatus = async (id:number,data:UpdateDesignationStatusInput)=>{
    const DesignationDetailsById = await designationRepository.getDesignationById(id);
    if(!DesignationDetailsById){
        throw new AppError("Designation not found",404)
    }
    if(DesignationDetailsById.isActive===data.isActive){
        throw new AppError(data.isActive?"Designation status is already Active.":"Designation status is already inActive.",409)
    }
    return await designationRepository.updateDesignationStatus(id,data)
}