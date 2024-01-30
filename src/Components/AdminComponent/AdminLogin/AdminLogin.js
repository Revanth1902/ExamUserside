import React, { useEffect, useState } from "react";
import Navbar from "../../HomeComponent/Navbar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    if (Cookies.get("jwt_AdminToken") !== undefined) {
      history.push("/Admindashboard");
    }
  });

  const handleInput = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "https://exam-back-end.vercel.app/admin/login",
        admin
      );

      if (response.data) {
        Cookies.set("jwt_AdminToken", response.data.token, { expires: 7 });
        Cookies.set("jwt_AdminId", response.data.data._id, { expires: 7 });
        history.push("/AdminDashboard");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <>
      <div style={{ marginTop: "10%" }} className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8 col-lg-6">
            <div className="container bg-white rounded my-2 px-0">
              <div className="py-1 bg-danger text-white">
                <h1 style={{ textAlign: "center" }}>ADMIN LOGIN</h1>
              </div>
              <div className="mt-3" style={{ textAlign: "center" }}>
                <img src="login.jpg" width="100px" alt="" />
              </div>
              <form>
                <div className="py-3 mx-5">
                  <input
                    name="email"
                    onChange={handleInput}
                    type="email"
                    className="form-control border-info"
                    placeholder="Enter Email Address"
                  />
                </div>

                <div className="py-3 mx-5">
                  <input
                    name="password"
                    onChange={handleInput}
                    type="password"
                    className="form-control border-info"
                    placeholder="Enter password"
                  />
                </div>
                <div className="py-3 mx-5">
                  <input
                    type="button"
                    onClick={login}
                    className="form-control btn-danger text-white"
                    value="ADMIN LOGIN "
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
