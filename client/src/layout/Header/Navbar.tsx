import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <ul>
      <Link to="/login" />
      <Link to="/register" />
    </ul>
  );
};

export default Navbar;
