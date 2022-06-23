import React from "react";
import { useContext } from "react";
import logo from "../logo.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { UserContext } from "../context/user.context";

const Navigation = () => {
  const nav = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const logoutHandler = async () => {
    localStorage.removeItem("token-info");
    setCurrentUser(null);
    window.location.reload();
    nav("/login");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{" "}
          Mike Baker Authenticated
        </Navbar.Brand>
        {currentUser && (
          <Navbar.Collapse className="justify-content-end">
            <Nav.Item>
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            </Nav.Item>
            <Navbar.Text>
              Signed in as:{" "}
              <a href="#login">
                {currentUser.first_name} {currentUser.last_name}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        )}
        {!currentUser && (
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Navigation;
