import React from "react";
import BookCard from "./BookCard";

const SearchResult = ({ books, addBook }) => {
  return (
    <>
      {books?.map((book) => (
        <BookCard
          key={book.id}
          book={{ ...book.volumeInfo }}
          addBook={addBook}
        />
      ))}
    </>
  );
};

export default SearchResult;
