import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchAllFiltersProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );

    return result.data;
  }
);

export const fetchProductDetail = createAsyncThunk(
  "/products/fetchProductDetail",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );

    return result.data;
  }
);

const shopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFiltersProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFiltersProducts.fulfilled, (state, action) => {
        state.isLoading = true;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFiltersProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.isLoading = true;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetail.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});
export const { setProductDetails } = shopProductSlice.actions;
export default shopProductSlice.reducer;
