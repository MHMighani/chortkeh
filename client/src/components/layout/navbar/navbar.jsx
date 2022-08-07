import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Menu from "../../common/menu";
import useAuth from "../../../hooks/useAuth";
import DarkModeToggleBtn from "../../common/darkModeToggleBtn";
import { Navbar as BootNavbar } from "react-bootstrap";

import "./navbar.scss";

const Navbar = () => {
  const { token } = useAuth();

  const logButtons = (
    <div className="log-buttons">
      <DarkModeToggleBtn />
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
