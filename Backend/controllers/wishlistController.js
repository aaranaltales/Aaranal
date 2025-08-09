import userModel from "../models/userModel.js"


// add products to user cart
const toggleWishlistItem = async (req, res) => {
    try {
        const { itemId } = req.body;
        const { user } = req;

        const userData = await userModel.findById(user._id);
        let wishList = userData.wishListData || [];

        let action;
        if (wishList.includes(itemId)) {
            // Remove item
            wishList = wishList.filter(id => id !== itemId);
            action = "removed";
        } else {
            // Add item
            wishList.push(itemId);
            action = "added";
        }

        await userModel.findByIdAndUpdate(user._id, { wishListData: wishList });

        res.json({
            success: true,
            message: `Item ${action} from wishlist`,
            wishList,
        });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


// get user cart data
const getUserWishlist = async (req, res) => {

    try {

        const { user } = req

        const userData = await userModel.findById(user._id)
        let wishlist = await userData.wishListData;

        res.json({ success: true, wishlist })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { toggleWishlistItem , getUserWishlist }