import { useState, useEffect } from "react";

import Profile from "./profile.js";
import Changedpassword from "./changepassword.js";
import Help from "./help.js";
import Settings from "./settings.js";
import { TailSpin } from "react-loader-spinner";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min.js";

import Cookies from "js-cookie";

import axios from "axios";

const colors = [
  "black",
  "darkblue",
  "darkgreen",
  "darkred",
  "darkpurple",
  "darkorange",
  "darkpink",
  "darkbrown",
  "darkcyan",
  "darkgray",
];

const userProfileTabs = [
  {
    myprofile: "myprofile",
    settings: "settings",
    changepassword: "changepassword",
    help: "help",
  },
];

const MyProflie = () => {
  const params = useParams();
  const history = useHistory();

  const [showLogOutModalBox, setShowLogOutModalBox] = useState(false);
  const [showDeleteModalBox, setShowDeleteModalBox] = useState(false);

  const [selectedSection, setSelectedSection] = useState(
    params.name === "myprofile"
      ? userProfileTabs[0].myprofile
      : params.name === "changepassword"
      ? userProfileTabs[0].changepassword
      : params.name === "help"
      ? userProfileTabs[0].help
      : userProfileTabs[0].settings
  );
  const [load, setLoad] = useState(false);

  const [user, setUser] = useState(() => {
    return [];
  });

  useEffect(() => {
    const isLoggedIn = Cookies.get("userToken");
    if (isLoggedIn === undefined) {
      window.location.href = "/StudentLogin";
    } else {
      getUser();
    }
  }, []);
  const getUserTokenFromCookie = () => {
    const cookieName = "userToken"; // Update with the correct cookie name
    return Cookies.get(cookieName) || null;
  };
  const getUser = async () => {
    setLoad(false);
    const userToken = getUserTokenFromCookie();
    try {
      const url = `https://exam-back-end-2.vercel.app/user/getUserByUserId/${Cookies.get(
        "jwt_userID"
      )}`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(res.data.data);
      if (res.status === 200) {
        setUser({
          ...res.data.data,
        });
      }
      setLoad(true);
    } catch (error) {
      console.error(error);
    }
  };

  const LogOutModalBox = () => {
    return (
      <>
        <div
          style={{
            backgroundColor: "#22222270",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
        <div className="modal-logout">
          <h4>Are you sure to Log Out?</h4>
          <div>
            <button
              onClick={() => {
                setShowLogOutModalBox(false);
              }}
              type="button"
            >
              Close
            </button>
            <button
              onClick={() => {
                Cookies.remove("jwt_firstName");
                Cookies.remove("jwt_lastName");
                Cookies.remove("jwt_userID");
                Cookies.remove("userToken");
                window.location.href = "/";
              }}
              type="button"
            >
              Log Out
            </button>
          </div>
        </div>
      </>
    );
  };
  const DeleteAccountModalBox = ({ onDelete, onCancel }) => {
    return (
      <>
        <div
          style={{
            backgroundColor: "#22222270",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
        <div className="modal-delete">
          <h4>Are you sure you want to delete your account?</h4>
          <div>
            <button onClick={onCancel} type="button">
              Cancel
            </button>
            <button onClick={handleDeleteAccount} type="button">
              Delete Account
            </button>
          </div>
        </div>
      </>
    );
  };
  const handleDeleteAccount = async () => {
    try {
      const userID = Cookies.get("jwt_userID");

      const userToken = getUserTokenFromCookie();
      const url = `https://exam-back-end-2.vercel.app/user/deleteUser/${userID}`;

      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.status === 200) {
        console.log("Account deleted!");

        // Remove cookies after successful account deletion
        Cookies.remove("jwt_userID");
        Cookies.remove("userToken");
        Cookies.remove("jwt_firstName");
        Cookies.remove("jwt_lastName");

        setShowDeleteModalBox(false);

        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error deleting account", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModalBox(false);
  };
  return load ? (
    <>
      {showLogOutModalBox && (
        <LogOutModalBox onClose={() => setShowLogOutModalBox(false)} />
      )}
      {showDeleteModalBox && (
        <DeleteAccountModalBox
          onDelete={handleDeleteAccount}
          onCancel={handleCancelDelete}
        />
      )}
      <div className="myprofile">
        <div className="side-bar-userProfile">
          <button
            onClick={() => {
              history.push("/");
            }}
            type="button"
            style={{
              fontSize: "1.2rem",
              border: 0,
              background: "transparent",
              marginBottom: "1rem",
            }}
          >
            ❮
          </button>
          <div
            className="profilepic"
            style={{
              backgroundColor: `${
                colors[Math.ceil(Math.random(colors.length))]
              }`,
            }}
          >
            <p style={{ margin: 0 }}>
              {`${user.firstName}`[0]}
              {`${user.lastName}`[0]}
            </p>
          </div>
          <h5>
            {user.firstName} {user.lastName}
          </h5>
          <h6>{user.email}</h6>
          <h6>{user.mobileNumber}</h6>
          <div className="profile-tabs">
            <h6
              onClick={() => {
                setSelectedSection(userProfileTabs[0].myprofile);
              }}
              className={
                selectedSection === userProfileTabs[0].myprofile &&
                "select-profile-section"
              }
            >
              My profile
            </h6>
            <h6
              onClick={() => {
                setSelectedSection(userProfileTabs[0].changepassword);
              }}
              className={
                selectedSection === userProfileTabs[0].changepassword &&
                "select-profile-section"
              }
            >
              Change Password
            </h6>
            <h6
              onClick={() => {
                setSelectedSection(userProfileTabs[0].help);
              }}
              className={
                selectedSection === userProfileTabs[0].help &&
                "select-profile-section"
              }
            >
              Help
            </h6>
            <h6
              onClick={() => {
                setSelectedSection(userProfileTabs[0].settings);
              }}
              className={
                selectedSection === userProfileTabs[0].settings &&
                "select-profile-section"
              }
            >
              Settings
            </h6>
            <button
              onClick={() => {
                setShowLogOutModalBox(true);
              }}
              type="button"
            >
              Log Out
            </button>
            <button
              onClick={() => {
                setShowDeleteModalBox(true);
              }}
              type="button"
            >
              Delete Account
            </button>
          </div>
        </div>

        <div className="main-page-myprofile">
          {selectedSection === userProfileTabs[0].myprofile ? (
            <Profile />
          ) : selectedSection === userProfileTabs[0].changepassword ? (
            <Changedpassword />
          ) : selectedSection === userProfileTabs[0].help ? (
            <Help />
          ) : (
            selectedSection === userProfileTabs[0].settings && <Settings />
          )}
        </div>
      </div>
    </>
  ) : (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="myprofile"
    >
      <TailSpin color="darkblue" />
    </div>
  );
};

export default MyProflie;
