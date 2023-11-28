import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand"  style={{ color: "white" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlU7zg0Mxh2QqaFeKrZMfhG2FSpqFeNBx_g&usqp=CAU"
              alt="Vodafone logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top me-2"
            />
            Connect4
          </a>
          <div className="collapse navbar-collapse" id="navbarNav" >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link link-underline-opacity-0" >
                  <NavLink to="/" style={{ color: "white", textDecoration: "none"}}>Play</NavLink>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >
                  <NavLink to="history" style={{ color: "white",textDecoration: "none"}}>History</NavLink>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
