import { Router } from 'express';
import roleRouter from './role.routes.js'
import permissionRouter from './permission.routes.js'

const router=Router();

router.use('/roles',roleRouter)
router.use('/permissions',permissionRouter)

export default router;