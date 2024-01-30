import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quizbycustsubject = () => {
  const [allCategory, setAllCategory] = useState(() => {
    return [];
  });
  const [allTopics, setAllTopics] = useState(() => {
    return [];
  });
  const [allSubtopics, setAllSubtopics] = useState(() => {
    return [];
  });

  const [allQuizName, setQuizName] = useState(() => {
    return [];
  });

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = () => {};

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
      <div className="customquiz">
        <h1>CustomQuiz</h1>
      </div>
    </>
  );
};

export default Quizbycustsubject;
