import prisma from "../config/prisma.js";
import { AssignPermissionInput } from "../validations/rolePermission.validation.js";




export const getRoleById = async (roleId: number) => {
  return await prisma.role.findUnique({
    where: {
      id: roleId,
    },
  });
};

export const getPermissionsByIds = async (permissionIds: number[]) => {
  return await prisma.permission.findMany({
    where: {
      id: {
        in: permissionIds,
      },
    },
  });
};

export const getExistingRolePermissions = async (
  roleId: number,
  permissionIds: number[]
) => {
  return await prisma.rolePermission.findMany({
    where: {
      roleId,
      permissionId: {
        in: permissionIds,
      },
    },
  });
};

export const assignPermission = async (
  roleId: number,
  permissionIds: number[]
) => {
  const data = permissionIds.map((permissionId) => ({
    roleId,
    permissionId,
  }));

  return await prisma.rolePermission.createMany({
    data,
  });
};