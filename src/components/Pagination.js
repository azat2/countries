import { memo } from "react";

import Button from "./Button";

const PaginatedItems = ({ filteredData, setCurrentPage, currentPage }) => {
  const buttonLength = Math.ceil(filteredData.length / 10);

  return (
    <div className="pagination-item">
      {Array(buttonLength)
        .fill()
        .map((_, i) => (
          <Button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            text={i + 1}
            className="pagination-buttons"
            selected={currentPage === i + 1}
          />
        ))}
    </div>
  );
};

export default memo(PaginatedItems);
