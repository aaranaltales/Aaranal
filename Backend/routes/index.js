import express from 'express'
import userRouter from './userRoute.js'
import productRouter from './productRoute.js'
import cartRouter from './cartRoute.js'
import orderRouter from './orderRoute.js'
import wishlistRouter from './wishlistRoute.js'
import otpRouter from './otpRoute.js'

const router = express.Router()

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/wishlist', wishlistRouter)
router.use('/order', orderRouter)
router.use('/otp', otpRouter)

export default router;