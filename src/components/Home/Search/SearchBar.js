import React from "react";
import { useSelector } from "react-redux";
import BookCard from "./BookCard/BookCard";
import "./SearchBar.css";

const SearchBar = () => {
  const books = useSelector((state) => state.searchbookSlice.searchResult);
  return (
    <>
      <div className="search__container">
        {
          //No books yet, show loading text
          books?.length !== 0 ? (
            <>
              {books?.map((book) => (
                <BookCard
                  key={book.id}
                  book={{ id: book.id, ...book.volumeInfo }}
                />
              ))}
            </>
          ) : (
            <h3 className="search_loading">Loading...</h3>
          )
        }

        {
          //No books found
          books === null && (
            <>
              <h3 className="search_loading">No Result Found</h3>
              <h3 className="search_loading">
                Please enter valid search title
              </h3>
            </>
          )
        }
      </div>
    </>
  );
};

export default SearchBar;
