const Product = require("../models/product_model");
const User = require("../models/user_model");

const DEMO_IDENTIFIER = "demo@productr.local";

const normalizePayload = (body = {}) => ({
  title: body.title?.trim(),
  category: body.category,
  quantityStock: Number(body.quantityStock),
  mrp: Number(body.mrp),
  sellingPrice: Number(body.sellingPrice),
  brandName: body.brandName?.trim(),
  description: body.description?.trim() || "",
  images: Array.isArray(body.images) ? body.images : [],
  exchangeEligible:
    body.exchangeEligible === true ||
    body.exchangeEligible === "true" ||
    body.exchangeEligible === "Yes" ||
    body.exchangeEligible === "YES",
  isPublished: Boolean(body.isPublished),
});

const validateProduct = (payload) => {
  if (
    !payload.title ||
    !payload.category ||
    !payload.brandName ||
    Number.isNaN(payload.quantityStock) ||
    Number.isNaN(payload.mrp) ||
    Number.isNaN(payload.sellingPrice)
  ) {
    return "All required product fields must be filled";
  }

  if (!payload.images.length) {
    return "At least one product image is required";
  }

  return null;
};

const formatProduct = (product) => ({
  id: product._id,
  title: product.title,
  category: product.category,
  quantityStock: product.quantityStock,
  mrp: product.mrp,
  sellingPrice: product.sellingPrice,
  brandName: product.brandName,
  description: product.description || "",
  images: product.images.map((image, index) => ({
    id: `${product._id}-${index}`,
    name: image.public_id,
    url: image.url,
    public_id: image.public_id,
  })),
  exchangeEligible: product.exchangeEligible ? "YES" : "NO",
  isPublished: product.isPublished,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});

const getDemoSeller = async () => {
  let user = await User.findOne({ email: DEMO_IDENTIFIER });

  if (!user) {
    user = await User.create({
      firstName: "Demo",
      lastName: "Seller",
      email: DEMO_IDENTIFIER,
    });
  }

  return user;
};

exports.getAllProducts = async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products: products.map(formatProduct),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const payload = normalizePayload(req.body);
    const validationError = validateProduct(payload);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const seller = await getDemoSeller();

    const product = await Product.create({
      ...payload,
      images: payload.images.map((image, index) => ({
        url: image.url,
        public_id: image.public_id || image.name || `image-${index + 1}`,
      })),
      seller: seller._id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: formatProduct(product),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const payload = normalizePayload(req.body);
    const validationError = validateProduct(payload);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...payload,
        images: payload.images.map((image, index) => ({
          url: image.url,
          public_id: image.public_id || image.name || `image-${index + 1}`,
        })),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: formatProduct(product),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.togglePublishStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.isPublished = !product.isPublished;
    await product.save();

    return res.status(200).json({
      success: true,
      message: product.isPublished
        ? "Product published successfully"
        : "Product unpublished successfully",
      product: formatProduct(product),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
