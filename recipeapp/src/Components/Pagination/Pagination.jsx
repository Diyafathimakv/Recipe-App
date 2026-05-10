import "./Pagination.css";

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div className="pagination">

      {/* PREV */}
      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage((prev) => prev - 1)
        }
      >
        Prev
      </button>

      {/* CURRENT PAGE */}
      <span className="page-number">
        {currentPage}
      </span>

      {/* NEXT */}
      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage((prev) => prev + 1)
        }
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;