import { useState } from "react";
import "./profile.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";

import { useHistory } from "react-router-dom";

const Changepassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updateUserDetails = async () => {
    if (password.oldPassword === "") {
      toast("Enter Old Password");
    } else if (password.newPassword === "") {
      toast("Enter New Password");
    } else if (password.confirmPassword === "") {
      toast("Enter Confirm Password");
    } else if (password.newPassword !== password.confirmPassword) {
      toast("Password Don't Match");
    } else if (password.newPassword === password.confirmPassword) {
      try {
        const url = `https://exam-back-end-2.vercel.app/user/updateDetails/${Cookies.get(
          "jwt_userID"
        )}`;

        const updatedData = {
          password: password.newPassword,
        };

        const res = await axios.put(url, { updatedData });

        if (res.status === 200) {
          toast("Updated Password");
          setTimeout(() => {
            Cookies.remove("jwt_userID");
            Cookies.remove("userToken");
            Cookies.remove("jwt_firstName");
            Cookies.remove("jwt_lastName");

            history.push("/StudentLogin");
          }, 1000);
        }
      } catch (error) {
        console.error("Get User By Id", error);
      }
    }
  };

  return (
    <div className="profile-section">
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
        theme="light"
      />
      <h1>Profile</h1>
      <form id="form-profile-section2">
        <label htmlFor="oldpassword">Old Password</label>
        <input
          onChange={(event) => {
            setPassword({ ...password, oldPassword: event.target.value });
          }}
          id="oldpassword"
          type="password"
          value={password.oldPassword}
        />
        <label htmlFor="newpassword">New Password</label>
        <input
          onChange={(event) => {
            setPassword({ ...password, newPassword: event.target.value });
          }}
          id="newpassword"
          type="password"
          value={password.newPassword}
        />
        <label htmlFor="confirm">Confirm Password</label>
        <input
          onChange={(event) => {
            setPassword({ ...password, confirmPassword: event.target.value });
          }}
          id="confirm"
          type="password"
          value={password.confirmPassword}
        />
      </form>
      <button onClick={updateUserDetails} id="submit-button" type="button">
        Submit
      </button>
      <button
        onClick={() => {
          setPassword({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }}
        id="cancle-button"
        type="button"
      >
        Cancle
      </button>
    </div>
  );
};

export default Changepassword;
