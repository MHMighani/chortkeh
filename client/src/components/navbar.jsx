import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navbar as BootNavbar } from "react-bootstrap";

const Navbar = () => {
  return (
    <BootNavbar bg="light" expand="lg">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <BootNavbar.Brand>چرتکه</BootNavbar.Brand>
        </Link>
      </Container>
    </BootNavbar>
  );
};

export default Navbar;
