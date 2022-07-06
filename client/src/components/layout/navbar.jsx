import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Menu from "../common/menu";
import { Navbar as BootNavbar } from "react-bootstrap";

const Navbar = () => {
  return (
    <BootNavbar height="100">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <BootNavbar.Brand>چرتکه</BootNavbar.Brand>
        </Link>
        <Menu />
      </Container>
    </BootNavbar>
  );
};

export default Navbar;
