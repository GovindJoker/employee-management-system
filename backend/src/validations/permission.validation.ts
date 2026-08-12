import z from "zod";


export const createPermissionSchema =z.object({
    name:z.string()
    .min(2, "Permission name must be at least 2 characters")
    .max(100, "Permission name cannot exceed 100 characters")
    .trim(),
    description: z
    .string()
    .max(255, "Description cannot exceed 255 characters")
    .trim()
    .optional(),
})

export type CreatePermissionInput = z.infer<typeof createPermissionSchema>



export const getPermissionSchema = z.object({
    page:z.coerce.number().default(1),
    limit:z.coerce.number().min(10).max(100).default(10),
    search:z.string().optional(),
    sortBy:z.enum(["name","createdAt"]).default("createdAt"),
    sortOrder:z.enum(["asc","desc"]).default("desc"),
    isActive: z.enum(["true","false","all"]).transform((value)=>{
            if(value==="all"){
                return undefined
            }
            return value==="true"
        }).optional()
}) 

export type GetPermissionQuery = z.infer<typeof getPermissionSchema>


export const updatePermissionSchema = z.object({
  name:z.string()
  .min(2, "Permission name must be at least 2 characters")
    .max(100, "Permission name cannot exceed 100 characters")
    .optional(),
    description:z.string()
    .max(250,"Description can not eceed 250 charactors")
    .optional()
})

export type UpdatePermissionInput = z.infer<typeof updatePermissionSchema>


export const updatePermissionStatusSchema = z.object({
    isActive:z.boolean()
})

export type UpdatePermissionStatusInput = z.infer<typeof updatePermissionStatusSchema>