import prisma from "../config/prisma.js";
import { CreateEmployeeInput } from "../validations/employee.validation.js";

export const createEmployee = async (data: CreateEmployeeInput) => {
  return await prisma.employee.create({
    data,
  });
};

// Employee code
export const findEmployeeByEmpCode = async (employeeCode: string) => {
  return await prisma.employee.findUnique({
    where: {
      employeeCode,
    },
  });
};

// Employee email
export const findEmployeeByEmail = async (email: string) => {
  return await prisma.employee.findUnique({
    where: {
      email,
    },
  });
};

// Employee by ID
export const findEmployeeById = async (id: number) => {
  return await prisma.employee.findUnique({
    where: {
      id,
    },
  });
};

// Department
export const findDepartmentById = async (id: number) => {
  return await prisma.department.findUnique({
    where: {
      id,
    },
  });
};

// Designation
export const findDesignationById = async (id: number) => {
  return await prisma.designation.findUnique({
    where: {
      id,
    },
  });
};

// Employment Type
export const findEmploymentTypeById = async (id: number) => {
  return await prisma.employmentType.findUnique({
    where: {
      id,
    },
  });
};