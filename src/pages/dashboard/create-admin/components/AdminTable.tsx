import React, { useState } from "react";
import {
  faEdit,
  faExternalLink,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAdmins, useDeleteAdmin } from "@/hooks/Admin";

function AdminTable({ setSelectedAdmin }: any) {
  const { data, isLoading, isError, error } = useGetAdmins({});
  const { mutate: deleteAdmin } = useDeleteAdmin();

  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {}
  );

  const togglePasswordVisibility = (adminId: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [adminId]: !prev[adminId],
    }));
  };

  const handleDelete = (adminId: string) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      deleteAdmin(adminId);
    }
  };

  const handleEdit = (admin: any) => {
    setSelectedAdmin(admin);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#1D4ED8]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error?.message || "Something went wrong!"}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-scroll">
      <table className="bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l overflow-hidden">
        <thead>
          <tr>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
              No.
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
              Photo
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white min-w-14">
              Name
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white min-w-14">
              Username
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
              Email
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
              Login URL
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
              Password
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
              Access
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.admins?.map((admin: any, index: number) => (
            <tr
              key={admin._id}
              className="odd:bg-gray-100 even:bg-white text-xs"
            >
              <td className="py-4 px-2 border-r border-[#1D4ED8] text-center">
                <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                  {index + 1}
                </span>
              </td>
              <td className="py-4 px-3 border-r border-[#1D4ED8] text-center min-w-14">
                <Image
                  src={
                    admin.photo
                      ? `${process.env.NEXT_PUBLIC_BACKEN_URL}/uploads/${admin.photo}`
                      : "/user.png"
                  }
                  className="m-auto"
                  height={50}
                  width={50}
                  alt="Admin Photo"
                />
              </td>
              <td className="py-4 px-3 border-r border-[#1D4ED8]">
                {admin.name}
              </td>
              <td className="py-4 px-3 border-r border-[#1D4ED8]">
                {admin.username}
              </td>
              <td className="py-4 px-3 border-r border-[#1D4ED8] min-w-28">
                {admin.email}
              </td>
              <td className="py-4 px-3 border-r border-[#1D4ED8] relative min-w-28">
                {admin.loginUrl}
                <a
                  href="#"
                  target="_blank"
                  className="absolute bottom-2 right-2"
                >
                  <FontAwesomeIcon icon={faExternalLink} />
                </a>
              </td>
              <td className="py-4 px-3 border-r border-[#1D4ED8] min-w-28">
                {showPassword[admin._id] ? admin.password : "••••••••"}
                <button
                  onClick={() => togglePasswordVisibility(admin._id)}
                  className="ml-2 text-xs text-blue-600"
                >
                  {showPassword[admin._id] ? "Hide" : "Show"}
                </button>
              </td>
              <td className="py-4 px-3 border-r border-[#1D4ED8] min-w-28">
                {admin.access ? admin.access.length : "No access"}
              </td>
              <td className="py-4 px-2 text-center">
                <div className="flex gap-2 bg-[--off-white-color] px-2 py-1 rounded-xl">
                  <button
                    type="button"
                    className="text-xs"
                    onClick={() => handleEdit(admin)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    type="button"
                    className="text-xs text-[#FF3D00]"
                    onClick={() => handleDelete(admin._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
