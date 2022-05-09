import React, { useEffect, useState, useCallback, Fragment } from "react";
import "./SearchBox.css";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setKeyword,
  setSearchResult,
  setTotalItems,
} from "../../../redux/slices/searchbookSlice";
import { searchbook } from "../../../apis/searchbook";
import axios from "axios";
import Suggestion from "./Suggestion/Suggestion";

/* 
axios:
    help you to transform the data;
    cancel the request
    interceptor
debouncing(lodash):
throttling(lodash):
pagination(diy):
useCallback
useRef
useMemo
*/
const Searchbox = () => {
  //useDispatch to dispatch action, useSelector to get state from store
  const dispatch = useDispatch();

  const keyword = useSelector((state) => state.searchbookSlice.keyword);
  const currentPage = useSelector((state) => state.searchbookSlice.currentPage);

  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  /* Fetch books
  Output:
  keyword empty -> books with a in title
  keyword exist -> books with keyword in title
  */
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

  //Debounce for suggestions
  const cachedDebouncedFn = useCallback(
    _.debounce((input) => {
      console.log("debounce");

      //get 20 book titles for suggestions
      (async () => {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${input}&startIndex=0&maxResults=20`
        );
        const suggestions = res?.data?.items?.map((item) => {
          return item.volumeInfo.title;
        });

        let filtered = await Promise.all(
          suggestions?.filter((suggestion) =>
            suggestion?.toLowerCase().includes(input.toLowerCase())
          )
        ).catch((error) => {
          console.error(error.message);
        });

        //set the suggestion and show it
        setFilteredSuggestions(filtered);
      })();
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    //side effect
    if (input !== "") {
      cachedDebouncedFn(input);
    }
  }, [input, cachedDebouncedFn]);

  const handleChange = async (e) => {
    setInput((prev) => {
      return e.target.value;
    }); // async
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setKeyword(input));
    dispatch(setCurrentPage(1));
  };

  const handleClickSuggest = (e) => {
    e.preventDefault();
    //reset
    setFilteredSuggestions([]);
    setInput(e.currentTarget.innerText);
    dispatch(setKeyword(e.currentTarget.innerText));
    setShowSuggestions(false);
    document.getElementById("search-box").blur();
  };

  const onFocus = () => {
    setShowSuggestions(true);
  };
  const onBlur = () => {
    setShowSuggestions(false);
  };

  return (
    <div className="search-box__container">
      <div className="input__container">
        <input
          id="search-box"
          className="search-box__input"
          type="text"
          value={input}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Search Book..."
        />
        {/* {suggestionsListComponent} */}
        <Suggestion
          input={input}
          showSuggestions={showSuggestions}
          filteredSuggestions={filteredSuggestions}
          handleClickSuggest={handleClickSuggest}
        />
      </div>

      <button className="search-box__button btn-3" onClick={handleClick}>
        <span>SEARCH</span>
      </button>
    </div>
  );
};

export default Searchbox;
