import React from "react";
import SearchResult from "./SearchResult";
import { useEffect, useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ addBook, handleSubmit }) => {
  const [input, setInput] = useState("");
  const [debounceInput, setDebounceInput] = useState("");
  const [books, setBooks] = useState([]);

  //fetch books
  useEffect(() => {
    if (debounceInput === "") {
      //No search, show all books
      fetch(
        "https://www.googleapis.com/books/v1/volumes?q=bookname&startIndex=0&maxResults=20"
      )
        .then((response) => response.json())
        .then((data) => {
          setBooks(data.items);
        });
    } else {
      //Search books according to the input
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q="${debounceInput}"&startIndex=0&maxResults=20`
      )
        .then((response) => response.json())
        .then((data) => {
          setBooks(data.items);
        });
    }
  }, [debounceInput]);

  //debounce
  useEffect(() => {
    const t = setTimeout(() => {
      setDebounceInput(input);
    }, 300);

    return () => {
      clearTimeout(t);
    };
  }, [input]);

  //set new input on change
  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit(input);
  };
  return (
    <>
      <input
        type="text"
        value={input}
        onChange={onChangeHandler}
        className="search__input"
        placeholder="Enter book name..."
      />
      <button onClick={handleClick}>submit</button>
      <div className="search__container">
        {
          //No books, show loading text
          books?.length !== 0 ? (
            <>
              <SearchResult books={books} addBook={addBook} />
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
