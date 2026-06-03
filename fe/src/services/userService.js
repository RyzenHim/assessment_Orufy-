import axiosInstance from "../api/axios";

export const getProfileApi = async () => {
  try {
    const response = await axiosInstance.get("/user/profile");
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error;
  }
};
