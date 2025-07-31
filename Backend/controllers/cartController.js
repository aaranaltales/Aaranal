import userModel from "../models/userModel.js"


// add products to user cart
const addToCart = async (req, res) => {
    try {

        const { itemId } = req.body
        const { user } = req
        const userData = await userModel.findById(user._id)
        let cartData = await userData.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId]) {
                cartData[itemId] += 1
            }
            else {
                cartData[itemId] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId] = 1
        }

        await userModel.findByIdAndUpdate(user._id, { cartData })

        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const updateCart = async (req, res) => {
    try {

        const { itemId, quantity } = req.body
        const { user } = req
        const userData = await userModel.findById(user._id)
        let cartData = await userData.cartData;

        cartData[itemId] = quantity

        await userModel.findByIdAndUpdate(user._id, { cartData })
        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// get user cart data
const getUserCart = async (req, res) => {

    try {

        const { user } = req

        const userData = await userModel.findById(user._id)
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addToCart, updateCart, getUserCart }