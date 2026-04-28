import express from 'express'
import { initDB } from './src/config/db.js'
import userController from './src/controllers/UserController.js'
import userRoutes from './src/routes/userRoutes.js'

const app = express()
app.use(express.json())

app.get('/', userController.welcome.bind(userController))
app.use('/users', userRoutes)

async function startServer() {
  try {
    await initDB()
    const PORT = process.env.PORT ?? 3000
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
