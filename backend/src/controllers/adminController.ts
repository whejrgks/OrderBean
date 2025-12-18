import { Request, Response } from 'express'
import * as adminService from '../services/adminService'

export const getDashboard = async (req: Request, res: Response) => {
  const stats = await adminService.getDashboardStats()
  res.json(stats)
}

export const getRecentOrders = async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined
  const orders = await adminService.getRecentOrders(limit)
  res.json(orders)
}

