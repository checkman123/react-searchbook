import React from "react";
import "./WishCard.css";

const WishCard = ({ book, deleteBook }) => {
  const deleteFromWishList = () => {
    deleteBook(book);
  };

  return (
    <>
      <li className="wish-card__container" onClick={deleteFromWishList}>
        <div>{book.title}</div>
        <button className="wish-card__button">X</button>
      </li>
    </>
  );
};

export default WishCard;
