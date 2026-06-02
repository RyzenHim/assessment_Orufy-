import axiosInstance from "../api/axios";

export const loginApi = async (data) => {
  try {
    const res = await axiosInstance.post("/user/login", data);
    console.log(data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
