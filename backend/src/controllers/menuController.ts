import { Request, Response } from 'express'
import * as menuService from '../services/menuService'

export const getAllMenus = async (req: Request, res: Response) => {
  const menus = await menuService.getAllMenus()
  res.json(menus)
}

export const getMenuById = async (req: Request, res: Response) => {
  const { id } = req.params
  const menu = await menuService.getMenuById(id)
  
  if (!menu) {
    return res.status(404).json({ error: 'Menu not found' })
  }
  
  res.json(menu)
}

export const createMenu = async (req: Request, res: Response) => {
  const menu = await menuService.createMenu(req.body)
  res.status(201).json(menu)
}

export const updateMenu = async (req: Request, res: Response) => {
  const { id } = req.params
  const menu = await menuService.updateMenu(id, req.body)
  res.json(menu)
}

export const deleteMenu = async (req: Request, res: Response) => {
  const { id } = req.params
  await menuService.deleteMenu(id)
  res.json({ success: true })
}

export const toggleAvailability = async (req: Request, res: Response) => {
  const { id } = req.params
  const menu = await menuService.toggleAvailability(id)
  res.json(menu)
}

