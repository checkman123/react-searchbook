import { createSlice } from "@reduxjs/toolkit";

//slice is like a sub-store
export const searchbookSlice = createSlice({
  name: "searchbookSlice",
  initialState: {
    searchResult: [],
    wishlist: [],
    totalItems: 0,
    currentPage: 1,
    keyword: "",
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setWishList: (state, action) => {
      state.wishlist = action.payload;
    },
    addWishList: (state, action) => {
      const prev = state.wishlist;
      const bookMap = {}; //hashMap {[id]: book}
      const nextWishlist = [action.payload, ...prev];
      nextWishlist.forEach((book) => {
        bookMap[book.id] = book;
      });
      state.wishlist = Object.values(bookMap);
    },
    deleteWishList: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
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
