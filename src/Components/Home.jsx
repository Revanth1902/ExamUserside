import "./home.css";

import Navbar from "./HomeComponent/Navbar";
import Currentaffair from "./HomeSections/Currentaffair";
import CurrentAffairsMonthly from "./HomeSections/CurrentaffairsMonthly.jsx";
import Fullsizemocktest from "./HomeSections/Fullsizemocktest";
import Previousyearpapers from "./HomeSections/Previousyearpapers";
import Quizbycustsubject from "./HomeSections/Quizbycustsubject";
import Footer from "../Components/Footer.jsx";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const sections = {
  currentaffairsweekly: "currentaffairsweekly",
  currentaffairsmonthly: "currentaffairsmonthly",
  previousyearspapers: "previousyearspapers",
  customquiz: "customquiz",
  mocktest: "mocktest",
};

const Home = () => {
  const [handleSidebar, setSidebar] = useState(false);
  const [selectedSection, setSelectedSection] = useState(
    sections.currentaffairsweekly
  );

  return (
    <div className="home-component">
      <Navbar />
      <div className="main-content">
        <div className="side-bar">
          <h5
            onClick={() => {
              setSelectedSection(sections.currentaffairsweekly);
              setSidebar(!handleSidebar);
            }}
            className={
              selectedSection === "currentaffairsweekly"
                ? "selectedComponent"
                : "unselectedComponent"
            }
          >
            Weekly Current Affairs
          </h5>
          <h5
            onClick={() => {
              setSelectedSection(sections.currentaffairsmonthly);
              setSidebar(!handleSidebar);
            }}
            className={
              selectedSection === "currentaffairsmonthly"
                ? "selectedComponent"
                : "unselectedComponent"
            }
          >
            Monthly Current Affairs
          </h5>
          <h5
            onClick={() => {
              setSelectedSection(sections.previousyearspapers);
            }}
            className={
              selectedSection === "previousyearspapers"
                ? "selectedComponent"
                : "unselectedComponent"
            }
          >
            Previous Year Paper
          </h5>
          <h5
            onClick={() => {
              setSelectedSection(sections.customquiz);
            }}
            className={
              selectedSection === "customquiz"
                ? "selectedComponent"
                : "unselectedComponent"
            }
          >
            Custom Questions
          </h5>
          <h5
            onClick={() => {
              setSelectedSection(sections.mocktest);
            }}
            className={
              selectedSection === "mocktest"
                ? "selectedComponent"
                : "unselectedComponent"
            }
          >
            Mock Tests
          </h5>
        </div>
        {selectedSection === "currentaffairsweekly" ? (
          <Currentaffair />
        ) : selectedSection === "currentaffairsmonthly" ? (
          <CurrentAffairsMonthly />
        ) : selectedSection === "previousyearspapers" ? (
          <Previousyearpapers />
        ) : selectedSection === "customquiz" ? (
          <Quizbycustsubject />
        ) : (
          selectedSection === "mocktest" && <Fullsizemocktest />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
