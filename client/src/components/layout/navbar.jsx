import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Menu from "../common/menu";
import useAuth from "../../hooks/useAuth";
import { Navbar as BootNavbar } from "react-bootstrap";

const Navbar = () => {
  const { token } = useAuth();

  const userSection = token ? <Menu /> : null;

  return (
    <BootNavbar height="100">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <BootNavbar.Brand>چرتکه</BootNavbar.Brand>
        </Link>
        {userSection}
      </Container>
    </BootNavbar>
  );
};

export default Navbar;
