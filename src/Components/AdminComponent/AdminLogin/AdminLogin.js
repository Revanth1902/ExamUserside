//   import style from "./AdminLogin.module.css";

//   import {NavLink} from "react-router-dom";

//   import { useState } from "react";

//   import axios from "axios";

//   import {useHistory} from "react-router-dom";

//      function AdminLogin(){

//          const[admin , setAdmin] = useState({
//              admin_name:"",
//              admin_password:""
//          });

//         function handleInput(e){
//               setAdmin({
//                   ...admin,
//                   [e.target.name] : e.target.value
//               },[]);
//         }
//         let history = useHistory();

//          async function login(e){
//              const value = await axios.get("http://localhost:3333/admin");

//              if(value.data[0].admin_name === admin.admin_name)
//              {
//                 if(value.data[0].admin_password === admin.admin_password){
//                     alert("success");
//                     history.push("/AdminDashboard");
//                 }
//                 else{
//                     alert("Wrong Password");
//                 }
//              }
//              else{
//                  alert("Wrong Admin name");
//              }
//          }

//          return (
//             <div id={style.container}>

//             <div id={style.containerHeadingBox}>
//                 <h1>Admin Login</h1>
//             </div>

//             <div id={style.emailBox}>
//                 <label htmlFor="email"> Email
//                     <input name="admin_name" onChange={(e) => handleInput(e)} type="text" id={style.email} />
//                 </label>
//             </div>

//             <div id={style.passwordBox}>
//                 <label htmlFor="password"> Password
//                     <input name="admin_password" onChange={(e) => handleInput(e)} type="password" id={style.password} />
//                 </label>
//             </div>

//             <button onClick={(e) => login(e)}    id={style.login}>Login</button>

//             <NavLink to="/" id={style.goBackLink}> Go Back</NavLink>

//             </div>
//          );
//      }

//      export default AdminLogin;

// import React from "react";
// import Navbar from "../../HomeComponent/Navbar";

// import { NavLink } from "react-router-dom";

// import { useState } from "react";

// import axios from "axios";

// import { useHistory } from "react-router-dom";

// const AdminLogin = () => {
//   const [admin, setAdmin] = useState({
//     admin_name: "",
//     admin_password: "",
//   });

//   function handleInput(e) {
//     setAdmin(
//       {
//         ...admin,
//         [e.target.name]: e.target.value,
//       },
//       []
//     );
//   }
//   let history = useHistory();

//   async function login(e) {
//     const value = await axios.get("http://localhost:3333/admin");

//     if (value.data[0].admin_name === admin.admin_name) {
//       if (value.data[0].admin_password === admin.admin_password) {
//         alert("success");
//         history.push("/AdminDashboard");
//       } else {
//         alert("Wrong Password");
//       }
//     } else {
//       alert("Wrong Admin name");
//     }
//   }

//   return (
//     <>
//       <Navbar />
//       <div>
//         <div class="container">
//           <div class="row  justify-content-center">
//             <div class="col-sm-12 col-md-8 col-lg-6">
//               <div class="container bg-white rounded my-2 px-0">
//                 <div class="py-1 bg-danger text-white">
//                   <h1 style={{ textAlign: "center" }}>LOGIN</h1>
//                 </div>
//                 <div class="mt-3 " style={{ textAlign: "center" }}>
//                   <img src="login.jpg" width="100px" alt="" />
//                 </div>
//                 <form action="">
//                   <div class="py-3 mx-5">
//                     <input
//                       name="admin_name"
//                       onChange={(e) => handleInput(e)}
//                       type="email"
//                       class="form-control  border-info"
//                       placeholder="Enter Email Address"
//                     />
//                   </div>

//                   <div class="py-3 mx-5">
//                     <input
//                       name="admin_password"
//                       onChange={(e) => handleInput(e)}
//                       type="password"
//                       class="form-control  border-info"
//                       placeholder="Enter password"
//                     />
//                   </div>
//                   <div class="py-3 mx-5 ">
//                     <input
//                       type="button"
//                       onClick={(e) => login(e)}
//                       class="form-control btn-danger text-white"
//                       value="LOGIN "
//                     />
//                   </div>
//                   <div class="py-3 mx-5 ">
//                     <NavLink to="/" style={{ textDecoration: "none" }}>
//                       {" "}
//                       <input
//                         type="button"
//                         class="form-control btn-info text-white"
//                         value="Go To Back "
//                       />
//                     </NavLink>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminLogin;

import React, { useState } from "react";
import Navbar from "../../HomeComponent/Navbar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AdminLogin = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleInput = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "https://exambackend1.onrender.com/admin/login",
        admin
      );

      if (response.data) {
        alert("Login successful");
        history.push("/AdminDashboard");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("An error occurred during login");
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
                <div className="py-3 mx-5">
                  <NavLink to="/AdminSignup" style={{ textDecoration: "none" }}>
                    {" "}
                    <input
                      type="button"
                      className="form-control btn-info text-white"
                      value="REGISTRATION "
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

export default AdminLogin;
