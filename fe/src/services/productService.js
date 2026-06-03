import axiosInstance from "../api/axios";

export const getProductsApi = async () => {
  try {
    const response = await axiosInstance.get("/product");
    return response.data.products || [];
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createProductApi = async (payload) => {
  try {
    const response = await axiosInstance.post("/product", payload);
    return response.data.product;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateProductApi = async (productId, payload) => {
  try {
    const response = await axiosInstance.put(`/product/${productId}`, payload);
    return response.data.product;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteProductApi = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/product/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const togglePublishProductApi = async (productId) => {
  try {
    const response = await axiosInstance.patch(`/product/${productId}/publish`);
    return response.data.product;
  } catch (error) {
    throw error.response?.data || error;
  }
};
