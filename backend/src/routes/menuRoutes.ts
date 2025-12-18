import { Router } from 'express'
import * as menuController from '../controllers/menuController'

const router = Router()

router.get('/', menuController.getAllMenus)
router.get('/:id', menuController.getMenuById)
router.post('/', menuController.createMenu)
router.put('/:id', menuController.updateMenu)
router.delete('/:id', menuController.deleteMenu)
router.patch('/:id/toggle-availability', menuController.toggleAvailability)

export default router

