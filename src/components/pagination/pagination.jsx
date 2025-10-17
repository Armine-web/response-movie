import "./pagination.css";
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationRange = () => {
    let startPage, endPage;

    if (totalPages <= 3) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPaginationRange();

  return (
    <nav aria-label="Page navigation example" style={{ width: "200px", margin: "auto"}}>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link bg-transparent"
            style={{ color: "#EC8305" }}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous"
            disabled={currentPage === 1}
          >
            &laquo; 
          </button>
        </li>

        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <li
              key={pageNumber}
              className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
            >
              <button
                className="page-link bg-transparent"
                style={{ color: "#EC8305" }}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link bg-transparent"
            style={{ color: "#EC8305" }}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next"
            disabled={currentPage === totalPages}
          >
             &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};
