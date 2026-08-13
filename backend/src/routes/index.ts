import { Router } from 'express';
import roleRouter from './role.routes.js'
import permissionRouter from './permission.routes.js'
import rolePermissionRouter from './rolePermission.routes.js'

const router=Router();

router.use('/roles',roleRouter)
router.use('/permissions',permissionRouter)
router.use('/role-permission',rolePermissionRouter)

export default router;