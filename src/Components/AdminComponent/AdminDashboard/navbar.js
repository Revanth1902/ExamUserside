import React from "react";
import "./navbar.css";

import { useHistory } from "react-router-dom";

const Navba = () => {
  const history = useHistory();
  const deleteCookie = (cookieName) => {
    document.cookie =
      cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const handleLogout = () => {
    deleteCookie("jwt_AdminToken");
    deleteCookie("jwt_AdminId");
    history.replace("/AdminLogin");
  };
  return (
    <div className="Navbaring">
      <h1>Admin Dashboard</h1>
      <button className="logoutbutton" type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Navba;
