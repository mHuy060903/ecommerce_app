import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
import adminOrderSlice from "./admin/order-slice";
import shopProductSlice from "./shop/products-slice";
import shopCartSlice from "./shop/carts-slice";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import commonFeatureSlice from "./common-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    adminOrder: adminOrderSlice,
    shopProducts: shopProductSlice,
    shopCart: shopCartSlice,
    commonFeature: commonFeatureSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
  },
});

export default store;
