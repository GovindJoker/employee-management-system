import { Router } from 'express';
import roleRouter from './role.routes.js'
import permissionRouter from './permission.routes.js'
import rolePermissionRouter from './rolePermission.routes.js'
import userRouter from './user.routes.js'
import departmentRouter from './department.routes.js'
import designationRouter from './designation.routes.js'
import employmentTypeRouter  from './employmentType.routes.js'
import employeeRouter from './employee.routes.js'
const router=Router();

router.use('/roles',roleRouter)
router.use('/permissions',permissionRouter)
router.use('/roles',rolePermissionRouter)
router.use('/users',userRouter)
router.use('/department',departmentRouter)
router.use('/designation',designationRouter)
router.use('/employment-type',employmentTypeRouter)
router.use('/employee',employeeRouter)
export default router;