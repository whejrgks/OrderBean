import { Request, Response } from 'express'
import { menuService } from '../services/menuService'

export const menuController = {
  async getAll(req: Request, res: Response) {
    try {
      const { category } = req.query
      const menus = category
        ? await menuService.getByCategory(category as string)
        : await menuService.getAll()
      res.json({ menus })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const menu = await menuService.getById(id)
      if (!menu) {
        return res.status(404).json({ error: 'Menu not found' })
      }
      res.json({ menu })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  },

  async create(req: Request, res: Response) {
    try {
      const menu = await menuService.create(req.body)
      res.status(201).json({ menu })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const menu = await menuService.update(id, req.body)
      res.json({ menu })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      await menuService.delete(id)
      res.json({ message: 'Menu deleted successfully' })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  },

  async toggleAvailability(req: Request, res: Response) {
    try {
      const { id } = req.params
      const menu = await menuService.toggleAvailability(id)
      res.json({ menu })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  },
}

