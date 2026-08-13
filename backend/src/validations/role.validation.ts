import { z } from "zod";

export const createSchemaRole=z.object({
    name:z.string()
        .min(2,"Role name must be at least 2 characters")
        .max(50,"Role name cannot exceed 50 characters"),
    description:z.string()
        .max(250,"Description cannot exceed 255 characters")
        .optional()
})

export type CreateRoleInput = z.infer<typeof createSchemaRole>;

export const getRolesSchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().min(10).max(100).default(10),
    search: z.string().optional(),
    sortBy: z.enum(["name","createdAt"]).default("createdAt"),
    sortOrder: z.enum(["asc","desc"]).default("desc"),
    isActive: z.enum(["true","false","all"]).transform((value)=>{
        if(value==="all"){
            return undefined
        }
        return value==="true"
    }).optional()
})

export type GetRoleQuery = z.infer<typeof getRolesSchema>;


export const updateRoleSchema=z.object({
    name: z.string()
        .min(2,"Role name must be at least 2 characters")
        .max(50,"Role name cannot exceed 50 characters")
        .optional(),
     description:z.string()
        .max(250,"Description cannot exceed 255 characters")
        .optional()
})

export type UpdateRoleInput= z.infer< typeof updateRoleSchema >


export const updateRoleStatusSchema = z.object({
    isActive:z.boolean()
})

export type UpdateRoleStatusInput= z.infer< typeof updateRoleStatusSchema >



