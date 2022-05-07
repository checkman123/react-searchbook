import React from "react";
import SearchBar from "./SearchBar";
import WishList from "./WishList";
import "./HomePage.css";

const HomePage = ({ wishList, addBook, deleteBook }) => {
  return (
    <div className="home__container">
      <SearchBar
        wishList={wishList}
        addBook={addBook}
        deleteBook={deleteBook}
      />
      <WishList wishList={wishList} deleteBook={deleteBook} />
    </div>
  );
};

export default HomePage;
