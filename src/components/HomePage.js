import React from "react";
import SearchBar from "./SearchBar";

const HomePage = ({ addBook }) => {
  return (
    <>
      <SearchBar addBook={addBook} />
    </>
  );
};

export default HomePage;
