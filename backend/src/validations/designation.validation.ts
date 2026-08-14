import z from "zod";



export const createDesignationSchema = z.object({
    name:z.string()
        .min(2,"Designation name must be 2 characters")
        .max(50,"Designation name can not exceed 50 characters"),
    description:z.string()
        .max(200,"Designation name can not exceed 200 characters")
        .optional()
})

export type CreateDesignationInput = z.infer<typeof createDesignationSchema>


export const getDesignationSchema = z.object({
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

export type GetDesignationQuery = z.infer<typeof getDesignationSchema>


export const updateDesignationSchema = z.object({
    name:z.string().trim()
        .min(2,"Designation name must be 2 characters")
        .max(50,"Designation name can not exceed 50 characters")
        .optional(),
    description :z.string()
        .max(200,"Designation name can not exceed 200 characters")
        .optional()
}).refine((data)=>Object.keys(data).length>0,{
    message:"At least one field is required for update."
})

export type UpdateDesignationInput = z.infer<typeof updateDesignationSchema>


export const updateDesignationStatusSchema = z.object({
    isActive:z.boolean()
})

export type UpdateDesignationStatusInput = z.infer<typeof updateDesignationStatusSchema>