import React, { useEffect, useState } from "react";
import SearchBar from "./Search/SearchBar";
import WishList from "../WishList/WishList";
import "./HomePage.css";
import { searchbook } from "../../apis/searchbook";
import Pagination from "../Pagination/Pagination";
import Searchbox from "./SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setSearchResult,
  setTotalItems,
} from "../../redux/slices/searchbookSlice";

const HomePage = ({ wishList, addBook, deleteBook }) => {
  //const [items, setItems] = useState([]);
  //const [currentPage, setCurrentPage] = useState(1);
  //const [totalItems, setTotalItems] = useState(0);
  //const [keyword, setKeyword] = useState("");

  //useDispatch to dispatch action, useSelector to get state from store
  const dispatch = useDispatch();
  const items = useSelector((state) => state.searchbookSlice.searchResult);
  const keyword = useSelector((state) => state.searchbookSlice.keyword);
  const currentPage = useSelector((state) => state.searchbookSlice.currentPage);
  const totalItems = useSelector((state) => state.searchbookSlice.totalItems);

  //totalPage:totalPage=totalItems/itemsPerPage, itemsPerPage = 5 ,totalItems,
  /* 
      totalItems:10
      itemsPerPage:4;
      totalPage = 10/4 = Math.ceil(10/4) = 4 (Math.floor(),Math.round())
  */
  console.log("totalItems", totalItems);

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
          //setTotalItems(result.data.totalItems);
        }
        if (result?.data?.items !== undefined) {
          //setItems(result.data.items);
          dispatch(setSearchResult(result.data.items));
        }

        window.scrollTo(0, 0);
      }
    })();
  }, [currentPage, keyword]);

  // const handleSubmit = async (input) => {
  //   setKeyword(input);
  //   setCurrentPage(1);
  //   /* const result = await searchbook(input);
  //     if (result?.data?.totalItems !== undefined) {
  //         setTotalItems(result.data.totalItems)
  //     }
  //     if (result?.data?.items !== undefined) {
  //         setItems(result.data.items);
  //     } */
  // }; //self closing tag

  const handleChangePage = (targetPageNum) => {
    setCurrentPage(targetPageNum);
  };

  return (
    <>
      <Searchbox /*handleSubmit={handleSubmit}*/ />

      {/*handleChangePage={handleChangePage} in Pagination*/}
      <Pagination
        /*currentPage={currentPage}
        totalItems={totalItems}*/
        itemsPerPage={5}
      >
        <div className="home__container">
          <SearchBar
            books={items}
            wishList={wishList}
            addBook={addBook}
            deleteBook={deleteBook}
          />
          <WishList wishList={wishList} deleteBook={deleteBook} />
        </div>
      </Pagination>
    </>
  );
};

export default HomePage;
