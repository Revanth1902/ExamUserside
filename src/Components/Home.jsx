import "./home.css";

import Navbar from "./HomeComponent/Navbar";
import Currentaffair from "./HomeSections/Currentaffair";
import CurrentAffairsMonthly from "./HomeSections/CurrentaffairsMonthly.jsx";
import Fullsizemocktest from "./HomeSections/Fullsizemocktest";
import Previousyearpapers from "./HomeSections/Previousyearpapers";
import Quizbycustsubject from "./HomeSections/Quizbycustsubject";


import { useEffect, useState } from "react";

const sections = {
  currentaffairsweekly: "currentaffairsweekly",
  previousyearspapers: "previousyearspapers",
  customquiz: "customquiz",
  mocktest: "mocktest",
};

const Home = () => {
  const [handleSidebar, setSidebar] = useState(false);

  const section = JSON.parse(localStorage.getItem("section"));

  console.log(section);

  const [handleSections, setSections] = useState(
    section !== null
      ? section === "weekly"
        ? "weekly"
        : section === "monthly"
        ? "monthly"
        : "weekly"
      : "weekly"
  );

  const [selectedSection, setSelectedSection] = useState(
    section !== null
      ? section === "weekly"
        ? sections.currentaffairsweekly
        : section === "monthly"
        ? sections.currentaffairsweekly
        : section === "prev"
        ? sections.previousyearspapers
        : section === "custom"
        ? sections.customquiz
        : section === "mock" && sections.mocktest
      : sections.currentaffairsweekly
  );
  localStorage.removeItem("section");

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
            Current Affairs
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
        {selectedSection === "currentaffairsweekly" &&
        handleSections === "weekly" ? (
          <Currentaffair />
        ) : selectedSection === "currentaffairsweekly" &&
          handleSections === "monthly" ? (
          <CurrentAffairsMonthly />
        ) : selectedSection === "previousyearspapers" ? (
          <Previousyearpapers />
        ) : selectedSection === "customquiz" ? (
          <Quizbycustsubject />
        ) : (
          selectedSection === "mocktest" && <Fullsizemocktest />
        )}
      </div>

    </div>
  );
};

export default Home;
