import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import menuRoutes from './routes/menuRoutes'
import orderRoutes from './routes/orderRoutes'
import adminRoutes from './routes/adminRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OrderBean API Server' })
})

// Routes
app.use('/api/menus', menuRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(err.statusCode || 500).json({ 
    error: err.message || 'Something went wrong!' 
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})

