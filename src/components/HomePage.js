import React from "react";
import SearchBar from "./SearchBar";

const HomePage = ({ wishList, addBook, deleteBook }) => {
  return (
    <>
      <SearchBar
        wishList={wishList}
        addBook={addBook}
        deleteBook={deleteBook}
      />
    </>
  );
};

export default HomePage;
