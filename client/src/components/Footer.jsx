import React from "react";
import { Link } from "react-router-dom";

// Fortement inspiré de : https://tailwind-elements.com/docs/react/navigation/footer/
const Footer = () => {
  return (
    <footer className="fixed bottom-0 h-14 w-full bg-neutral-200 text-center text-white py-3">
      <div className="container">
        <div className="flex justify-between pl-10 items-center">
          <div className="flex">
            <Link
              to="http://facebook.com"
              target="_blank"
              className="mr-6 text-neutral-500 hover:text-neutral-700"
            >
              <i className="text-2xl fab fa-facebook"></i>
            </Link>
            <Link
              to="http://twitter.com"
              target="_blank"
              className="mr-6 text-neutral-500 hover:text-neutral-700"
            >
              <i className="text-2xl fab fa-twitter"></i>
            </Link>
            <Link
              to="https://github.com/KamalChafik/gti525-gr02-eq02"
              target="_blank"
              className="text-neutral-500 hover:text-neutral-700"
            >
              <i className="text-2xl fab fa-github"></i>
            </Link>
          </div>
          <div className="pr-10 text-right text-neutral-700">
            © 2023 GTI525 Groupe 02 - Équipe 02
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
