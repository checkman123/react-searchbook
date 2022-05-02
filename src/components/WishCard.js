import React from "react";
import "./WishCard.css";

const WishCard = ({ book, deleteBook }) => {
  const deleteFromWishList = () => {
    deleteBook(book);
  };

  return (
    <>
      <li className="wish-card__container">
        <div>{book.title}</div>
        <button className="wish-card__button" onClick={deleteFromWishList}>
          DELETE
        </button>
      </li>
    </>
  );
};

export default WishCard;
