import { Router } from 'express'
import { menuController } from '../controllers/menuController'

const router = Router()

router.get('/', menuController.getAll)
router.get('/:id', menuController.getById)
router.post('/', menuController.create)
router.put('/:id', menuController.update)
router.delete('/:id', menuController.delete)
router.patch('/:id/toggle-availability', menuController.toggleAvailability)

export default router

