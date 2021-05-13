import React from "react";
import Navbar from "./Navbar";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <>
      <div>Header</div>
      <Navbar />
    </>
  );
};

export default Header;
