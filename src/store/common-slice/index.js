import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

const getBaseURL = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment 
    ? "http://localhost:5000"
    : "https://ecom-site-beta.vercel.app";
};

// Fetch feature images
export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const baseURL = getBaseURL();
    const response = await axios.get(
      `${baseURL}/api/common/feature/get`
    );
    return response.data;
  }
);

// Add a new feature image
export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const baseURL = getBaseURL();
    const response = await axios.post(
      `${baseURL}/api/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

// Delete a feature image
export const deleteFeatureImage = createAsyncThunk(
  "/order/deleteFeatureImage",
  async (imageId) => {
    const baseURL = getBaseURL();
    console.log("Delete request for image with ID:", imageId);
    const response = await axios.delete(
      `${baseURL}/api/common/feature/delete/${imageId}`
    );
    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch feature images
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })

      // Add a new feature image
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList.push(action.payload.data); // Assuming the added image data is in `data`
      })
      .addCase(addFeatureImage.rejected, (state) => {
        state.isLoading = false;
      })

      // Delete a feature image
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove the deleted image from the featureImageList by filtering it out
        const deletedImageId = action.payload.id; // Assuming the payload includes the deleted image's ID
        if (deletedImageId) {
          state.featureImageList = state.featureImageList.filter(
            (image) => image._id !== deletedImageId // Check against `_id` field (not `id`)
          );
        }
      })
      .addCase(deleteFeatureImage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default commonSlice.reducer;
