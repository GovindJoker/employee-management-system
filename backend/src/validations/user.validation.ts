import z from "zod";


export const createUserSchema = z.object({
    email:z.string().email("Invalid email address").trim().toLowerCase(),
    password:z.string() .min(8, "Password must be at least 8 characters")
        .max(100, "Password must not exceed 100 characters"),
    roleId:z.coerce.number().int().positive()
})

export type CreateUserInput = z.infer<typeof createUserSchema>


export const getUserSchema = z.object({
    page:z.coerce.number().default(1),
    limit:z.coerce.number().default(10),
    search:z.string().optional(),
    sortBy:z.enum(["email","createdAt"]).default("createdAt"),
    sortOrder:z.enum(["asc","desc"]).default("desc"),
    isActive:z.enum(["true","false","all"]).transform((value)=>{
        if(value==="all"){
            return undefined
        }
        return value==="true"
    })
})

export type GetUserQuery = z.infer<typeof getUserSchema>


export const updateUserSchema = z.object({
    email:z.string().email("Invalid Email address").trim().toLowerCase().optional(),
    roleId:z.coerce.number().int().positive().optional()
})

export type UpdateUserInput = z.infer < typeof updateUserSchema >