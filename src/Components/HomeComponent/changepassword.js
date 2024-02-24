import { useState } from "react";
import "./profile.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import { useHistory } from "react-router-dom";

const Changepassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [load, setLoad] = useState(false);

  const getUserTokenFromCookie = () => {
    const cookieName = "userToken"; // Update with the correct cookie name
    return Cookies.get(cookieName) || null;
  };

  const updateUserDetails = async () => {
    const userToken = getUserTokenFromCookie();
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
        setLoad(true);
        const url = `https://exam-back-end-2.vercel.app/user/updateUserPassword/${Cookies.get(
          "jwt_userID"
        )}`;

        const updatedData = {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
        };

        const res = await axios.put(url, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (res.status === 201) {
          toast("Updated Password");
          setTimeout(() => {
            Cookies.remove("jwt_userID");
            Cookies.remove("userToken");
            Cookies.remove("jwt_firstName");
            Cookies.remove("jwt_lastName");

            history.replace("/StudentLogin");
          }, 1000);
        }
      } catch (error) {
        toast(error.response.data.message);
        setLoad(false);
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

      {!load ? (
        <>
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
            Cancel
          </button>
        </>
      ) : (
        <button id="submit-button" type="button">
          <ThreeDots height={30} width={30} color="#ffffff" />
        </button>
      )}
    </div>
  );
};

export default Changepassword;
