import React from "react";
import { NavLink } from "react-router-dom";


const navLinkClasses =
  "bg-neutral-500 hover:bg-neutral-700 text-white px-4 py-2 rounded w-24 flex items-center justify-center";
const navBarActiveFunc = ({ isActive }) =>
  isActive ? "active-nav-link " + navLinkClasses : navLinkClasses;

export const Home = () => (
  <div className="flex flex-col items-center py-5">
    <h1>Home</h1>
    <img style={{ height: "360px", width: "400px" }}
      src="/assets/logo_website.jpg"
      alt="logo website" />

    <div className="flex mt-4 space-x-4">
      <NavLink to="/team" className={navBarActiveFunc}>
        Équipe
      </NavLink>

      <NavLink to="/about" className={navBarActiveFunc}>
        A propos
      </NavLink>
    </div>

  </div>
);

export default Home;
