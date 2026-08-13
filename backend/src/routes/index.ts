import { Router } from 'express';
import roleRouter from './role.routes.js'
import permissionRouter from './permission.routes.js'
import rolePermissionRouter from './rolePermission.routes.js'
import userRouter from './user.routes.js'

const router=Router();

router.use('/roles',roleRouter)
router.use('/permissions',permissionRouter)
router.use('/roles',rolePermissionRouter)
router.use('/users',userRouter)

export default router;