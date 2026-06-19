// import style from "./StudentLogin.module.css";

// import { NavLink, useHistory } from "react-router-dom";

// import { useState } from "react";
// import axios from "axios";

// function StudentLogin() {
// const [user, setUser] = useState({
//   user_email: "",
//   user_password: "",
// });

// function onTextFieldChange(e) {
//   setUser({
//     ...user,
//     [e.target.name]: e.target.value,
//   });
// }

// let history = useHistory();

// const [check, setCheck] = useState(false);

// async function handleLogin() {
//   let value = await axios.get("http://localhost:3333/user");

//   for (let i = 0; i < value.data.length; i++) {
//     if (
//       value.data[i].user_email === user.user_email &&
//       value.data[i].user_password === user.user_password
//     ) {
//       setCheck(true);
//       alert("success");
//       sessionStorage.setItem("user", user.user_email);
//       history.replace("/StudentDashboard");
//     }
//   }
//   if (check) alert(" Wrong User Email or password");
// }

//   return (
//     <div id={style.container}>
//       <div id={style.containerHeadingBox}>
//         <h1>Student Login</h1>
//       </div>

//       <div id={style.emailBox}>
//         <label htmlFor="email">
//           {" "}
//           Email
//           <input
//             name="user_email"
//             onChange={(e) => onTextFieldChange(e)}
//             type="text"
//             id={style.email}
//           />
//         </label>
//       </div>

//       <div id={style.passwordBox}>
//         <label htmlFor="password">
//           {" "}
//           Password
//           <input
//             name="user_password"
//             onChange={(e) => onTextFieldChange(e)}
//             type="password"
//             id={style.password}
//           />
//         </label>
//       </div>

//       <button id={style.login} onClick={handleLogin}>
//         Login
//       </button>

//       <div id={style.signup}>
//         New to Portal?{" "}
//         <NavLink exact to="/StudentSignup">
//           {" "}
//           Register
//         </NavLink>
//         <NavLink id={style.goBackLink} exact to="/">
//           {" "}
//           Go Back
//         </NavLink>
//       </div>
//     </div>
//   );
// }

// export default StudentLogin;

// import React from "react";
// import { NavLink, useHistory } from "react-router-dom";

// import { useState } from "react";
// import axios from "axios";
// import Navbar from "../../HomeComponent/Navbar";

// const StudentLogin = () => {
//   const [user, setUser] = useState({
//     user_email: "",
//     user_password: "",
//   });

//   function onTextFieldChange(e) {
//     setUser({
//       ...user,
//       [e.target.name]: e.target.value,
//     });
//   }

//   let history = useHistory();

//   const [check, setCheck] = useState(false);

//   async function handleLogin() {
//     let value = await axios.get("http://localhost:3333/user");

//     for (let i = 0; i < value.data.length; i++) {
//       if (
//         value.data[i].user_email === user.user_email &&
//         value.data[i].user_password === user.user_password
//       ) {
//         setCheck(true);
//         alert("success");
//         sessionStorage.setItem("user", user.user_email);
//         history.replace("/StudentDashboard");
//       }
//     }
//     if (check) alert(" Wrong User Email or password");
//   }

//   return (
//     <>
//       <Navbar />
//       <div class="container">
//         <div class="row  justify-content-center">
//           <div class="col-sm-12 col-md-8 col-lg-6">
//             <div class="container bg-white rounded my-2 px-0">
//               <div class="py-1 bg-danger text-white">
//                 <h1 style={{ textAlign: "center" }}>LOGIN</h1>
//               </div>
//               <div class="mt-3 " style={{ textAlign: "center" }}>
//                 <img src="login.jpg" width="100px" alt="" />
//               </div>
//               <form action="">
//                 <div class="py-3 mx-5">
//                   <input
//                     name="user_email"
//                     onChange={(e) => onTextFieldChange(e)}
//                     type="email"
//                     class="form-control  border-info"
//                     placeholder="Enter Email Address"
//                   />
//                 </div>

//                 <div class="py-3 mx-5">
//                   <input
//                     name="user_password"
//                     onChange={(e) => onTextFieldChange(e)}
//                     type="password"
//                     class="form-control  border-info"
//                     placeholder="Enter password"
//                   />
//                 </div>
//                 <div class="py-3 mx-5 ">
//                   <input
//                     type="button"
//                     class="form-control btn-danger text-white"
//                     value="LOGIN "
//                     onClick={handleLogin}
//                   />
//                 </div>
//                 <div class="py-3 mx-5 ">
//                   <NavLink
//                     exact
//                     to="/StudentSignup"
//                     style={{ textDecoration: "none" }}
//                   >
//                     {" "}
//                     <input
//                       type="button"
//                       class="form-control btn-info text-white"
//                       value="REGISTRATION "
//                     />
//                   </NavLink>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StudentLogin;

import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../../HomeComponent/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";

const StudentLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userToken");

    if (isLoggedIn !== null) {
      window.location.href = "/";
    }
  }, []);

  const history = useHistory();
  const [check, setCheck] = useState(false);
  const [load, setLoad] = useState(false);

  const onTextFieldChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      if (!user.email && !user.password) {
        toast("Enter Email / Mobile Number");
      } else if (!user.password) {
        toast("Enter Password");
      } else {
        setLoad(true);

        // Check if the entered value is in email format
        const isEmailFormat = /\S+@\S+\.\S+/.test(user.email);

        // Set the key for the API request based on the input format
        const key = isEmailFormat ? "email" : "mobileNumber";

        // Create the payload with the appropriate key-value pair
        const payload = {
          [key]: user.email,
          password: user.password,
        };

        const response = await axios.post(
          "https://exam-back-end-2.vercel.app/user/Login",
          payload
        );

        if (response.data) {
          setCheck(true);
          toast("Successfully Logged In");

          // Store user data in localStorage
          localStorage.setItem("jwt_userID", response.data.data._id);
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("jwt_firstName", response.data.data.firstName);
          localStorage.setItem("jwt_lastName", response.data.data.lastName);

          history.replace("/");
        }
      }
    } catch (error) {
      setLoad(false);
      toast(error.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    // Data to be shared
    const yourData = {
      userID: localStorage.getItem("jwt_userID"),
      userToken: localStorage.getItem("userToken"),
      firstName: localStorage.getItem("jwt_firstName"),
      lastName: localStorage.getItem("jwt_lastName"),
    };

    // Send data to parent window
    window.parent.postMessage(yourData, "*"); // '*' allows communication with any origin
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8 col-lg-6">
            <div className="container bg-white rounded my-2 px-0">
              <div className="py-1 bg-danger text-white">
                <h1 style={{ textAlign: "center" }}>LOGIN</h1>
              </div>
              <div className="mt-3" style={{ textAlign: "center" }}>
                <img src="login.jpg" width="100px" alt="" />
              </div>
              <form>
                <div className="py-3 mx-5">
                  <input
                    name="email"
                    onChange={onTextFieldChange}
                    type="email"
                    className="form-control border-info"
                    placeholder="Enter Email Address / Mobile Number"
                  />
                </div>

                <div className="py-3 mx-5">
                  <input
                    name="password"
                    onChange={onTextFieldChange}
                    type="password"
                    className="form-control border-info"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="py-3 mx-5">
                  {load ? (
                    <button
                      type="button"
                      className="form-control btn-danger text-white"
                      style={{ paddingLeft: "45%" }}
                    >
                      <TailSpin
                        height={"10%"}
                        width={"10%"}
                        color={"#ffffff"}
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="form-control btn-danger text-white"
                      onClick={handleLogin}
                    >
                      LOGIN
                    </button>
                  )}
                </div>
                <div className="py-3 mx-5">
                  <NavLink
                    exact
                    to="/StudentSignup"
                    style={{ textDecoration: "none" }}
                  >
                    <input
                      type="button"
                      className="form-control btn-info text-white"
                      value="REGISTRATION"
                    />
                  </NavLink>
                </div>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
