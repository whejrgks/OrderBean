import { Request, Response } from 'express'
import { adminService } from '../services/adminService'

export const adminController = {
  async getDashboard(req: Request, res: Response) {
    try {
      const stats = await adminService.getDashboardStats()
      res.json(stats)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  },

  async getRecentOrders(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10
      const orders = await adminService.getRecentOrders(limit)
      res.json({ orders })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  },
}

