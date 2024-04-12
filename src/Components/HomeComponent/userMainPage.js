import { useState, useEffect } from "react";
import Profile from "./profile.js";
import Changedpassword from "./changepassword.js";
import Help from "./help.js";
import Settings from "./settings.js";
import { TailSpin } from "react-loader-spinner";
import { useHistory, useParams } from "react-router-dom";
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

const userProfileTabs = {
  myprofile: "myprofile",
  settings: "settings",
  changepassword: "changepassword",
  help: "help",
  logout: "logout",
};

const MyProfile = () => {
  const params = useParams();
  const history = useHistory();

  const [showLogOutModalBox, setShowLogOutModalBox] = useState(false);
  const [showDeleteModalBox, setShowDeleteModalBox] = useState(false);

  const [selectedSection, setSelectedSection] = useState(
    params.name || userProfileTabs.myprofile
  );
  const [load, setLoad] = useState(false);

  const [user, setUser] = useState({});

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userToken");

    if (isLoggedIn === undefined) {
      history.push("/StudentLogin");
    } else {
      getUser();
    }

    // Check if the current route is the logout route
    if (params.name === userProfileTabs.logout) {
      handleLogout();
    }
  }, []);

  const getUserTokenFromCookie = () => {
    return localStorage.getItem("userToken") || null;
  };
  
  const getUser = async () => {
    setLoad(false);
    const userToken = getUserTokenFromCookie();
    try {
      const url = `https://exam-back-end-2.vercel.app/user/getUserByUserId/${localStorage.getItem(
        "jwt_userID"
      )}`;
      
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.status === 200) {
        setUser(res.data.data);
      }
      setLoad(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setShowLogOutModalBox(true);
  };

  const handleLogoutConfirmed = () => {
    Cookies.remove("jwt_firstName");
    Cookies.remove("jwt_lastName");
    Cookies.remove("jwt_userID");
    Cookies.remove("userToken");
    history.push("/");
  };

  const handleDeleteAccount = async () => {
    try {
      const userID = localStorage.getItem("jwt_userID");

      const userToken = getUserTokenFromCookie();
      const url = `https://exam-back-end-2.vercel.app/user/deleteUser/${userID}`;
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.status === 200) {
        Cookies.remove("jwt_userID");
        Cookies.remove("userToken");
        Cookies.remove("jwt_firstName");
        Cookies.remove("jwt_lastName");
        setShowDeleteModalBox(false);
        history.push("/");
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
        <div className="modal-logout">
          <h4>Are you sure you want to Log Out?</h4>
          <div className="modal-actions">
            <button onClick={() => setShowLogOutModalBox(false)}>Close</button>
            <button onClick={handleLogoutConfirmed}>Log Out</button>
          </div>
        </div>
      )}
      {showDeleteModalBox && (
        <div className="modal-delete">
          <div className="modal-content">
            <h4>Are you sure you want to delete your account?</h4>
            <div className="modal-actions">
              <button onClick={handleCancelDelete}>Cancel</button>
              <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          </div>
        </div>
      )}
      <div className="myprofile">
        <div className="side-bar-userProfile">
          <button
            onClick={() => {
              history.replace("/");
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
            {Object.values(userProfileTabs).map((tabName) => (
              <h6
                key={tabName}
                onClick={() => setSelectedSection(tabName)}
                className={
                  selectedSection === tabName && "select-profile-section"
                }
              >
                {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
              </h6>
            ))}
            <button onClick={handleLogout} type="button">
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
          {selectedSection === userProfileTabs.myprofile ? (
            <Profile />
          ) : selectedSection === userProfileTabs.changepassword ? (
            <Changedpassword />
          ) : selectedSection === userProfileTabs.help ? (
            <Help />
          ) : (
            selectedSection === userProfileTabs.settings && <Settings />
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

export default MyProfile;
