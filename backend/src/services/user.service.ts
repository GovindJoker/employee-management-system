import AppError from '../errors/AppError.js';
import * as userRepository from '../repositories/user.repository.js'
import { CreateUserInput, GetUserQuery, UpdateUserInput, UpdateUserStatusInput } from '../validations/user.validation.js'
import bcrypt from 'bcrypt'

export const createUser = async (data: CreateUserInput) => {
    const { email, password, roleId } = data
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
        throw new AppError("User with this email already exist.", 409);
    }
    const existingRole = await userRepository.findRoleById(roleId);
    if (!existingRole) {
        throw new AppError("Role does not exist.", 404);
    }
    if (!existingRole.isActive) {
        throw new AppError("Can not assigne inactive role.", 409)
    }
    if (existingRole.name === "Super Admin") {
        throw new AppError("Super Admin can not be created through this API.", 403)
    }

    const passwordHash = await bcrypt.hash(password, 12);
    return await userRepository.createUser(email, passwordHash, roleId)
}


export const getUsers = async (query: GetUserQuery) => {
    return await userRepository.getUsers(query);
}

export const getUserById = async (id: number) => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        throw new AppError("User Does not exist.", 404)
    }
    return user;
}


export const updateUser = async (id: number, data: UpdateUserInput) => {
    const user = await userRepository.getUserById(id);
    //  user exist or not
    if (!user) {
        throw new AppError("User does  not exist", 404);
    }

    // check duplicate email 
    if (data.email && data.email !== "") {
        const checkEmailInUser = await userRepository.findUserByEmail(data.email);
        if (checkEmailInUser && checkEmailInUser.id !== id) {
            throw new AppError("Email already exist in another user", 409 )
        }
    }

    // check for role update
    if (data.roleId !== undefined) {
        if (user.role.name === "Super Admin") {
            throw new AppError("Super Admin role can not be change", 403)
        }
        const getRoleDetails = await userRepository.findRoleById(data.roleId)

        if (!getRoleDetails) {
            throw new AppError("Role does not exist", 404)
        }
         if (getRoleDetails.name === "Super Admin") {
            throw new AppError("Super Admin can not be assigned through this API.", 403)
        }


        if (!getRoleDetails.isActive) {
            throw new AppError("Can not assigne inactive role.", 409)
        }

       

        if (user.role.id === data.roleId) {
            throw new AppError("Role Already exist in this user.", 409)
        }
    }

    return await userRepository.updateUser(id, data)
} 


export const updateUserStatus = async (id:number,data:UpdateUserStatusInput)=>{
    const userDetails = await userRepository.getUserById(id);
    if(!userDetails){
        throw new AppError("User does not exist",404);
    }
    if(userDetails.role.name==="Super Admin"){
        throw new AppError("Super Admin can not deactive by this API.",403)
    }
    return await userRepository.updateUserStatus(id,data);

    // return await prisma
}