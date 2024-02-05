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
//       history.push("/StudentDashboard");
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
//         history.push("/StudentDashboard");
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
    const isLoggedIn = Cookies.get("userToken");
    if (isLoggedIn !== undefined) {
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
      if (user.email === "") {
        toast("Enter Email / Mobile Number");
      } else if (user.password === "") {
        toast("Enter Password");
      } else {
        setLoad(true);
        const response = await axios.post(
          "https://exam-back-end-2.vercel.app/user/Login",
          user
        );

        if (response.data) {
          setCheck(true);
          toast("Successfull LoggedIn");
          // toast("You cannot access without logging in. \n please login first.");
          // toast("Success");
          // sessionStorage.setItem("user", user.email);
          Cookies.set("jwt_userID", response.data.data._id, { expires: 7 });
          Cookies.set("userToken", response.data.token, { expires: 7 });
          Cookies.set("jwt_firstName", response.data.data.firstName, {
            expires: 7,
          });
          Cookies.set("jwt_lastName", response.data.data.lastName, {
            expires: 7,
          });
          history.push("/");
        }
      }
    } catch (error) {
      setLoad(false);
      toast(error.response.data.message);
      // toast("Login failed:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

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
