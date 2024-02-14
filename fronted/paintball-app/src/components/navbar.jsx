import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { getUser } from "../services/userApiServices";

const Navbar = () => {
  const { user } = useAuth() || {};
  return (
    <>
      <nav
        className="fixed-top navbar navbar-expand-sm navbar-dark bg-dark"
        aria-label="Sixth navbar example"
      >
        <div className="container-fluid">
          <Link to="/">
            {" "} 
            <i className="bi bi-house-door bi-big"></i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample06"
            aria-controls="navbarsExample06"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-xl-0">
              {user ? (
                <>
                  <div className="dropdown m-2 ">
                    <button
                      className="btn btn-secondary dropdown-toggle nav-link"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      settings <i className="bi bi-gear"></i>
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <NavLink
                          to={`users/change-password/${user._id}`}
                          className="dropdown-item"
                        >
                          change password
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <li className="nav-item">
                    <NavLink to="about" className="nav-link">
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="send-email" className="nav-link">
                      contact us
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="sign-out" className="nav-link">
                      Sign Out
                    </NavLink>
                  </li>{" "}
                  <li className="nav-item">
                    <NavLink to="calendar" className="nav-link">
                      calendar
                    </NavLink>
                  </li>{" "}
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="sign-in" className="nav-link">
                      sign in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="sign-up" className="nav-link">
                      sign up
                    </NavLink>
                  </li>{" "}
                  <li className="nav-item">
                    <NavLink to="about" className="nav-link">
                      gallery
                    </NavLink>
                  </li>{" "}
                  <li className="nav-item">
                    <NavLink to="send-email" className="nav-link">
                      contact us
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="calendar" className="nav-link">
                      calendar
                    </NavLink>
                  </li>{" "}
                </>
              )}
              {user && user.biz && (
                <li className="nav-item">
                  <NavLink
                    to={`cards/my-activity-cards/${user._id}`}
                    className="nav-link"
                  >
                    My Cards
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
