import axiosInstance from "../api/axios";

export const loginApi = async (data) => {
  try {
    const res = await axiosInstance.post("/user/login", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const signUpApi = async (data) => {
  try {
    const res = await axiosInstance.post("/user/signup", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const verifySignupOtpApi = async (data) => {
  try {
    const res = await axiosInstance.post("/user/verify-signup-otp", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const verifyLoginOtpApi = async (data) => {
  try {
    const res = await axiosInstance.post("/user/verify-login-otp", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
