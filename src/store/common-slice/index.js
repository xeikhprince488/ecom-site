import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// Fetch feature images
export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );
    return response.data;
  }
);

// Add a new feature image
export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

// Delete a feature image
export const deleteFeatureImage = createAsyncThunk(
  "/order/deleteFeatureImage",
  async (imageId) => {
    console.log("Delete request for image with ID:", imageId); // Log the image ID
    const response = await axios.delete(
      `http://localhost:5000/api/common/feature/delete/${imageId}`
    );
    return response.data; // Return the data, which should include the image ID
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
