// Sidebar.jsx
import React from "react";
import "./sidebar.css";

const categories = [
  "category",
  "topics",
  "subtopics",
  "quiz",
  "users",
  "mock",
  "allquestions",
];

const Sidebar = ({ selected, onCategoryChange }) => {
  return (
    <div className="sidebar">
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={`menu-item ${selected === category ? "category" : ""}`}
            onClick={() => onCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
