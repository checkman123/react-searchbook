import React, { useEffect, useState, useCallback } from "react";
import "./SearchBox.css";
import _ from "lodash";

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
const Searchbox = ({ handleSubmit }) => {
  const [input, setInput] = useState("");
  const cachedDebouncedFn = useCallback(_.debounce(handleSubmit, 2000), [
    handleSubmit,
  ]);

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
    handleSubmit(input);
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
      <button className="search-box__button" onClick={handleClick}>
        submit
      </button>
    </div>
  );
};

export default Searchbox;
