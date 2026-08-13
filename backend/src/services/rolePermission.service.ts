import * as rolePermissionRepository from '../repositories/rolePermission.repository.js'
import { AssignPermissionInput } from '../validations/rolePermission.validation.js'
import AppError from "../errors/AppError.js";

export const assignPermission = async (
    roleId: number,
    data: AssignPermissionInput
) => {
    // --------------------------------
    // 1. Find role
    // --------------------------------

    const role = await rolePermissionRepository.getRoleById(roleId);

    if (!role) {
        throw new AppError("Role does not exist", 404);
    }

    // --------------------------------
    // 2. Check role status
    // --------------------------------

    if (!role.isActive) {
        throw new AppError("Cannot assign permission to an inactive role", 400);
    }

    // --------------------------------
    // 3. Remove duplicate permission IDs
    // --------------------------------

    const permissionIds = [...new Set(data.permissionIds)];

    // --------------------------------
    // 4. Find permissions
    // --------------------------------

    const permissions =
        await rolePermissionRepository.getPermissionsByIds(permissionIds);

    // --------------------------------
    // 5. Check whether all permissions exist
    // --------------------------------

    const foundPermissionIds = permissions.map(
        (permission) => permission.id
    );

    const missingPermissionIds = permissionIds.filter(
        (id) => !foundPermissionIds.includes(id)
    );

    if (missingPermissionIds.length > 0) {
        throw new AppError(
            `Permission(s) not found: ${missingPermissionIds.join(", ")}`,
            404
        );
    }

    // --------------------------------
    // 6. Check permission status
    // --------------------------------

    const inactivePermissions = permissions.filter(
        (permission) => !permission.isActive
    );

    if (inactivePermissions.length > 0) {
        throw new AppError(
            `Permission(s) inactive: ${inactivePermissions
                .map((permission) => permission.id)
                .join(", ")}`,
            400
        );
    }

    // --------------------------------
    // 7. Find already assigned permissions
    // --------------------------------

    const existingRolePermissions =
        await rolePermissionRepository.getExistingRolePermissions(
            roleId,
            permissionIds
        );

    const alreadyAssignedIds = existingRolePermissions.map(
        (item) => item.permissionId
    );

    // --------------------------------
    // 8. Keep only new permissions
    // --------------------------------

    const permissionsToAssign = permissionIds.filter(
        (permissionId) => !alreadyAssignedIds.includes(permissionId)
    );

    // --------------------------------
    // 9. Nothing new to assign
    // --------------------------------

    if (permissionsToAssign.length === 0) {
        return {
            assigned: [],
            alreadyAssigned: alreadyAssignedIds,
        };
    }

    // --------------------------------
    // 10. Assign new permissions
    // --------------------------------

    await rolePermissionRepository.assignPermission(
        roleId,
        permissionsToAssign
    );

    // --------------------------------
    // 11. Return useful result
    // --------------------------------

    return {
        assigned: permissionsToAssign,
        alreadyAssigned: alreadyAssignedIds,
    };
};


export const getRolePermissions = async (roleId:number)=>{

    return rolePermissionRepository.getRolePermissions(roleId);
}

export const removeRolePermission = async (roleId:number,permissionId:number)=>{
    const findRolePermission  = await rolePermissionRepository.getExistRolePermissionByRoleIdPermissionId(roleId,permissionId)
    if(!findRolePermission){
        console.log(findRolePermission)
        throw new AppError("Permission Does not exist in this role.",404);
    }
    return await rolePermissionRepository.removeRolePermission(roleId,permissionId);
}