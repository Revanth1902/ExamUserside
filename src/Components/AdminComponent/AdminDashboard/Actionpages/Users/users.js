// Users.jsx
import React, { useState, useEffect } from "react";
import "./users.css";
import { TailSpin } from "react-loader-spinner";
const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://exam-back-end-2.vercel.app/admin/allUsersDetails")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status && Array.isArray(data.data)) {
          setUsersData(data.data);
        } else {
          console.error("Invalid data format. Expected an array.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="users-container">
      <h2>Users</h2>
      {loading ? (
        <div className="loading-container">
          <TailSpin height={"10%"} width={"10%"} color={"#ffffff"} />
        </div>
      ) : (
        <ul className="users-list">
          {Array.isArray(usersData) && usersData.length > 0 ? (
            usersData.map((user) => (
              <li key={user._id} className="user-item">
                <div className="user-details">
                  <div className="user-info">
                    <strong>First Name:</strong> {user.firstName}
                  </div>
                  <div className="user-info">
                    <strong>Last Name:</strong> {user.lastName}
                  </div>
                  <div className="user-info">
                    <strong>Gender:</strong> {user.gender}
                  </div>
                  <div className="user-info">
                    <strong>DOB:</strong> {user.dob}
                  </div>
                  <div className="user-info">
                    <strong>Mobile Number:</strong> {user.mobileNumber}
                  </div>
                  <div className="user-info">
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div className="user-info">
                    <strong>State:</strong> {user.state}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Users;
