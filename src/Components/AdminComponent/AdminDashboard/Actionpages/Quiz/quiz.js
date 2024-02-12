// QuizPage.jsx
import React, { useState, useEffect } from "react";
import "./quiz.css"; // Update with your actual CSS file
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";

const capitalizeFirstLetter = (string) => {
  if (typeof string !== "undefined" && string !== null) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  return "";
};

const QuizPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContainer, setShowContainer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    key: "",
  });

  useEffect(() => {
    getAllQuiz();
  }, []);

  const getAllQuiz = () => {
    setQuizData([]);
    fetch("https://exam-back-end-2.vercel.app/admin/getAllQuizName")
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data.data);
        setLoading(false);
        // Log the quiz data to the console
        console.log("Quiz Data:", data.data);
      })

      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      });
  };

  const handleAddComponent = () => {
    setShowContainer(true);
  };

  const handleContainerClose = () => {
    setShowContainer(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.key) {
      console.error("Quiz name, description, and key are required");
      return;
    }

    fetch("https://exam-back-end-2.vercel.app/admin/addQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Subtopic added successfully:", data);

        toast.success("Quiz Addeed Sucessfully");

        handleContainerClose();
        getAllQuiz();
      })
      .catch((error) => {
        console.error("Error adding Quiz:", error);

        toast.error("Error adding Quiz. Please try again.");
      });
  };

  const handleDelete = async (quizId) => {
    try {
      console.log("Deleting quiz with ID:", quizId);

      const response = await fetch(
        `https://exam-back-end-2.vercel.app/admin/deleteQuiz/${quizId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();

        console.log("Quiz deleted successfully:", data);

        toast.success("Quiz deleted successfully");

        getAllQuiz();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="themain">
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
        theme="light"
      />
      <div className="QuizPage">
      {loading ? (
        <div className="loading-container">
          <TailSpin height={"10%"} width={"10%"} color={"#FFFFFF"} />
        </div>
      ) : (
        <div className="toping">
          <h2>Quiz Page</h2>
          <button
            type="button"
            className="addcomponentbutton"
            onClick={handleAddComponent}
          >
            Add Quiz
          </button>
        </div>
      )}
        {showContainer && (
          <>
            <div
              style={{
                position: "absolute",
                top: "10%",
                bottom: "0",
                left: "15%",
                right: "0",
                background: "#22222250",
              }}
            ></div>

            <div className="overlay" onClick={handleContainerClose}>
              <div
                className="containering"
                onClick={(e) => e.stopPropagation()}
              >

                <form className="form" onSubmit={handleSubmit}>

                  <label htmlFor="name">Quiz Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="description">Description:</label>
                  <textarea
                    rows={5}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>

                  <label htmlFor="key">Key:</label>
                  <input
                    type="text"
                    id="key"
                    name="key"
                    value={formData.key}
                    onChange={handleChange}
                    required
                  />

                  <button type="submit" className="submitbutton">
                    Add Quiz
                  </button>
                  <button
                    type="button"
                    onClick={handleContainerClose}
                    className="close-button"
                  >
                    <AiOutlineClose />
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
        {loading ? (
          <div className="loading-container">
            <TailSpin height={"10%"} width={"10%"} color={"#ffffff"} />
          </div>
        ) : (
          <ul className="QuizList">
            {quizData.map((quiz) => (
              <li key={quiz._id} className="QuizItem">
                <div className="theDetails">
                  <div id="detail">
                    <strong>Quiz ID:</strong> &nbsp;{quiz._id}
                  </div>
                  <div id="detail">
                    <span className="QuizName">
                      <strong>Name:</strong>
                    </span>
                    &nbsp;
                    {capitalizeFirstLetter(quiz.name)}
                  </div>
                  <div id="detail">
                    <strong> Created At:</strong> &nbsp;
                    {new Date(quiz.createdAt).toLocaleString()}
                  </div>
                </div>
                <div id="detail">
                  <strong> Key:</strong> &nbsp;
                  {quiz.key}
                </div>

                {quiz.description && (
                  <div className="description">
                    <strong>Description:</strong> &nbsp;{quiz.description}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(quiz._id)}
                  className="delete-button"
                >
                  Delete Quiz
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
