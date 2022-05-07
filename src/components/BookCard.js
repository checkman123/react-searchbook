import React from "react";
import "./BookCard.css";

const bookCard = ({ book, addBook }) => {
  const addToWishList = () => {
    addBook(book);
  };

  const image = book?.imageLinks?.thumbnail;

  return (
    <>
      <div className="book-card__container" onClick={addToWishList}>
        <div className="book-card__img">
          <img src={image} alt={book.title} />
        </div>
        <div className="book-card__info">
          <p>
            Title: <span>{book.title}</span>
          </p>
          <p>
            Publisher: <span>{book.publisher ? book.publisher : "N/A"} </span>
          </p>

          <p>
            Published date:
            <span> {book.publishedDate ? book.publishedDate : "N/A"}</span>
          </p>

          <p>
            Description:
            <span> {book.description ? book.description : "N/A"}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default bookCard;
