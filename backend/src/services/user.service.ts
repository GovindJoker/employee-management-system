import AppError from '../errors/AppError.js';
import * as userRepository from '../repositories/user.repository.js'
import { CreateUserInput } from '../validations/user.validation.js'
import bcrypt from 'bcrypt'

export const createUser = async (data:CreateUserInput)=>{
    const {email,password,roleId}=data
    const existingUser  = await userRepository.findUserByEmail(email);
    if(existingUser ){
        throw new AppError("User with this email already exist.",409);
    }
    const existingRole = await userRepository.findRoleById(roleId);
    if(!existingRole){
        throw new AppError("Role does not exist.",404);
    }
    if(!existingRole.isActive){
        throw new AppError("Can not assigne inactive role.",409)
    }
    if(existingRole.name==="Super Admin"){
        throw new AppError("Super Admin can not be created through this API.",403)
    }

    const passwordHash = await bcrypt.hash(password,12);
    return await userRepository.createUser(email,passwordHash,roleId)
}