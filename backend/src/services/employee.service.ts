import AppError from "../errors/AppError.js";
import * as employeeRepository from "../repositories/employee.repository.js";
import { CreateEmployeeInput } from "../validations/employee.validation.js";

export const createEmployee = async (data: CreateEmployeeInput) => {
  // Employee Code
  const employeeByCode =
    await employeeRepository.findEmployeeByEmpCode(data.employeeCode);

  if (employeeByCode) {
    throw new AppError("Employee code already exists.", 409);
  }

  // Email
  const employeeByEmail =
    await employeeRepository.findEmployeeByEmail(data.email);

  if (employeeByEmail) {
    throw new AppError("Employee with this email already exists.", 409);
  }

  // Department
  const department =
    await employeeRepository.findDepartmentById(data.departmentId);

  if (!department) {
    throw new AppError("Department does not exist.", 404);
  }

  if (!department.isActive) {
    throw new AppError("Cannot assign inactive department.", 409);
  }

  // Designation
  const designation =
    await employeeRepository.findDesignationById(data.designationId);

  if (!designation) {
    throw new AppError("Designation does not exist.", 404);
  }

  if (!designation.isActive) {
    throw new AppError("Cannot assign inactive designation.", 409);
  }

  // Employment Type
  const employmentType =
    await employeeRepository.findEmploymentTypeById(
      data.employmentTypeId
    );

  if (!employmentType) {
    throw new AppError("Employment type does not exist.", 404);
  }

  if (!employmentType.isActive) {
    throw new AppError(
      "Cannot assign inactive employment type.",
      409
    );
  }

  // Reports To
  if (data.reportsToId) {
    const reportsTo =
      await employeeRepository.findEmployeeById(data.reportsToId);

    if (!reportsTo) {
      throw new AppError(
        "Reports-to employee does not exist.",
        404
      );
    }

    if (!reportsTo.isActive) {
      throw new AppError(
        "Reports-to employee is inactive.",
        409
      );
    }
  }

  // Manager
  if (data.managerId) {
    const manager =
      await employeeRepository.findEmployeeById(data.managerId);

    if (!manager) {
      throw new AppError("Manager does not exist.", 404);
    }

    if (!manager.isActive) {
      throw new AppError("Manager is inactive.", 409);
    }
  }

  // Team Lead
  if (data.teamLeadId) {
    const teamLead =
      await employeeRepository.findEmployeeById(data.teamLeadId);

    if (!teamLead) {
      throw new AppError("Team lead does not exist.", 404);
    }

    if (!teamLead.isActive) {
      throw new AppError("Team lead is inactive.", 409);
    }
  }

  // HR
  if (data.hrId) {
    const hr =
      await employeeRepository.findEmployeeById(data.hrId);

    if (!hr) {
      throw new AppError("HR employee does not exist.", 404);
    }

    if (!hr.isActive) {
      throw new AppError("HR employee is inactive.", 409);
    }
  }

  return await employeeRepository.createEmployee(data);
};