import React from "react";
import BookCard from "./BookCard/BookCard";
import "./SearchBar.css";

const SearchBar = ({ books, addBook, handleSubmit }) => {
  return (
    <>
      <div className="search__container">
        {
          //No books, show loading text
          books?.length !== 0 ? (
            <>
              {books?.map((book) => (
                <BookCard
                  key={book.id}
                  book={{ id: book.id, ...book.volumeInfo }}
                  addBook={addBook}
                />
              ))}
            </>
          ) : (
            <h3 className="search_loading">Loading...</h3>
          )
        }
      </div>
    </>
  );
};

export default SearchBar;
