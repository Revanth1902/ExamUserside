import { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import Cookies from "js-cookie";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [editProfile, setProfile] = useState(false);
  const [userDetails, setDetails] = useState(() => {
    return {};
  });
  const [editDetails, seteditDetails] = useState(() => {
    return {};
  });

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const url = `https://exam-back-end-2.vercel.app/user/getUserByUserId/${Cookies.get(
        "jwt_userID"
      )}`;

      const res = await axios.get(url);

      if (res.status === 200) {
        setDetails({
          ...res.data.data,
          dob:
            res.data.data.dob === undefined ? "Not Updated" : res.data.data.dob,
          state:
            res.data.data.state === undefined
              ? "Not Updated"
              : res.data.data.state,
        });
        seteditDetails({
          ...res.data.data,
          date:
            res.data.data.date === undefined
              ? "Not Updated"
              : res.data.data.date,
          state:
            res.data.data.state === undefined
              ? "Not Updated"
              : res.data.data.state,
        });
      }
    } catch (error) {
      console.error("Get User By Id", error);
    }
  };

  const updateUserDetails = async () => {
    if (
      userDetails.firstName === editDetails.firstName &&
      userDetails.lastName === editDetails.lastName &&
      userDetails.gender === editDetails.gender &&
      userDetails.dob === editDetails.data &&
      userDetails.state === editDetails.state &&
      userDetails.email === editDetails.email &&
      userDetails.mobileNumber === editDetails.mobileNumber
    ) {
      setProfile(false);
      toast("No Changes Made");
    } else {
      try {
        const url = `https://exam-back-end-2.vercel.app/user/updateDetails/${Cookies.get(
          "jwt_userID"
        )}`;

        const updatedData = {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          dob: userDetails.dob,
          state: userDetails.state,
          gender: userDetails.gender,
        };

        if (userDetails.mobileNumber !== editDetails.mobileNumber) {
          updatedData.mobileNumber = userDetails.mobileNumber;
        }

        if (userDetails.email !== editDetails.email) {
          updatedData.email = userDetails.email;
        }

        const res = await axios.put(url, { updatedData });

        if (res.status === 200) {
          toast("Updated Details");
          getUserDetails();
        }
      } catch (error) {
        console.error("Get User By Id", error);
      }
    }
  };
  const changeUserDetails = (e) => {
    if (e.target.name === "image") {
      setDetails({ ...userDetails, [e.target.name]: e.target.files[0] });
    } else {
      setDetails({ ...userDetails, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
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
      {!editProfile ? (
        <div className="profile-section">
          <h1>Profile</h1>
          <form id="form-profile-section1">
            <div>
              <label htmlFor="firstName">First Name : </label>
              <span style={{ textTransform: "capitalize" }}>
                {userDetails.firstName}
              </span>

              <label htmlFor="firstName">Last Name :</label>
              <span style={{ textTransform: "capitalize" }}>
                {userDetails.lastName}
              </span>
            </div>
            <div>
              <label>Gender :</label>
              <span style={{ textTransform: "capitalize" }}>
                {userDetails.gender}
              </span>
            </div>

            <div>
              <label htmlFor="date">DOB : </label>
              <span>{userDetails.dob}</span>

              <label htmlFor="state">State : </label>
              <span style={{ textTransform: "capitalize" }}>
                {userDetails.state}
              </span>
            </div>

            <div>
              <label htmlFor="email">Email Address : </label>
              <span>{userDetails.email}</span>
              <label htmlFor="mobileNumber">Mobile Number : </label>
              <span>{userDetails.mobileNumber}</span>
            </div>
          </form>
          <button
            onClick={() => {
              setProfile(!editProfile);
            }}
            type="button"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="profile-section">
          <h1>Profile</h1>
          <form id="form-profile-section">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={userDetails.firstName}
                onChange={changeUserDetails}
              />

              <label htmlFor="firstName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={userDetails.lastName}
                onChange={changeUserDetails}
              />
            </div>
            <div>
              <label>Gender</label>
              <span>
                <input
                  name="gender"
                  type="radio"
                  value="male"
                  checked={userDetails.gender === "male" && true}
                  onChange={changeUserDetails}
                />
                <label>Male</label>
              </span>
              <span>
                <input
                  name="gender"
                  type="radio"
                  value="female"
                  checked={userDetails.gender === "female" && true}
                  onChange={changeUserDetails}
                />
                <label>Female</label>
              </span>
            </div>

            <div>
              <label htmlFor="date">DOB</label>
              <input
                name="dob"
                id="date"
                type="date"
                value={userDetails.dob}
                onChange={changeUserDetails}
              />

              <label htmlFor="state">State</label>
              <input
                name="state"
                id="state"
                type="text"
                value={userDetails.state}
                onChange={changeUserDetails}
              />
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input
                name="email"
                id="email"
                type="email"
                value={userDetails.email}
                onChange={changeUserDetails}
              />
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                name="mobileNumber"
                id="mobileNumber"
                type="number"
                value={userDetails.mobileNumber}
                onChange={changeUserDetails}
              />
            </div>
            <div>
              <label htmlFor="avatar">Avatar</label>
              <input name="image" id="avatar" type="file" />
            </div>
          </form>
          <button
            onClick={() => {
              setProfile(!editProfile);
              updateUserDetails();
            }}
            type="button"
          >
            Done
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
