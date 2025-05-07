import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

const getBaseURL = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment 
    ? "http://localhost:5000"
    : "https://ecom-site-j99g.vercel.app";
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {
    const baseURL = getBaseURL();
    const response = await axios.post(
      `${baseURL}/api/shop/review/add`,
      formdata
    );
    return response.data;
  }
);

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  const baseURL = getBaseURL();
  const response = await axios.get(
    `${baseURL}/api/shop/review/${id}`
  );
  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
