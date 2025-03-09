import { useState } from "react";

function Filters() {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 2,
    type: null,
    topic: null,
    course: null,
    startDate: null,
    endDate: null,
  });

  // Update filter function
  const updateFilter = (key: string, value: any) => {
    if (value === "all") {
      value = null;
    }

    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex gap-3 mt-3 justify-end my-6">
      {/* Type Filter */}
      <div>
        <select
          name="types"
          className="border min-w-28 border-gray-700 text-gray-900 text-sm p-3 rounded-lg"
          onChange={(e) => updateFilter("type", e.target.value)}
        >
          <option value={"all"}>Type</option>
          <option value={"all"}>All</option>
          <option value={"japan"}>Paid</option>
          <option value={"london"}>Non Paid</option>
        </select>
      </div>

      {/* Topic Filter */}
      <div>
        <select
          name="topic"
          className="border min-w-28 border-gray-700 text-gray-900 text-sm p-3 rounded-lg"
          onChange={(e) => updateFilter("topic", e.target.value)}
        >
          <option value={"all"}>Topic</option>
          <option value={"all"}>All</option>
          <option value={"web dev"}>Web dev</option>
          <option value={"app dev"}>App dev</option>
        </select>
      </div>

      {/* Course Filter */}
      <div>
        <select
          name="course"
          className="border min-w-28 border-gray-700 text-gray-900 text-sm p-3 rounded-lg"
          onChange={(e) => updateFilter("course", e.target.value)}
        >
          <option value={"all"}>Course</option>
          <option value={"all"}>All</option>
          <option value={"ongoing"}>Ongoing</option>
          <option value={"coming soon"}>Coming Soon</option>
          <option value={"waiting"}>Waiting</option>
          <option value={"live"}>Live</option>
          <option value={"done"}>Done</option>
        </select>
      </div>

      {/* Date Filters */}
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
