import mongoose from "mongoose";
import productModel from "../models/productModel.js"; // Adjust path if needed

// MongoDB Connection URL
const MONGO_URI = "mongodb+srv://aaranaltales:Aaranaltales_09@aaranaltales.qsljjce.mongodb.net"; // replace with your DB name

// Dummy Products Data (all use the same image link)
const imageLink = "https://i.etsystatic.com/23779612/r/il/d1a9e8/3322497813/il_1588xN.3322497813_6hvq.jpg";

const products = [
  {
    name: "Blue Floral Tote",
    description: "Beautiful floral-printed tote bag made with premium fabric.",
    price: 295,
    image: ["assests/blue_floral_bag.jpg"],
    category: "Bags",
    subCategory: "Tote Bags",
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Butterfly Tote",
    description: "Butterfly-designed tote bag, lightweight and stylish.",
    price: 185,
    image: ["assests/butterfly_bag.jpg"],
    category: "Bags",
    subCategory: "Tote Bags",
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Flowers Tote (Hand-Painted)",
    description: "Hand-painted flower tote bag, unique and eco-friendly.",
    price: 125,
    image: ["assests/flowers_handpainted_bag.jpg"],
    category: "Bags",
    subCategory: "Tote Bags",
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Paris Tote",
    description: "Trendy Paris-themed tote bag perfect for casual outings.",
    price: 395,
    image: ["assests/paris_bag.jpg"],
    category: "Bags",
    subCategory: "Tote Bags",
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Red Tulips Tote",
    description: "Elegant tote bag with red tulips print.",
    price: 225,
    image: ["assests/red_tuplis_bag.jpg"],
    category: "Bags",
    subCategory: "Tote Bags",
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Paw Money Pouch",
    description: "Compact money pouch with paw design, durable and stylish.",
    price: 85,
    image: ["assests/paw_money_pouch.jpg"],
    category: "Bags",
    subCategory: "Money Pouches",
    bestseller: true,
    date: Date.now()
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}/e-commerce`);
    console.log("✅ MongoDB Connected");

    // Clear existing data
    await productModel.deleteMany({});
    console.log("🗑️ Existing products deleted");

    // Insert new data
    await productModel.insertMany(products);
    console.log("🎉 Dummy products inserted successfully!");

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    mongoose.disconnect();
  }
};

seedProducts();
