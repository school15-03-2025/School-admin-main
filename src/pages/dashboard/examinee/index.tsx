import { useState } from "react";
import ExamineeTable from "./components/ExamineeTable";
import Cards from "./components/Cards";

const Examinee = () => {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 5,
    types: "",
    topic: null,
    status: null,
    date: null,
  });

  const updateFilter = (key: string, value: any) => {
    if (key === "status" && value === "all") {
      value = null;
    }

    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };
  return (
    <>
      <Cards />

      <div className="flex gap-3 mt-3 items-end justify-end">
        <div className="flex gap-3 mt-3 justify-end my-6">
          <div>
            <select
              name="topic"
              className="border min-w-28  text-gray-900 text-sm p-3 rounded-lg"
              onChange={(e) => updateFilter("topic", e.target.value)}
            >
              <option value={"all"}>Topic</option>
              <option value={"all"}>All</option>
              <option value={"web dev"}>Web dev</option>
            </select>
          </div>
          {/* <div>
            <select
              name="types"
              className="border min-w-28  text-gray-900 text-sm p-3 rounded-lg"
              onChange={(e) => updateFilter("type", e.target.value)}
            >
              <option value={"all"}>Exam Day</option>
              <option value={"all"}>All</option>
            </select>
          </div> */}
          <div>
            <select
              name="types"
              className="border min-w-28  text-gray-900 text-sm p-3 rounded-lg"
              onChange={(e) => updateFilter("type", e.target.value)}
            >
              <option value={"all"}>Exam</option>
              <option value={"all"}>Participant</option>
            </select>
          </div>
          <div>
            <label htmlFor="dates" className="w-full block"></label>
            <div className="flex">
              <div className="flex rounded-xl">
                <input
                  type="date"
                  name="startDate"
                  className="p-1 bg-white rounded-lg"
                  onChange={(e) => updateFilter("startDate", e.target.value)}
                />
              </div>
              <span className="py-2 px-2">To</span>
              <div className="flex  rounded-xl">
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
      </div>

      <hr className="my-5" />
      <div className="w-full">
        <div className="w-full overflow-x-auto">
          <ExamineeTable filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </>
  );
};

export default Examinee;
