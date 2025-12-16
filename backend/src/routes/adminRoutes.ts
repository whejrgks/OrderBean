import { Router } from 'express'
import { adminController } from '../controllers/adminController'

const router = Router()

router.get('/dashboard', adminController.getDashboard)
router.get('/recent-orders', adminController.getRecentOrders)

export default router

