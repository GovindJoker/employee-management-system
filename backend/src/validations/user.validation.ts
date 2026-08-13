import z from "zod";


export const createUserSchema = z.object({
    email:z.string().email("Invalid email address").trim().toLowerCase(),
    password:z.string() .min(8, "Password must be at least 8 characters")
        .max(100, "Password must not exceed 100 characters"),
    roleId:z.coerce.number().int().positive()
})

export type CreateUserInput = z.infer<typeof createUserSchema>