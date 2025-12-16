import { Request, Response } from 'express'
import { orderService } from '../services/orderService'
import { OrderStatus } from '../models/Order'

export const orderController = {
  async create(req: Request, res: Response) {
    try {
      // 고객 ID는 세션 또는 헤더에서 가져올 수 있음 (현재는 body에서)
      const customerId = req.body.customerId || `customer-${Date.now()}`
      const order = await orderService.create({
        ...req.body,
        customerId,
      })
      res.status(201).json({ order })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const { customerId, status } = req.query
      let orders

      if (status) {
        orders = await orderService.getByStatus(status as OrderStatus)
      } else {
        orders = await orderService.getAll(customerId as string | undefined)
      }

      res.json({ orders })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const order = await orderService.getById(id)
      if (!order) {
        return res.status(404).json({ error: 'Order not found' })
      }
      res.json({ order })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { status } = req.body
      const order = await orderService.updateStatus(id, { status })
      res.json({ order })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  },
}

