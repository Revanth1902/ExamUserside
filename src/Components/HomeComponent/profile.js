import { isValidElement, useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import Cookies from "js-cookie";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const Profile = () => {
  const [editProfile, setProfile] = useState(false);
  const [userDetails, setDetails] = useState(() => {
    return {};
  });
  const [editDetails, seteditDetails] = useState(() => {
    return {};
  });

  const history = useHistory();

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
      setProfile(!editProfile);
      toast("No Changes Made");
    } else {
      if (userDetails.firstName === "") {
        toast("Enter First Name");
      } else if (userDetails.lastName === "") {
        toast("Enter Last Name");
      } else if (userDetails.state === "") {
        toast("Select State");
      } else if (
        userDetails.email === "" ||
        !userDetails.email.endsWith("@gmail.com")
      ) {
        toast("Enter Valid Email");
      } else if (
        userDetails.mobileNumber === "" ||
        `${userDetails.mobileNumber}`.length !== 10
      ) {
        toast("Enter Valid Mobile Numer");
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

          const res = await axios.put(url, updatedData);

          if (res.status === 201) {
            toast("Updated Details");
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
    }
  };
  const changeUserDetails = (e) => {
    if (e.target.name === "image") {
      setDetails({ ...userDetails, [e.target.name]: e.target.files[0] });
    } else {
      if (e.target.name === "firstName") {
      }
      setDetails({ ...userDetails, [e.target.name]: e.target.value });
    }
  };

  // console.log(editDetails);
  // console.log(userDetails);

  console.log(userDetails.mobileNumber);

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
                onChange={(e) => {
                  const regex = /^[a-zA-Z\s]*$/; // Regular expression to allow only letters and spaces
                  const yesorno = regex.test(e.target.value);
                  if (yesorno) {
                    changeUserDetails(e);
                  }
                }}
              />

              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={userDetails.lastName}
                onChange={(e) => {
                  const regex = /^[a-zA-Z\s]*$/; // Regular expression to allow only letters and spaces
                  const yesorno = regex.test(e.target.value);
                  if (yesorno) {
                    changeUserDetails(e);
                  }
                }}
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
              <select
                style={{
                  fontSize: ".9rem",
                  padding: ".2% 2%",
                  width: "11%",
                }}
                name="state"
                id="state"
                type="text"
                value={userDetails.state}
                onChange={changeUserDetails}
              >
                <option value="">Select</option>
                {indianStates.map((each) => (
                  <option value={each}>{each}</option>
                ))}
              </select>
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
              {!userDetails.email.endsWith("@gmail.com") && (
                <p
                  style={{ color: "red", fontSize: ".7rem", marginTop: ".5%" }}
                >
                  *Please Enter A Valid Email
                </p>
              )}
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                name="mobileNumber"
                id="mobileNumber"
                type="number"
                value={userDetails.mobileNumber}
                onChange={(e) => {
                  const regex = /^[a-zA-Z0-9\s]*$/; // Regular expression to allow alphanumeric characters and spaces only
                  const isValidInput = regex.test(e.target.value);

                  if (isValidInput) {
                    changeUserDetails(e);
                  }
                }}
              />
              {`${userDetails.mobileNumber}`.length !== 10 && (
                <p
                  style={{ color: "red", fontSize: ".7rem", marginTop: ".5%" }}
                >
                  *Please Enter A Valid Number
                </p>
              )}
            </div>
            {/* <div>
              <label htmlFor="avatar">Avatar</label>
              <input name="image" id="avatar" type="file" />
            </div> */}
          </form>
          <button
            onClick={() => {
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
