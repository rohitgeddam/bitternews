
function Paginator({paginatorDetails, paginatorControlls}) {

  return (

    <nav class="pagination paginator" role="navigation" aria-label="pagination">


        <div class="paginator__page-details">
            Page {paginatorDetails.page} of {paginatorDetails.totalPages}
        </div>

        <div class="paginator__page-controls">

            <a class="pagination-previous"
             disabled={!paginatorDetails.hasPrevPage}
             onClick={paginatorControlls.getPrevPage}>
            Previous
            </a>

            <a class="pagination-next"
             disabled={!paginatorDetails.hasNextPage}
             onClick={paginatorControlls.getNextPage}>
            Next page
            </a>

        </div>
        {/* <ul class="pagination-list">
        <li>
            <a class="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a>
        </li>
        <li>
            <a class="pagination-link" aria-label="Goto page 2">2</a>
        </li>
        <li>
            <a class="pagination-link" aria-label="Goto page 3">3</a>
        </li>
        </ul> */}
  </nav>

  );
}

export default Paginator;
