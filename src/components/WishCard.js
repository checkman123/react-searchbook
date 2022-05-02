import React from "react";
import "./WishCard.css";

const WishCard = ({ book, deleteBook }) => {
  const deleteFromWishList = () => {
    deleteBook(book);
  };

  let pathname = window.location.pathname;

  return (
    <>
      <li className="wish-card__container">
        <div>{book.title}</div>

        {
          //if in wishlist, hide delete button
          pathname === "/wishlist" ? (
            ""
          ) : (
            <button className="wish-card__button" onClick={deleteFromWishList}>
              DELETE
            </button>
          )
        }
      </li>
    </>
  );
};

export default WishCard;
