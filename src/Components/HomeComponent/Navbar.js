import { Link } from "react-router-dom";

import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Navbar() {
  const history = useHistory();

  function logout() {
    Cookies.remove("userToken");
    Cookies.remove();
    history.push("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container py-2">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            Online Exam System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* means */}
          <div className="collapse navbar-collapse align-middle" id="navbarNav">
            <ul className="navbar-nav ms-auto nav_ul align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/document">
                  Document
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>

              <div className="mx-3">
                {Cookies.get("userToken") === undefined ? (
                  <Link to="/StudentLogin">
                    <button type="button" className="btn1 mx-2 rounded-pill">
                      Log In
                    </button>
                  </Link>
                ) : (
                  <Link onClick={logout} exact to="/StudentLogin">
                    <button type="button" className="btn3 ms-2 rounded-pill">
                      Log Out
                    </button>
                  </Link>
                )}

                {/* <Link to="/AdminLogin">
                  <button type="button" className="btn2 mx-2 rounded-pill">
                    Admin
                  </button>
                </Link> */}
              </div>
            </ul>
          </div>
          {/* end */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
