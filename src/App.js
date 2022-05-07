import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./components/Home/HomePage";
import NavBar from "./components/NavBar/NavBar";
import WishList from "./components/WishList/WishList";

function App() {
  //get wishlist from local storage. return [] if not exist
  const [wishList, setWishList] = useState(
    JSON.parse(localStorage.getItem("wishlist") || "[]")
  );

  //set new wishList to local storage whenever wishList changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const addBook = (bookInfo) => {
    /*
    //check if the book exist in wish list
    if (!wishList.some((item) => item.id === bookInfo.id)) {
      setWishList([...wishList, bookInfo]);
    }
    */

    setWishList((prev) => {
      const bookMap = {}; //hashMap {[id]: book}
      const nextWishlist = [bookInfo, ...prev];
      nextWishlist.forEach((book) => {
        bookMap[book.id] = book;
      });
      return Object.values(bookMap);
    });
  };

  const deleteBook = (book) => {
    setWishList(wishList.filter((item) => item.id !== book.id));
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              wishList={wishList}
              addBook={addBook}
              deleteBook={deleteBook}
            />
          }
        />
        <Route
          path="/wishlist"
          element={<WishList wishList={wishList} deleteBook={deleteBook} />}
        />
      </Routes>
    </div>
  );
}

export default App;
