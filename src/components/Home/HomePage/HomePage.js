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
  //useDispatch to dispatch action, useSelector to get state from store
  const dispatch = useDispatch();

  const keyword = useSelector((state) => state.searchbookSlice.keyword);
  const currentPage = useSelector((state) => state.searchbookSlice.currentPage);

  //totalPage:totalPage=totalItems/itemsPerPage, itemsPerPage = 5 ,totalItems,
  /*  at Pagination
      totalItems:10
      itemsPerPage:4;
      totalPage = 10/4 = Math.ceil(10/4) = 4 (Math.floor(),Math.round())
  */
  //console.log("totalItems", totalItems);

  useEffect(() => {
    (async () => {
      if (keyword === "") {
        //Empty show search that have a in the book title
        const result = await searchbook("a", currentPage, 5);
        if (result?.data?.totalItems !== undefined) {
          //setTotalItems(result.data.totalItems);
          dispatch(setTotalItems(result.data.totalItems));
        }
        if (result?.data?.items !== undefined) {
          //setItems(result.data.items);
          dispatch(setSearchResult(result.data.items));
        }
      } else {
        const result = await searchbook(keyword, currentPage, 5);
        if (result?.data?.totalItems !== undefined) {
          console.log("setTotalItems");
          dispatch(setTotalItems(result.data.totalItems));
        }
        if (result?.data?.items !== undefined) {
          console.log("setSearchResult");
          dispatch(setSearchResult(result.data.items));
        } else {
          //No result found in search
          dispatch(setSearchResult(null));
        }

        window.scrollTo(0, 0);
      }
    })();
  }, [currentPage, keyword]);

  return (
    <>
      <Searchbox />

      {}
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
