import React, { useEffect } from "react";
import SearchBar from "../Search/SearchBar";
import WishList from "../../WishList/WishList";
import "./HomePage.css";
import { searchbook } from "../../../apis/searchbook";
import Pagination from "../../Pagination/Pagination";
import Searchbox from "../SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchResult,
  setTotalItems,
} from "../../../redux/slices/searchbookSlice";

const HomePage = () => {
  //totalPage:totalPage=totalItems/itemsPerPage, itemsPerPage = 5 ,totalItems,
  /*  at Pagination
      totalItems:10
      itemsPerPage:4;
      totalPage = 10/4 = Math.ceil(10/4) = 4 (Math.floor(),Math.round())
  */
  //console.log("totalItems", totalItems);

  return (
    <>
      <Searchbox />
      <Pagination itemsPerPage={5}>
        <div className="home__container">
          <SearchBar />
          <WishList />
        </div>
      </Pagination>
    </>
  );
};

export default HomePage;
