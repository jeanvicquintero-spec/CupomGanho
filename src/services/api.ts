import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.cupomganho.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCouponStats = async () => {
  try {
    const response = await axiosInstance.get('/stats/coupons');
    return response.data;
  } catch (error) {
    console.error('Error fetching coupon stats:', error);
    throw error;
  }
};

export const getTopLojas = async (latitude?: number, longitude?: number) => {
  try {
    const params = latitude && longitude ? { latitude, longitude } : {};
    const response = await axiosInstance.get('/stores/top', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching top stores:', error);
    throw error;
  }
};

export const getCouponsNearby = async (latitude: number, longitude: number) => {
  try {
    const response = await axiosInstance.get('/coupons/nearby', {
      params: { latitude, longitude, radius: 5 },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby coupons:', error);
    throw error;
  }
};

export const useCoupon = async (couponId: string) => {
  try {
    const response = await axiosInstance.post(`/coupons/${couponId}/use`);
    return response.data;
  } catch (error) {
    console.error('Error using coupon:', error);
    throw error;
  }
};

export const getStoreDetails = async (storeId: string) => {
  try {
    const response = await axiosInstance.get(`/stores/${storeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching store details:', error);
    throw error;
  }
};

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const response = await axiosInstance.post('/auth/register', {
      email,
      password,
      name,
    });
    await AsyncStorage.setItem('userToken', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    await AsyncStorage.setItem('userToken', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export default axiosInstance;
