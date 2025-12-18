import { Router } from 'express'
import * as orderController from '../controllers/orderController'

const router = Router()

router.post('/', orderController.createOrder)
router.get('/', orderController.getAllOrders)
router.get('/:id', orderController.getOrderById)
router.patch('/:id/status', orderController.updateOrderStatus)

export default router

