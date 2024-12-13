const Product = require('../models/productModel');
const cloudinary = require('../config/cloudinaryConfig');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const image = req.file.path; // Assuming you are using multer to handle file uploads
    const result = await cloudinary.uploader.upload(image, {
      folder: 'products',
    });
    const product = new Product({
      name,
      price,
      category,
      description,
      image: result.secure_url,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    if (req.file) {
      const image = req.file.path;
      const result = await cloudinary.uploader.upload(image, {
        folder: 'products',
      });
      product.image = result.secure_url;
    }

    product.name = name;
    product.price = price;
    product.category = category;
    product.description = description;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
