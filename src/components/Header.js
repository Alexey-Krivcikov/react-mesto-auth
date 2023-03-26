import React from "react";
import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="page__header header">
      <img className="logo" src={logo} alt="логотип mesto" />
    </header>
  );
}

export default Header;
