import React from "react";
import logo from "./assets/transparentlogo.png";

const Header = () => {
  return (
    <header className="bg-white bg-opacity-90 shadow-lg custom-header">
      <img src={logo} alt="STEP1 Logo" className="custom-logo" />
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="nav-link text-[#174E75] font-semibold">Home</a></li>
          <li><a href="#" className="nav-link text-[#174E75] font-semibold">Contact</a></li>
          <li><a href="#" className="nav-link text-[#174E75] font-semibold">FAQ</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;