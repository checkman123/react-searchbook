import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import WishList from "./components/WishList";

function App() {
  const [wishList, setWishList] = useState([]);

  const addBook = (book) => {
    //check if the book exist in wish list
    if (!wishList.some((item) => item.id === book.id)) {
      setWishList([...wishList, book]);
    }
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
          element={<HomePage wishList={wishList} addBook={addBook} />}
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
