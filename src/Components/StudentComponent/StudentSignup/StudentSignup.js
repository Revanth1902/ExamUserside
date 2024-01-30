// import { NavLink, useHistory } from "react-router-dom";

// import axios from "axios";
// import { useState } from "react";

// import style from "./StudentSignup.module.css";

// function StudentSignup() {
// const [userData, setUserData] = useState({
//   user_name: "",
//   user_email: "",
//   user_password: "",
// });

// function onTextFieldChange(e) {
//   setUserData({
//     ...userData,
//     [e.target.name]: e.target.value,
//   });
// }

// const [password, setPassword] = useState("");

// function handlePassword(e) {
//   setPassword({ confirmPassword: e.target.value });
// }

// let history = useHistory();

// async function handleSignup() {
//   if (userData.user_password === password.confirmPassword) {
//     await axios.post("http://localhost:3333/user", userData);
//     alert("Your account has created");
//     alert("Please Login");
//     history.push("/StudentLogin");
//   } else alert("password did not match");
// }

//   return (
//     <div id={style.container}>
//       <div id={style.formHeading}>
//         <h1>Student Signup</h1>
//         <p>Please complete the form below to register with us</p>
//       </div>

//       <div id={style.nameBox}>
//         <label htmlFor="name">
//           Name
//           <input
//             onChange={(e) => onTextFieldChange(e)}
//             type="text"
//             name="user_name"
//             required
//           />
//         </label>
//       </div>

//       <div id={style.emailBox}>
//         <label htmlFor="email">
//           {" "}
//           Email
//           <input
//             onChange={(e) => onTextFieldChange(e)}
//             type="text"
//             name="user_email"
//             required
//           />
//         </label>
//       </div>

//       <div id={style.passwordBox}>
//         <label htmlFor="password">
//           {" "}
//           Password
//           <input
//             onChange={(e) => onTextFieldChange(e)}
//             type="password"
//             name="user_password"
//             required
//           />
//         </label>
//       </div>

//       <div id={style.confirmPasswordBox}>
//         <label htmlFor="confirmPassword">
//           Confirm Password
//           <input
//             onChange={(e) => handlePassword(e)}
//             type="password"
//             name="confirmPassword"
//             required
//           />
//         </label>
//       </div>

//       <button id={style.signup} onClick={handleSignup}>
//         Sign Up
//       </button>

//       <div id={style.login}>
//         Have a Account?{" "}
//         <NavLink exact to="/StudentLogin">
//           {" "}
//           Log in
//         </NavLink>
//       </div>
//     </div>
//   );
// }

// export default StudentSignup;

// import React from "react";
// import { NavLink, useHistory } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import axios from "axios";
// import { useState } from "react";
// import Navbar from "../../HomeComponent/Navbar";

// const StudentSignup = () => {
//   const [userData, setUserData] = useState({
//     user_name: "",
//     user_email: "",
//     user_password: "",
//   });

//   function onTextFieldChange(e) {
//     setUserData({
//       ...userData,
//       [e.target.name]: e.target.value,
//     });
//   }

//   const [password, setPassword] = useState("");

//   function handlePassword(e) {
//     setPassword({ confirmPassword: e.target.value });
//   }

//   let history = useHistory();

//   async function handleSignup() {
//     if (userData.user_password === password.confirmPassword) {
//       await axios.post("http://localhost:3333/user", userData);

//       // toast("Your account has created");
//       alert("Your account has created");
//       // toast("Please Login");
//       alert("Please Login");
//       history.push("/StudentLogin");
//     } else {
//       toast("password did not match");
//       // alert("password did not match");
//     }
//   }

//   return (
//     <>
//       <Navbar />
//       <div class="container">
//         <div class="row justify-content-center">
//           <div class="col-sm-12 col-md-8 col-lg-6">
//             <div class="container bg-white rounded my-2 px-0">
//               <div class="py-1 bg-info text-white">
//                 <h1 style={{ textAlign: "center" }}>REGISTRATION</h1>
//               </div>
//               <div class="mt-3 " style={{ textAlign: "center" }}>
//                 <img src="register-icon.png" width="100px" alt="" />
//               </div>
//               <form action="">
//                 <div class="py-3 mx-5">
//                   <input
//                     onChange={(e) => onTextFieldChange(e)}
//                     type="text"
//                     name="user_name"
//                     required
//                     class="form-control  border-info"
//                     placeholder="Enter full name"
//                   />
//                 </div>
//                 <div class="py-3 mx-5">
//                   <input
//                     onChange={(e) => onTextFieldChange(e)}
//                     type="email"
//                     name="user_email"
//                     required
//                     class="form-control  border-info"
//                     placeholder="Enter Email Address"
//                   />
//                 </div>
//                 <div class="py-3 mx-5">
//                   <input
//                     onChange={(e) => onTextFieldChange(e)}
//                     type="password"
//                     name="user_password"
//                     required
//                     class="form-control  border-info"
//                     placeholder="Enter password"
//                   />
//                 </div>
//                 <div class="py-3 mx-5">
//                   <input
//                     onChange={(e) => handlePassword(e)}
//                     type="password"
//                     name="confirmPassword"
//                     required
//                     class="form-control  border-info"
//                     placeholder="Enter password"
//                   />
//                 </div>
//                 <div class="py-3 mx-5 ">
//                   <input
//                     type="button"
//                     class="form-control btn-info text-white"
//                     value="REGISTRATION "
//                     onClick={handleSignup}
//                   />
//                 </div>
//                 <ToastContainer
//                   position="top-center"
//                   autoClose={5000}
//                   hideProgressBar={false}
//                   newestOnTop={false}
//                   closeOnClick
//                   rtl={false}
//                   pauseOnFocusLoss
//                   draggable
//                   pauseOnHover
//                   theme="dark"
//                 />

//                 <div class="py-3 mx-5 ">
//                   <NavLink
//                     exact
//                     to="/StudentLogin"
//                     style={{ textDecoration: "none" }}
//                   >
//                     {" "}
//                     <input
//                       type="button"
//                       class="form-control btn-danger text-white"
//                       value="LOGIN "
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

// export default StudentSignup;

import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useState } from "react";
import Navbar from "../../HomeComponent/Navbar";

const StudentSignup = () => {
  const [userData, setUserData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
  });

  function onTextFieldChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  let history = useHistory();

  async function handleSignup() {
    if (userData.password) {
      await axios.post(
        "https://exambackend1.onrender.com/user/CreateUser",
        userData
      );

      // toast("Your account has created");
      alert("Your account has created");
      // toast("Please Login");
      alert("Please Login");
      history.push("/StudentLogin");
    } else {
      toast("password did not match");
      // alert("password did not match");
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
              <div class="mt-3 " style={{ textAlign: "center" }}>
                <img src="register-icon.png" width="100px" alt="" />
              </div>
              <form action="">
                <div class="py-3 mx-5">
                  <input
                    onChange={(e) => onTextFieldChange(e)}
                    type="text"
                    name="name"
                    required
                    class="form-control  border-info"
                    placeholder="Enter full name"
                  />
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
                    placeholder="Enter password"
                  />
                </div>

                <div class="py-3 mx-5 ">
                  <input
                    type="button"
                    class="form-control btn-info text-white"
                    value="REGISTRATION "
                    onClick={handleSignup}
                  />
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
