import React, { useEffect, useState, useCallback } from "react";
import "./SearchBox.css";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {
  setCurrentPage,
  setKeyword,
} from "../../../redux/slices/searchbookSlice";

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
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const cachedDebouncedFn = useCallback(
    _.debounce((input) => {
      dispatch(setKeyword(input));
      dispatch(setCurrentPage(1));
    }, 2000),
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

  return (
    <div className="search-box__container">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="search-box__input"
        placeholder="Search Book..."
      />
      <button className="search-box__button btn-3" onClick={handleClick}>
        <span>SEARCH</span>
      </button>
    </div>
  );
};

export default Searchbox;
