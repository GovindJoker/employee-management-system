import z from "zod";



export const createDepartmentSchema = z.object({
    name:z.string()
        .min(2,"Department name must be 2 characters")
        .max(50,"Department name can not exceed 50 characters"),
    description:z.string()
        .max(200,"Department name can not exceed 200 characters")
        .optional()
})

export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>


export const getDepartmentSchema = z.object({
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

export type GetDepartmentQuery = z.infer<typeof getDepartmentSchema>


export const updateDepartmentSchema = z.object({
    name:z.string().trim()
        .min(2,"Department name must be 2 characters")
        .max(50,"Department name can not exceed 50 characters")
        .optional(),
    description :z.string()
        .max(200,"Department name can not exceed 200 characters")
        .optional()
}).refine((data)=>Object.keys(data).length>0,{
    message:"At least one field is required for update."
})

export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>


export const updateDepartmentStatusSchema = z.object({
    isActive:z.boolean()
})

export type UpdateDepartmentStatusInput = z.infer<typeof updateDepartmentStatusSchema>