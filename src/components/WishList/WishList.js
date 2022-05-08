import React from "react";
import { useSelector } from "react-redux";
import WishCard from "./WishCard";
import "./WishList.css";

export default function WishList() {
  const wishList = useSelector((state) => state.searchbookSlice.wishList);

  return (
    <div className="wish-list__container">
      <h3 className="wish-list__title">
        My Wish List {`(${wishList?.length})`}
      </h3>
      {wishList?.map((item) => (
        <WishCard key={item.id} book={item} />
      ))}
    </div>
  );
}
