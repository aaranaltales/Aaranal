import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import router from './routes/index.js'

// App Config
const app = express()
const port = process.env.PORT || 5000
connectDB()

// ✅ FIX FOR GOOGLE LOGIN POPUP
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none")
  next()
})

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api', router)

app.get('/', (req, res) => {
  res.send("API Working")
})

app.listen(port, () => console.log('Server started on PORT ' + port))
