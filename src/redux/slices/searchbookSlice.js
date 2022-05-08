import { createSlice } from "@reduxjs/toolkit";

//slice is like a sub-store
export const searchbookSlice = createSlice({
  name: "searchbookSlice",
  initialState: {
    searchResult: [],
    wishList: [],
    totalItems: 0,
    currentPage: 1,
    keyword: "",
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    addWishList: (state, action) => {
      const prev = state.wishList;
      const bookMap = {}; //hashMap {[id]: book}
      const nextwishList = [action.payload, ...prev];
      nextwishList.forEach((book) => {
        bookMap[book.id] = book;
      });

      state.wishList = Object.values(bookMap);
    },
    deleteWishList: (state, action) => {
      state.wishList = state.wishList.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    incrementCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    decrementCurrentPage: (state) => {
      state.currentPage = state.currentPage - 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const {
  setSearchResult,
  setWishList,
  addWishList,
  deleteWishList,
  incrementCurrentPage,
  decrementCurrentPage,
  setTotalItems,
  setKeyword,
  setCurrentPage,
} = searchbookSlice.actions;
export default searchbookSlice.reducer;
