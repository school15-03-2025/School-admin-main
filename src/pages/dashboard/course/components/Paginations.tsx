import React from "react";

function Paginations({ pagination, filters, setFilters }: any) {
  return (
    <div className="mt-[2rem]">
      <div className="text-center p-3">
        <h1>
          Showing {(filters?.page - 1) * filters?.pageSize + 1} to
          {filters.page * filters?.pageSize > pagination.totalResult
            ? pagination?.totalResult
            : filters?.page * filters?.pageSize}{" "}
          of {pagination?.totalResult} Results
        </h1>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-[#0059ff] p-3 rounded-xl text-white"
          onClick={() =>
            setFilters((prev: any) => ({ ...prev, page: prev.page + 1 }))
          }
          disabled={filters?.page >= pagination?.totalPages}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default Paginations;
