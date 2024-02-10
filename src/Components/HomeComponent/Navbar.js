import { Link } from "react-router-dom";
import "./Navbar.module.css";

import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

import { CgProfile } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";

function Navbar() {
  const [showDropdown, setDropdown] = useState(false);

  console.log(showDropdown);

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
                  <>
                    {!showDropdown && (
                      <div
                        onClick={() => {
                          window.location.href = "/myprofile/myprofile";
                        }}
                        onMouseEnter={() => {
                          setDropdown(true);
                        }}
                        style={{
                          height: "auto",
                          width: "auto",
                          backgroundColor: "darkblue",
                          color: "white",
                          borderRadius: "50%",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          padding: ".8rem 1rem",
                          top: "17%",
                          right: "2%",
                        }}
                      >
                        <p style={{ margin: "0", padding: "0 1%" }}>
                          {Cookies.get("jwt_firstName")[0]}
                          {Cookies.get("jwt_lastName")[0]}
                        </p>
                      </div>
                    )}
                    {showDropdown && (
                      <div
                        style={{
                          position: "absolute",
                          height: "50vh",
                          zIndex: 5,
                          width: "20vw",
                          right: "0",
                          top: 0,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                        onMouseEnter={() => {
                          setDropdown(true);
                        }}
                        onMouseLeave={() => {
                          setDropdown(false);
                        }}
                      >
                        <div
                          onClick={() => {
                            window.location.href = "/myprofile/myprofile";
                          }}
                          style={{
                            height: "auto",
                            width: "auto",
                            backgroundColor: "darkblue",
                            color: "white",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            padding: ".8rem 1rem",
                            top: "4.5%",
                            right: "10%",
                          }}
                        >
                          <p style={{ margin: "0", padding: "0 1%" }}>
                            {Cookies.get("jwt_firstName")[0]}
                            {Cookies.get("jwt_lastName")[0]}
                          </p>
                        </div>
                        <div
                          style={{
                            border: "1px solid #222222",
                            width: "80%",
                            position: "absolute",
                            height: "78%",
                            top: "22%",
                            padding: "2%",
                            left: 0,
                            borderRadius: ".5rem",
                            backgroundColor: "white",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              backgroundColor: "darkblue",
                              color: "white",
                              borderRadius: "50%",
                              padding: ".8rem 1rem",
                              cursor: "pointer",
                              left: "2%",
                            }}
                          >
                            <div
                              onClick={() => {
                                window.location.href = "/myprofile/myprofile";
                              }}
                            >
                              <p style={{ margin: 0 }}>
                                {Cookies.get("jwt_firstName")[0]}
                                {Cookies.get("jwt_lastName")[0]}
                              </p>
                            </div>
                          </div>
                          <h5
                            style={{
                              margin: 0,
                              marginLeft: "30%",
                              marginTop: "4%",
                            }}
                          >
                            {Cookies.get("jwt_firstName")}&nbsp;
                            {Cookies.get("jwt_lastName")}
                          </h5>
                          <hr style={{ marginTop: "10%" }} />
                          <h6
                            onClick={() => {
                              window.location.href = "/myprofile/myprofile";
                            }}
                            style={{ fontSize: "1rem", cursor: "pointer" }}
                          >
                            <CgProfile /> &nbsp; My Profile
                          </h6>
                          <h6
                            onClick={() => {
                              window.location.href =
                                "/myprofile/changepassword";
                            }}
                            style={{ fontSize: "1rem", cursor: "pointer" }}
                          >
                            <FiEdit /> &nbsp; Change Password
                          </h6>
                          <hr style={{ marginTop: "10%" }} />
                          <h6
                            onClick={() => {
                              window.location.href = "/myprofile/help";
                            }}
                            style={{ fontSize: "1rem", cursor: "pointer" }}
                          >
                            <IoIosHelpCircleOutline /> &nbsp; Help
                          </h6>
                          <h6
                            onClick={() => {
                              window.location.href = "/myprofile/settings";
                            }}
                            style={{ fontSize: "1rem", cursor: "pointer" }}
                          >
                            <CiSettings /> &nbsp; Settings
                          </h6>
                        </div>
                      </div>
                    )}
                  </>
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
