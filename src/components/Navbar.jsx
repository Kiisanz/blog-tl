import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import navlist from "../navlist.json";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const HandleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="flex justify-start w-1/2 px-6 py-3 lg:px-24">
          <NavLink className={"text-yellow-600 font-poppins"} to={"/me"}>
            thoughtlist.
          </NavLink>
        </div>
        <div className="relative flex justify-end w-1/2 px-6 py-3 lg:px-24">
          <div className="items-center justify-between hidden w-5/6 lg:flex lg:w-full">
            {navlist.map((list, i) => (
              <NavLink
                key={i}
                className={
                  "uppercase text-gray-400 transition-all duration-300 ease-in-out hover:text-yellow-600"
                }
                to={list.path}
              >
                {list.menu}
              </NavLink>
            ))}
          </div>
          <button
            className="p-1 transition-all duration-300 ease-in-out rounded-full hover:bg-gray-200 hover:bg-opacity-60 lg:hidden"
            onClick={HandleClick}
          >
            {!isOpen ? <IconMenu2 /> : <IconX />}
          </button>
          {isOpen && (
            <div className="absolute w-[75%] bg-white md:w-1/3 px-3 shadow-lg shadow-gray-300/50 top-12 z-30 py-3 rounded-xl">
              {navlist.map((list, i) => (
                <div
                  className={
                    "flex flex-col py-1 px-3 w-full hover:text-yellow-600 transition-all duration-300 ease-in-out rounded-xl "
                  }
                >
                  <NavLink className={"uppercase text-xs"} to={list.path}>
                    {list.menu}
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
