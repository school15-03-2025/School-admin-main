import React from "react";

function Filters({ updateFilter, searchTerm, setSearchTerm }: any) {
  return (
    <div className="flex gap-3 mt-3 justify-end my-6">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search exams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border outline-none rounded"
        />
      </div>
      <div>
        <select
          name="topic"
          className="border min-w-28  text-gray-900 text-sm p-3 rounded-lg"
          onChange={(e) => updateFilter("topics", e.target.value)}
        >
          <option value={"all"}>Topic</option>
          <option value={"all"}>All</option>
          <option value={"web dev"}>Web dev</option>
          <option value={"app dev"}>App dev</option>
        </select>
      </div>

      <div>
        <label htmlFor="dates" className="w-full block"></label>
        <div className="flex">
          <div className="flex border rounded-xl">
            <input
              type="date"
              name="startDate"
              className="p-1 bg-white rounded-lg"
              onChange={(e) => updateFilter("startDate", e.target.value)}
            />
          </div>
          <span className="py-2 px-2">To</span>
          <div className="flex border rounded-xl">
            <input
              type="date"
              name="endDate"
              className="p-1 bg-white rounded-lg"
              onChange={(e) => updateFilter("endDate", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
