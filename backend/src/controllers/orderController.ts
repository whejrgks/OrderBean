import { Request, Response } from 'express'
import * as orderService from '../services/orderService'

export const createOrder = async (req: Request, res: Response) => {
  const order = await orderService.createOrder(req.body)
  res.status(201).json(order)
}

export const getAllOrders = async (req: Request, res: Response) => {
  const { customerId, status } = req.query
  const filters = { customerId, status }
  const orders = await orderService.getAllOrders(filters)
  res.json(orders)
}

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params
  const order = await orderService.getOrderById(id)
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' })
  }
  
  res.json(order)
}

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body
  const order = await orderService.updateOrderStatus(id, status)
  res.json(order)
}

