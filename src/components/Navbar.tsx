import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" style={{ color: "white" }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlU7zg0Mxh2QqaFeKrZMfhG2FSpqFeNBx_g&usqp=CAU"
            alt="Vodafone logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top me-2"
          />
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          Connect4
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => setIsOpen(!isOpen)}
                style={{ color: "white", textDecoration: "none" }}
              >
                Play
              </a>
              <div
                className={`dropdown-menu ${isOpen ? "show" : ""}`}
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <NavLink
                    to="start/set"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Bot vs Bot
                  </NavLink>
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <NavLink
                    to="start/single-player-set"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Single Player Game
                  </NavLink>
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <NavLink
                    to="start/multiplayer-set"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Multiplayer Game
                  </NavLink>
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setIsOpen(false)}>
                <NavLink
                  to="history"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  History
                </NavLink>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
