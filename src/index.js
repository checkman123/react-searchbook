import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "./functions/fromLocalStorage";
import throttle from "lodash/throttle";
import { setWishList } from "./redux/slices/searchbookSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

//Check if wishlist exist in local storage, if exist set it in store state
if (loadFromLocalStorage()) {
  store.dispatch(
    setWishList(Object.values(JSON.parse(localStorage.getItem("wishList"))))
  );
}

store.subscribe(
  //would call every time state changes so throttle it, so it call do it too much
  throttle(() => {
    let storeWishList = store.getState().searchbookSlice.wishList;

    saveToLocalStorage(store.getState().searchbookSlice.wishList);
    if (storeWishList.length === 0) {
      localStorage.removeItem("wishList");
    } else {
      saveToLocalStorage(store.getState().searchbookSlice.wishList);
    }
  }, 1000)
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
