import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navbar as BootNavbar } from "react-bootstrap";
import DarkModeToggleBtn from "./darkModeToggleBtn";
const Navbar = () => {
  return (
    <BootNavbar expand="lg">
      <Container>
        <Link to="/portfolio-details" style={{ textDecoration: "none" }}>
          <BootNavbar.Brand>چرتکه</BootNavbar.Brand>
        </Link>
        <DarkModeToggleBtn />
      </Container>
    </BootNavbar>
  );
};

export default Navbar;
