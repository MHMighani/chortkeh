import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navbar as BootNavbar } from "react-bootstrap";
import ThemeContext from "../context/themeContext";

const Navbar = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <BootNavbar expand="lg">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <BootNavbar.Brand>چرتکه</BootNavbar.Brand>
        </Link>
        <button onClick={() => themeContext.toggleTheme()}>دارک مود</button>
      </Container>
    </BootNavbar>
  );
};

export default Navbar;
