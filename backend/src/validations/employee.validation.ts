import z from "zod";

export const createEmployeeSchema = z.object({
  // Employee information
  employeeCode: z
    .string()
    .trim()
    .min(1, "Employee code is required."),

  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name cannot exceed 50 characters."),

  lastName: z
    .string()
    .trim()
    .max(50, "Last name cannot exceed 50 characters.")
    .optional(),

  email: z
    .email("Invalid email address.")
    .trim()
    .toLowerCase(),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must contain exactly 10 digits.")
    .optional(),

  // Personal information
  dateOfBirth: z
    .coerce
    .date()
    .optional(),

  gender: z
    .string()
    .trim()
    .max(20, "Gender cannot exceed 20 characters.")
    .optional(),

  // Address
  address: z
    .string()
    .trim()
    .max(255, "Address cannot exceed 255 characters.")
    .optional(),

  city: z
    .string()
    .trim()
    .max(100, "City cannot exceed 100 characters.")
    .optional(),

  state: z
    .string()
    .trim()
    .max(100, "State cannot exceed 100 characters.")
    .optional(),

  country: z
    .string()
    .trim()
    .max(100, "Country cannot exceed 100 characters.")
    .optional(),

  postalCode: z
    .string()
    .trim()
    .max(20, "Postal code cannot exceed 20 characters.")
    .optional(),

  // Emergency contact
  emergencyContactName: z
    .string()
    .trim()
    .max(100, "Emergency contact name cannot exceed 100 characters.")
    .optional(),

  emergencyContactPhone: z
    .string()
    .trim()
    .regex(
      /^[0-9]{10}$/,
      "Emergency contact phone must contain exactly 10 digits."
    )
    .optional(),

  // Employment information
  joiningDate: z
    .coerce
    .date(),

  departmentId: z
    .coerce
    .number()
    .int()
    .positive(),

  designationId: z
    .coerce
    .number()
    .int()
    .positive(),

  employmentTypeId: z
    .coerce
    .number()
    .int()
    .positive(),

  // Organization / responsibility
  reportsToId: z
    .coerce
    .number()
    .int()
    .positive()
    .optional(),

  managerId: z
    .coerce
    .number()
    .int()
    .positive()
    .optional(),

  teamLeadId: z
    .coerce
    .number()
    .int()
    .positive()
    .optional(),

  hrId: z
    .coerce
    .number()
    .int()
    .positive()
    .optional(),

  // Status
  isActive: z
    .boolean()
    .optional(),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;