import React from "react";
import "./Suggestion.css";

const Suggestion = ({
  input,
  showSuggestions,
  filteredSuggestions,
  handleClickSuggest,
}) => {
  return (
    <>
      {showSuggestions && input && (
        <>
          {filteredSuggestions?.length ? (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                return (
                  <li key={index} onMouseDown={handleClickSuggest}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="no-suggestions">
              <em>No suggestions available.</em>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Suggestion;
