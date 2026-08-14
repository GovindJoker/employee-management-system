import z from "zod";



export const createEmploymentTypeSchema = z.object({
    name:z.string()
        .min(2,"EmploymentType name must be 2 characters")
        .max(50,"EmploymentType name can not exceed 50 characters"),
    description:z.string()
        .max(200,"EmploymentType name can not exceed 200 characters")
        .optional()
})

export type CreateEmploymentTypeInput = z.infer<typeof createEmploymentTypeSchema>


export const getEmploymentTypeSchema = z.object({
    page:z.coerce.number().default(1),
    limit : z.coerce.number().default(10),
    search: z.string().optional(),
    sortBy: z.enum(["name","createdAt"]).default("createdAt"),
    sortOrder: z.enum(["asc","desc"]).default("desc"),
    isActive:z.enum(["true","false","all"]).transform((value)=>{
        if(value==="all"){
            return undefined;
        }
        return value==="true"
    })
})

export type GetEmploymentTypeQuery = z.infer<typeof getEmploymentTypeSchema>


export const updateEmploymentTypeSchema = z.object({
    name:z.string().trim()
        .min(2,"EmploymentType name must be 2 characters")
        .max(50,"EmploymentType name can not exceed 50 characters")
        .optional(),
    description :z.string()
        .max(200,"EmploymentType name can not exceed 200 characters")
        .optional()
}).refine((data)=>Object.keys(data).length>0,{
    message:"At least one field is required for update."
})

export type UpdateEmploymentTypeInput = z.infer<typeof updateEmploymentTypeSchema>


export const updateEmploymentTypeStatusSchema = z.object({
    isActive:z.boolean()
})

export type UpdateEmploymentTypeStatusInput = z.infer<typeof updateEmploymentTypeStatusSchema>