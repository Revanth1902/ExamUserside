import "./dashboard.css";
import Cookies from "js-cookie";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";

//all importing from Actionpages
import CategoryPage from "./Actionpages/Category/category";
import TopicsPage from "./Actionpages/Topicspage/topics";
import SubtopicsPage from "./Actionpages/SubTopics/subtopics";
import QuizPage from "./Actionpages/Quiz/quiz";
import UsersPage from "./Actionpages/Users/users";
import MockPage from "./Actionpages/Mock/mock";
import AllQuestionsPage from "./Actionpages/Allquestions/allquestions";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("category");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const renderSelectedPage = () => {
    switch (selectedCategory) {
      case "category":
        return <CategoryPage />;
      case "topics":
        return <TopicsPage />;
      case "subtopics":
        return <SubtopicsPage />;
      case "quiz":
        return <QuizPage />;
      case "users":
        return <UsersPage />;
      case "mock":
        return <MockPage />;
      case "allquestions":
        return <AllQuestionsPage />;
      default:
        return null;
    }
  };

  const history = useHistory();

  useEffect(() => {
    if (Cookies.get("jwt_AdminToken") === undefined) {
      history.push("/AdminLogin");
    }
  });

  return (
    <div className="maining">
      <Navbar />
      <div className="thebody">
        <Sidebar
          selected={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <div className="body">{renderSelectedPage()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
