import express from 'express'

import { authUser } from '../middleware/auth.js'
import { getUserWishlist, toggleWishlistItem } from '../controllers/wishlistController.js'

const wishlistRouter = express.Router()

wishlistRouter.post('/get', authUser, getUserWishlist)
wishlistRouter.post('/update', authUser, toggleWishlistItem)

export default wishlistRouter