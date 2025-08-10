import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            bestseller,
            features,
            specs,
        } = req.body;

        // Handle image uploads from req.files
        const image1 = req.files.image1?.[0];
        const image2 = req.files.image2?.[0];
        const image3 = req.files.image3?.[0];
        const image4 = req.files.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        // Upload to Cloudinary and get URLs
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: 'image',
                });
                return result.secure_url;
            })
        );

        // Parse features (stringified array) and specs (stringified object)
        const parsedFeatures = features ? JSON.parse(features) : [];
        const parsedSpecs = specs ? JSON.parse(specs) : {};

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            bestseller: bestseller === 'true',
            features: parsedFeatures,
            specs: parsedSpecs,
            image: imagesUrl,
            date: Date.now(),
        };
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Product Added' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// function for update product
const updateProduct = async (req, res) => {
    try {
        const {
            id,
            name,
            description,
            price,
            category,
            bestseller,
            features,
            specs,
            existingImage1,
            existingImage2,
            existingImage3,
            existingImage4,
        } = req.body;

        // Check if product exists
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.json({ success: false, message: 'Product not found' });
        }

        // Handle new image uploads from req.files
        const image1 = req.files.image1?.[0];
        const image2 = req.files.image2?.[0];
        const image3 = req.files.image3?.[0];
        const image4 = req.files.image4?.[0];

        const newImages = [image1, image2, image3, image4];
        const existingImages = [existingImage1, existingImage2, existingImage3, existingImage4];

        // Build final images array
        const finalImages = [];

        for (let i = 0; i < 4; i++) {
            if (newImages[i]) {
                // Upload new image to Cloudinary
                const result = await cloudinary.uploader.upload(newImages[i].path, {
                    resource_type: 'image',
                });
                finalImages.push(result.secure_url);
            } else if (existingImages[i] && existingImages[i] !== 'undefined') {
                // Keep existing image
                finalImages.push(existingImages[i]);
            } else if (existingProduct.image[i]) {
                // Keep original image if no changes
                finalImages.push(existingProduct.image[i]);
            }
        }

        // Remove empty/null entries
        const cleanedImages = finalImages.filter(img => img && img !== 'undefined');

        // Parse features and specs
        const parsedFeatures = features ? JSON.parse(features) : existingProduct.features;
        const parsedSpecs = specs ? JSON.parse(specs) : existingProduct.specs;

        // Prepare update data
        const updateData = {
            name: name || existingProduct.name,
            description: description || existingProduct.description,
            category: category || existingProduct.category,
            price: price ? Number(price) : existingProduct.price,
            bestseller: bestseller !== undefined ? bestseller === 'true' : existingProduct.bestseller,
            features: parsedFeatures,
            specs: parsedSpecs,
            image: cleanedImages,
        };

        // Update the product
        const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });

        res.json({ success: true, message: 'Product Updated Successfully', product: updatedProduct });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        // Get the product to delete images from cloudinary (optional)
        const product = await productModel.findById(req.body.id);
        
        // Delete the product from database
        await productModel.findByIdAndDelete(req.body.id);
        
        // Optionally delete images from cloudinary
        if (product && product.image) {
            for (const imageUrl of product.image) {
                try {
                    // Extract public_id from cloudinary URL
                    const publicId = imageUrl.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(publicId);
                } catch (cloudinaryError) {
                    console.log('Error deleting image from cloudinary:', cloudinaryError);
                }
            }
        }
        
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, updateProduct }