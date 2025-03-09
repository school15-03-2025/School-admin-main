import Modal from "@/components/modal";
import { useState } from "react";
import Image from "next/image";
import ToggleSwitch from "@/components/toggleSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import EmployeeForm from "./components/EmployeeForm";
import { useDeleteEmployee, useGetEmployees } from "@/hooks/Employees";
import toast from "react-hot-toast";
import Paginations from "../course/components/Paginations";
import Loader from "@/components/Loader";
import { TableSkeleton } from "@/components/Table";

const CreateEmployee = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [employee, setEmployee] = useState<any | null>(null);

  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 5,
    startDate: null,
    endDate: null,
  });

  const updateFilter = (key: string, value: any) => {
    if (key === "status" && value === "all") {
      value = null;
    }
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { data, isError, isLoading } = useGetEmployees(filters);
  const { mutate: delteEmployee } = useDeleteEmployee();

  const updateEmployee = (employee: any) => {
    setEmployee(employee);
    setModalOpen(true);
  };
  const deleteEmployee = (employeeID: string) => {
    const formData = new FormData();
    formData.append("employeeID", employeeID);
    delteEmployee(formData);
  };
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-end w-full">
          <div className="w-full sm:w-auto">
            <label htmlFor="dates" className="w-full block"></label>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Start Date */}
              <div className="flex  rounded-xl p-1 w-full sm:w-auto">
                <input
                  type="date"
                  name="startDate"
                  className="p-2 bg-white rounded-lg w-full"
                  onChange={(e) => updateFilter("startDate", e.target.value)}
                />
              </div>

              <span className="py-2 px-2 text-center sm:text-left">To</span>

              {/* End Date */}
              <div className="flex  rounded-xl p-1 w-full sm:w-auto">
                <input
                  type="date"
                  name="endDate"
                  className="p-2 bg-white rounded-lg w-full"
                  onChange={(e) => updateFilter("endDate", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Create Employee Button */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto inline-flex justify-center items-center py-3 px-4 text-sm font-medium text-white bg-[#0059ff] rounded-lg"
          >
            Create Employee
          </button>
        </div>

        <hr className="my-5" />

        <div className="w-full overflow-x-scroll">
          <table className="bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l overflow-hidden">
            <thead>
              <tr>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">No.</th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">Photo</th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">Name</th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">Title</th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">
                  Social Links
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Show Loader */}
              {isLoading && (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <TableSkeleton />
                  </td>
                </tr>
              )}

              {/* Show Error */}
              {isError && (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-red-500">
                    <p className="text-lg font-semibold">
                      Failed to load employees
                    </p>
                  </td>
                </tr>
              )}

              {/* Show Data */}
              {!isLoading &&
              !isError &&
              (!data || data.employeeList.length === 0) ? (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <p className="text-xl">No Employee Found</p>
                  </td>
                </tr>
              ) : (
                data?.employeeList.map((employee: any, index: number) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-100 even:bg-white text-xs"
                  >
                    <td className="py-4 px-2 border-r text-center">
                      <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-3 border-r">
                      <Image
                        src={`${employee.image ? employee.image : "/user.png"}`}
                        height={50}
                        width={50}
                        className="mx-1"
                        alt="Employee Image"
                      />
                    </td>
                    <td className="py-4 px-3 border-r">{employee.fullname}</td>
                    <td className="py-4 px-3 border-r">{employee.title}</td>
                    <td className="py-4 px-3 border-r">
                      <div className="flex">
                        {employee.socialLInks?.map((social: any, i: number) => (
                          <a key={i} href={social.link || "#"}>
                            <Image
                              src={`/social/icons/${social.icon}`}
                              height={30}
                              width={30}
                              className="mx-1"
                              alt="Social Icon"
                            />
                          </a>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="flex gap-2 bg-gray-100 px-2 py-1 rounded-xl">
                        <ToggleSwitch />
                        <button
                          type="button"
                          className="text-xs"
                          onClick={() => updateEmployee(employee)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          type="button"
                          className="text-xs text-[#FF3D00]"
                          onClick={() => deleteEmployee(employee._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.employeeList.length > 0 && (
          <Paginations
            filters={filters}
            setFilters={setFilters}
            pagination={data?.pagination}
          />
        )}
      </div>

      {/* Modal for Creating Employee */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Employee"
      >
        <EmployeeForm
          initialData={employee}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default CreateEmployee;
