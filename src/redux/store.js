import { configureStore } from "@reduxjs/toolkit";

import searchbookReducer from "./slices/searchbookSlice";

const store = configureStore({
  reducer: {
    searchbookSlice: searchbookReducer,
  },
});

export default store;
