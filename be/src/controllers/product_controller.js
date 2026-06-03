const Product = require("../models/product_model");
const User = require("../models/user_model");
const { cloudinary } = require("../config/cloudinary");

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

  // Expecting: images[] where each item has at least { url, public_id }
  // url is currently sent from frontend as base64 data URL.
  if (payload.images.some((img) => !img || !img.url)) {
    return "All product images must include a url";
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

const uploadImageToCloudinary = async ({ url, public_id }, index) => {
  // Frontend sends base64 data URL in `url`
  // Cloudinary expects either a base64 string (can be a data URL) or a file/URL.
  const uploadResult = await cloudinary.uploader.upload(url, {
    folder: "product-images",
    public_id: public_id || `product-${index + 1}`,
  });

  return {
    url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  };
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

    const uploadedImages = await Promise.all(
      payload.images.map((image, index) =>
        uploadImageToCloudinary(image, index),
      ),
    );

    const product = await Product.create({
      ...payload,
      images: uploadedImages,
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

    const uploadedImages = await Promise.all(
      payload.images.map((image, index) =>
        uploadImageToCloudinary(image, index),
      ),
    );

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...payload,
        images: uploadedImages,
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
    // Delete from Cloudinary first (best-effort), then from DB.
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (Array.isArray(product.images) && product.images.length) {
      await Promise.all(
        product.images.map(async (image) => {
          if (!image?.public_id) return;
          try {
            await cloudinary.uploader.destroy(image.public_id);
          } catch (err) {
            console.warn(
              `[cloudinary] Failed to delete asset ${image.public_id}:`,
              err?.message || err,
            );
          }
        }),
      );
    }

    await Product.findByIdAndDelete(req.params.id);

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
