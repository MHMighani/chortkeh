import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Menu from "../common/menu";
import useAuth from "../../hooks/useAuth";
import { Navbar as BootNavbar } from "react-bootstrap";

const Navbar = () => {
  const { token } = useAuth();

  const logButtons = (
    <div className="log-buttons">
      <Link className="btn btn-light" to="/login">
        ورود
      </Link>
      <Link className="btn btn-light" to="/signup">
        ثبت‌نام
      </Link>
    </div>
  );
  const userSection = token ? <Menu /> : logButtons;

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
