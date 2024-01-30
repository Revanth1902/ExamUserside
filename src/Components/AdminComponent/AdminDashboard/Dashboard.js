import "./dashboard.css";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    if (Cookies.get("jwt_AdminToken") === undefined) {
      history.push("/AdminLogin");
    }
  });

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
