import z from "zod"

export const assignPermissionSchema = z.object({
    permissionIds:z.array(z.coerce.number().int().positive()).min(1,"At least one permission is required")
})

export type AssignPermissionInput = z.infer < typeof assignPermissionSchema >