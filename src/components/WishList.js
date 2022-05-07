import React from "react";
import WishCard from "./WishCard";
import "./WishList.css";

export default function WishList({ wishList, deleteBook }) {
  return (
    <div className="wish-list__container">
      <h3 className="wish-list__title">
        My Wish List {`(${wishList.length})`}
      </h3>
      {wishList?.map((item) => (
        <WishCard key={item.id} book={item} deleteBook={deleteBook} />
      ))}
    </div>
  );
}
