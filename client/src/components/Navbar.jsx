import React from "react";
import { NavLink } from "react-router-dom";
import AjouterPointInteretMenu from "./PointsInterets/AjouterPointInteretMenu.jsx";

// Navbar inspired by : https://tailwind-elements.com/docs/standard/navigation/navbar/#
// Active class function inspired by : https://stackoverflow.com/questions/70556869/react-activeclassname-property-of-navlink-not-working

const navLinkClasses =
  "text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 hover:underline";
const navBarActiveFunc = ({ isActive }) =>
  isActive ? "active-nav-link " + navLinkClasses : navLinkClasses;

const Navbar = () => {
  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between bg-neutral-200 py-2 text-neutral-500 shadow-lg focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
      data-te-navbar-ref
    >
      <div className="flex items-center px-3">
        <a
          href="/"
          className="flex items-center"
          style={{ transition: "color 0.3s" }}
        >
          <span className="h-7 w-7">
            <i className="fas fa-home"></i>{" "}
          </span>
          <p className="h-7 w-7 pl-1 pu-2 hover:text-neutral-700">GTI525</p>
        </a>
      </div>
      <div className="flex-grow">
        <ul className="flex justify-center list-style-none">
          <li className="mx-4">
            <NavLink to="/itineraires" className={navBarActiveFunc}>
              Itinéraires
            </NavLink>
          </li>
          <li className="mx-4">
            <NavLink to="/statistiques" className={navBarActiveFunc}>
              Statistiques
            </NavLink>
          </li>
          <li className="mx-4">
            <NavLink to="/points_interet" className={navBarActiveFunc}>
              Points d'intérêt
            </NavLink>
            <AjouterPointInteretMenu />
          </li>
        </ul>
      </div>

      <div className="flex items-center">
        <button
          type="button"
          className="mr-3 inline-block rounded px-3 py-2.5 text-xs font-medium uppercase leading-normal text-neutral-500 shadow-md transition duration-150 ease-in-out hover:shadow-lg hover:text-neutral-500"
        >
          <i className="fa-solid fa-user-ninja"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
