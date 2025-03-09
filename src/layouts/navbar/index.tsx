import CardList from "@/components/cardList";

import {
  faBell,
  faHandHoldingMedical,
  faRotateRight,
  faEnvelope,
  faExpandArrowsAlt,
  faMoneyBill,
  faMoon,
  faUsd,
  faSearch,
  faBars,
  faX,
  faBook,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

type PopupState = {
  liveMessages: boolean;
  course: boolean;
  videos: boolean;
  deposit: boolean;
  withdraw: boolean;
  transaction: boolean;
  notification: boolean;
};

const Navbar = () => {
  const initPopupState: PopupState = {
    liveMessages: false,
    course: false,
    videos: false,
    deposit: false,
    withdraw: false,
    transaction: false,
    notification: false,
  };

  const [togglePopup, setTogglePopup] = useState(initPopupState);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const dropdownRefs = {
    liveMessages: useRef<HTMLDivElement>(null),
    course: useRef<HTMLDivElement>(null),
    videos: useRef<HTMLDivElement>(null),
    deposit: useRef<HTMLDivElement>(null),
    withdraw: useRef<HTMLDivElement>(null),
    transaction: useRef<HTMLDivElement>(null),
    notification: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const newToggleState = { ...initPopupState };
      let clickedOutside = false;

      Object.keys(dropdownRefs).forEach((key) => {
        const ref = dropdownRefs[key as keyof typeof dropdownRefs];
        if (ref.current && !ref.current.contains(event.target as Node)) {
          newToggleState[key as keyof PopupState] = false;
          clickedOutside = true;
        }
      });

      if (clickedOutside) {
        setTogglePopup(newToggleState);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (keyName: keyof PopupState) => {
    setTogglePopup((prev) => ({
      ...initPopupState,
      [keyName]: !prev[keyName],
    }));
  };

  const msgList = [
    { name: "Mr Jack", value: "Advice", msg: "hi", time: "2 hours ago" },
    { name: "Mr Jack", value: "Advice", msg: "hi", time: "2 hours ago" },
    {
      name: "Mr Jack",
      value: "Advice",
      msg: "can you help me",
      time: "2 hours ago",
    },
    { name: "Mr Jack", value: "Advice", msg: "hi", time: "2 hours ago" },
    { name: "Mr Jack", value: "Advice", msg: "hi", time: "2 hours ago" },
  ];

  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Function to check if the popup is close to the right edge
  const getPopupPositionStyle = (index: number) => {
    const popupWidth = 320; // Approximate width of your popup
    const screenWidth = window.innerWidth;
    const offset = 16; // Add margin/padding offset
    const positionStyle: any = {
      left: "50%",
      transform: "translateX(-50%)",
      maxWidth: "calc(100vw - 32px)",
      width: "auto",
    };

    // Get the position of the popup
    const popupLeft = (popupWidth * index + offset) % screenWidth;
    const remainingSpace = screenWidth - popupLeft - popupWidth;

    // Adjust position if remaining space is insufficient
    if (remainingSpace < popupWidth) {
      positionStyle.left = "auto";
      positionStyle.right = "0"; // Align to the right if space is insufficient
      positionStyle.transform = "none";
    }

    return positionStyle;
  };

  return (
    <div className="bg-off-white shadow-lg text-black dark:bg-gray-800 dark:text-white">
      <div className="p-4 flex flex-wrap items-center justify-between">
        <button
          className="lg:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon
            icon={isMobileMenuOpen ? faX : faBars}
            className="text-xl"
          />
        </button>

        <button
          className="lg:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        >
          <FontAwesomeIcon icon={faSearch} className="text-xl" />
        </button>

        <div
          className={`${
            isSearchVisible ? "flex" : "hidden"
          } lg:flex w-full lg:w-96 order-3 lg:order-none mt-4 lg:mt-0`}
        >
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Search"
              className="p-2 pr-16 bg-gray-300 pl-4 border-none rounded-full w-full focus:outline-none"
            />
            <button className="absolute right-0 h-full px-4 bg-blue-600 text-white rounded-full rounded-l-none">
              Search
            </button>
          </div>
        </div>

        <ul
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row items-center w-full lg:w-auto gap-4 mt-4 lg:mt-0 order-4 lg:order-none`}
        >
          <li>
            <button
              type="button"
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </li>
          <li>
            <button
              type="button"
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
              <FontAwesomeIcon icon={faExpandArrowsAlt} />
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
              <FontAwesomeIcon icon={faMoon} />
            </button>
          </li>

          {Object.keys(initPopupState).map((key, index) => (
            <li key={key} className="relative">
              <div ref={dropdownRefs[key as keyof typeof dropdownRefs]}>
                <button
                  type="button"
                  onClick={() => toggleDropdown(key as keyof PopupState)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FontAwesomeIcon icon={getIcon(key)} />
                </button>
                {togglePopup[key as keyof PopupState] && (
                  <div
                    className="absolute mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10"
                    style={getPopupPositionStyle(index)}
                  >
                    <div className="p-3">
                      <CardList
                        title={capitalize(key)}
                        counts={20}
                        data={msgList}
                        type={""}
                        icon={faEnvelope}
                        href={""}
                      />
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const getIcon = (key: string) => {
  const icons = {
    liveMessages: faEnvelope,
    deposit: faUsd,
    withdraw: faHandHoldingMedical,
    transaction: faMoneyBill,
    notification: faBell,
    course: faBook,
    videos: faVideo,
  };
  return icons[key as keyof typeof icons] || faBell;
};

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export default Navbar;
