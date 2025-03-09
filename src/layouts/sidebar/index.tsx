import { faUserCircle, faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth.context";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menusList = [
    { title: "Dashboard", to: "/dashboard" },
    { title: "Monthly Pay Track", to: "/dashboard/monthly-pay-track" },
    { title: "Student", to: "/dashboard/students" },
    { title: "Teacher", to: "/dashboard/teacher" },
    { title: "Payments", to: "/dashboard/payments" },
    { title: "Withdraw", to: "/dashboard/withdraw" },
    // { title: "Transaction", to: "/transaction" },
    { title: "Home", to: "/dashboard/home" },
    { title: "Footer", to: "/dashboard/footer" },
    { title: "Menu", to: "/dashboard/menu" },
    { title: "Course", to: "/dashboard/course" },
    // { title: "Videos", to: "/videos" },
    { title: "Examinee", to: "/dashboard/examinee" },
    { title: "Examination Center", to: "/dashboard/examination-center" },
    { title: "Live Chat", to: "/dashboard/live-chat" },
    { title: "Create Admin", to: "/dashboard/create-admin" },
    { title: "Change Password", to: "/dashboard/change-password" },
  ];

  const router = useRouter();
  const path = router.pathname;
  const { onLogout } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-4 left-4 z-50 p-2 leading-none bg-white/60 hover:opacity-80 rounded-lg"
      >
        <FontAwesomeIcon icon={isOpen ? faX : faBars} className="text-xl" />
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
        fixed lg:relative
        h-screen
        bg-off-white dark:bg-gray-800
        text-black dark:text-white
        transition-transform duration-300 ease-in-out
        z-50 lg:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col justify-between
      `}
      >
        <div className="relative">
          <div className="text-center p-8 pb-1">
            <div className="flex flex-col font-semibold items-center">
              <FontAwesomeIcon icon={faUserCircle} className="text-6xl" />
              <span className="mt-2">Dr. Jain</span>
            </div>
          </div>

          <div className="overflow-y-auto hide-scrollbar max-h-[calc(100vh-200px)]">
            <ul className="p-4">
              {menusList.map((e) => (
                <li key={e.to} className="my-6">
                  <Link
                    href={e.to}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-md transition-all ${
                      path === e.to
                        ? "bg-blue-600 text-white"
                        : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {e.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 m-4 min-w-[220px] rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
