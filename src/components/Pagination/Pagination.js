import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCurrentPage,
  incrementCurrentPage,
} from "../../redux/slices/searchbookSlice";
import "./Pagination.css";

const Pagination = ({ children, itemsPerPage }) => {
  //console.log("children",<div></div>,children)//children is just JSX
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.searchbookSlice.currentPage);
  const totalItems = useSelector((state) => state.searchbookSlice.totalItems);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClickPrev = () => {
    if (currentPage <= 1) {
      return;
    }
    dispatch(decrementCurrentPage());
  };

  const handleClickNext = () => {
    if (currentPage >= totalPages) {
      return;
    }
    dispatch(incrementCurrentPage());
  };
  return (
    <div className="pagination__container">
      {children}
      <div className="button-set">
        {totalPages > 1 && (
          <>
            <button disabled={currentPage <= 1} onClick={handleClickPrev}>
              {
                // Previous icon <
                <svg viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
                </svg>
              }
            </button>
            <span>{currentPage}</span>
            <button
              disabled={currentPage >= totalPages}
              onClick={handleClickNext}
            >
              {
                // Next icon >
                <svg viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                </svg>
              }
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;
