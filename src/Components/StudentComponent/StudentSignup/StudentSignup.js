import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";

import axios from "axios";
import { useState } from "react";
import Navbar from "../../HomeComponent/Navbar";

const StudentSignup = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "Select",
    mobileNumber: 0,
    email: "",
    password: "",
  });

  const [load, setLoad] = useState(false);

  function onTextFieldChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  let history = useHistory();

  async function handleSignup() {
    setLoad(true);
    try {
      if (userData.firstName === "") {
        toast("Enter First Name");
      } else if (userData.lastName === "") {
        toast("Enter Last Name");
      } else if (userData.gender === "Select") {
        toast("Select Gender");
      } else if (userData.mobileNumber === 0) {
        toast("Enter Mobile Number");
      } else if (userData.mobileNumber.length !== 10) {
        toast("Enter Valid Mobile Number");
      } else if (userData.email === "") {
        toast("Enter Email");
      } else if (!userData.email.endsWith("@gmail.com")) {
        toast("Enter Valid Email");
      } else if (userData.password === "") {
        toast("Enter Password");
      } else {
        const res = await axios.post(
          "https://exam-back-end.vercel.app/user/CreateUser",
          userData
        );

        if (res.status === 201) {
          // toast("Your account has created");
          toast("Your account has created");
          // toast("Please Login");
          toast("Please Login");
          history.push("/StudentLogin");
        }
      }
    } catch (error) {
      toast(error.response.data.message);
    }
  }

  return (
    <>
      <Navbar />
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-sm-12 col-md-8 col-lg-6">
            <div class="container bg-white rounded my-2 px-0">
              <div class="py-1 bg-info text-white">
                <h1 style={{ textAlign: "center" }}>REGISTRATION</h1>
              </div>
              <div class="mt-1 " style={{ textAlign: "center" }}>
                <img src="register-icon.png" width="100px" alt="" />
              </div>
              <form action="">
                <div class="py-3 mx-5">
                  <input
                    onChange={(e) => onTextFieldChange(e)}
                    type="text"
                    name="firstName"
                    required
                    class="form-control  border-info"
                    placeholder="Enter First name"
                  />
                </div>
                <div class="py-3 mx-5">
                  <input
                    onChange={(e) => onTextFieldChange(e)}
                    type="text"
                    name="lastName"
                    required
                    class="form-control  border-info"
                    placeholder="Enter Last name"
                  />
                </div>
                <div class="py-3 mx-5">
                  <select
                    onChange={(e) => onTextFieldChange(e)}
                    name="gender"
                    required
                    class="form-control  border-info"
                    style={{ textTransform: "capitalize" }}
                  >
                    <option>Select</option>
                    <option>male</option>
                    <option>female</option>
                  </select>
                </div>
                <div class="py-3 mx-5">
                  <input
                    onChange={(e) => onTextFieldChange(e)}
                    type="number"
                    name="mobileNumber"
                    required
                    class="form-control  border-info"
                    placeholder="Enter Mobile Number"
                  />
                </div>

                <div class="py-3 mx-5">
                  <input
                    onChange={(e) => onTextFieldChange(e)}
                    type="email"
                    name="email"
                    required
                    class="form-control  border-info"
                    placeholder="Enter Email Address"
                  />
                </div>
                <div class="py-3 mx-5">
                  <input
                    onChange={(e) => onTextFieldChange(e)}
                    type="password"
                    name="password"
                    required
                    class="form-control  border-info"
                    placeholder="Enter Password"
                  />
                </div>

                {load ? (
                  <button
                    type="button"
                    class="form-control btn-info text-white"
                    style={{ paddingLeft: "45%" }}
                  >
                    <TailSpin height={"10%"} width={"10%"} color={"#ffffff"} />
                  </button>
                ) : (
                  <button
                    type="button"
                    class="form-control btn-info text-white"
                    onClick={handleSignup}
                  >
                    REGISTRATION
                  </button>
                )}

                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                />

                <div class="py-3 mx-5 ">
                  <NavLink
                    exact
                    to="/StudentLogin"
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    <input
                      type="button"
                      class="form-control btn-danger text-white"
                      value="LOGIN "
                    />
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSignup;
