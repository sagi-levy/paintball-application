import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { getUser } from "../services/userApiServices";

const Navbar = () => {
  const { user } = useAuth() || {};
  const [collapseOpen, setCollapseOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavLinkClick = () => {
    // Close the collapse when a NavLink is clicked
    setCollapseOpen(false);
    // Scroll to the top of the screen
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed navbar navbar-expand-sm navbar-dark bg-dark"
        aria-label="Sixth navbar example"
      >
        <div className="container-fluid">
          <Link to="/" onClick={handleNavLinkClick}>
            {" "}
            <i className="bi bi-house-door bi-big"></i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setCollapseOpen(!collapseOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${collapseOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav ms-auto mb-2 mb-xl-0">
              {/* User authenticated links */}
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
                      <span className="text-d-sm-none">settings</span>{" "}
                      <i className="bi bi-gear"></i>
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <NavLink
                          to={`users/change-password/${user._id}`}
                          className="dropdown-item"
                          onClick={handleNavLinkClick}
                        >
                          change password
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <li className="nav-item">
                    <NavLink
                      to="about"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="send-email"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      contact us
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="sign-out"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      Sign Out
                    </NavLink>
                  </li>{" "}
                  <li className="nav-item">
                    <NavLink
                      to="calendar"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      calendar
                    </NavLink>
                  </li>{" "}
                </>
              ) : (
                /* Guest links */
                <>
                  <li className="nav-item">
                    <NavLink
                      to="sign-in"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      sign in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="sign-up"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      sign up
                    </NavLink>
                  </li>{" "}
                  <li className="nav-item">
                    <NavLink
                      to="about"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      gallery
                    </NavLink>
                  </li>{" "}
                  <li className="nav-item">
                    <NavLink
                      to="send-email"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      contact us
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="calendar"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      calendar
                    </NavLink>
                  </li>{" "}
                </>
              )}
              {/* User with business links */}
              {user && user.biz && (
                <li className="nav-item">
                  <NavLink
                    to={`cards/my-activity-cards/${user._id}`}
                    className="nav-link"
                    onClick={handleNavLinkClick}
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
