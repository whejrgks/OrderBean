import { Router } from 'express'
import { orderController } from '../controllers/orderController'

const router = Router()

router.post('/', orderController.create)
router.get('/', orderController.getAll)
router.get('/:id', orderController.getById)
router.patch('/:id/status', orderController.updateStatus)

export default router

