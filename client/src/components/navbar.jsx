import React from "react";
import { Container } from "react-bootstrap";
import { Navbar as BootNavbar } from "react-bootstrap";

const Navbar = () => {
  return (
    <BootNavbar bg="light" expand="lg">
      <Container>
        <BootNavbar.Brand href="/assets">چرتکه</BootNavbar.Brand>
      </Container>
    </BootNavbar>
  );
};

export default Navbar;
