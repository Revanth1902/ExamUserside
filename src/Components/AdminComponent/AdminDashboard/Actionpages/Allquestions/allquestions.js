// QuestionsPage.jsx
import React, { useState, useEffect, useDeferredValue } from "react";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";
import "./allquestions.css";
import Pagination from "./pagination";

const QuestionsPage = () => {
  const [updatedFormData, setUpdatedFormData] = useState({});
  const handlePageChange = (pageNumber) => {
    const validPageNumber = isNaN(pageNumber) ? 1 : pageNumber;

    setCurrentPage(validPageNumber);
    setLoading(true);

    fetchQuestionsData(validPageNumber);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(null);

  const [showUpdateContainer, setShowUpdateContainer] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedQuestionData, setSelectedQuestionData] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
    difficultyLevel: "",
  });

  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContainer, setShowContainer] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    difficultyLevel: "",
    categoryId: "",
    topicId: "",
    subtopicId: "",
    quizId: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    description: "",
    type: "",
  });
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [questionDetails, setQuestionDetails] = useState({});
  const [updateFormData, setupdateFormData] = useState({});
  const [mocks, setMocks] = useState([]);
  const [selectedMock, setSelectedMock] = useState("");

  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isUpdatingQuestion, setIsUpdatingQuestion] = useState(false);
  const [mockQuestionsCounts, setMockQuestionsCounts] = useState({});
  const [theCountOfMock, setTheCountOfMock] = useState(0);

  const [selectedMockTotalQuestions, setSelectedMockTotalQuestions] =
    useState(100);

  useEffect(() => {
    fetchQuestionsData(currentPage);
  }, [updateFormData]);

  console.log("Current Page:", currentPage);
  console.log("Total Pages:", totalPages);

  useEffect(() => {
    fetchDropdownData();
  }, [updateFormData]);

  useEffect(() => {
    fetchQuestionsData(currentPage);
  }, []);

  const fetchCount = async () => {
    const adminToken = getAdminTokenFromCookie();
    try {
      const response = await fetch(
        `https://exam-back-end-2.vercel.app/admin/getQuestionsByMockId/${selectedMock}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      // Assuming your API response has a property named 'count'
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching count:", error);
      // Handle error, show a message, etc.
    }
  };

  useEffect(() => {
    // Check if a mock is selected before making the API request
    if (selectedMock) {
      fetchCount();
    }
  }, [selectedMock]);
  console.log("selectedmockidea", selectedMock.count);
  const handleUpdate = (question) => {
    setShowUpdateContainer(true);
    setSelectedQuestion(question);
    console.log("the question data", question._id);

    setUpdatedFormData({
      questionid: question._id,
      selectedYear: question.selectedYear,
      type: question.type,
      description: question.description,
      selectedCategory: question.categoryId._id,
      selectedTopic: question.topicId._id,
      selectedSubtopic: question.subtopicId._id,
      selectedQuiz: question.quizId._id,
      selectedMock: question.mockId._id,
      question: question.question,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      answer: question.answer,
      difficultyLevel: question.difficultyLevel,
    });
  };

  const getAdminIdFromCookie = () => {
    const cookieName = "jwt_AdminId";
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${cookieName}=`)) {
        // Extract the adminId value from the cookie
        const adminId = cookie.substring(cookieName.length + 1);
        return adminId;
      }
    }

    // Return a default value or handle the case where the cookie is not found
    return null;
  };
  const getAdminTokenFromCookie = () => {
    const cookieName = "jwt_AdminToken";
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${cookieName}=`)) {
        // Extract the token value from the cookie
        return cookie.substring(cookieName.length + 1);
      }
    }

    // Return a default value or handle the case where the cookie is not found
    return null;
  };
  const handleCancelUpdate = () => {
    setShowUpdateContainer(false);
    setSelectedQuestion(null);
  };
  console.log("thetestifformdata", selectedCategory);
  const handleUpdateSubmit = () => {
    const dataToSend = {
      ...updatedFormData,
      categoryId: updatedFormData.selectedCategory,
      topicId: updatedFormData.selectedTopic,
      subtopicId: updatedFormData.selectedSubtopic,
      quizId: updatedFormData.selectedQuiz,
    };
    if (selectedMock !== "") {
      dataToSend.mockId = selectedMock;
    }

    if (updatedFormData.mockId !== "") {
      dataToSend.mockId = updatedFormData.mockId;
    }

    // Set loading state to true
    setIsUpdatingQuestion(true);
    const adminToken = getAdminTokenFromCookie();
    const adminId = getAdminIdFromCookie();

    fetch(
      `https://exam-back-end-2.vercel.app/admin/updateQuestions/${updatedFormData.questionid}/${adminId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Question updated successfully:", data);
        toast.success("Question updated successfully");

        setTimeout(() => {
          handleCancelUpdate();
          fetchQuestionsData(currentPage);
          // Set loading state to false after successful update
          setIsUpdatingQuestion(false);
        }, 300);
      })
      .catch((error) => {
        console.error("Error updating question:", error);
        toast.error("Error updating question. Please try again.");

        // Set loading state to false on error
        setIsUpdatingQuestion(false);
      });

    setQuestionsData((prevData) =>
      prevData.map((question) =>
        question._id === updatedFormData.questionid
          ? { ...question, ...dataToSend }
          : question
      )
    );

    setSelectedQuestionData(null);
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;

    setSelectedCategory(value);
    setSelectedTopic("");
    setSelectedSubtopic("");
    setSelectedQuiz("");
  };
  console.log("hello", selectedMock._id);

  const handleTopicChange = (e) => {
    const { value } = e.target;
    setSelectedTopic(value);
    setSelectedSubtopic("");
    setSelectedQuiz("");
  };

  const handleSubtopicChange = (e) => {
    const { value } = e.target;
    setSelectedSubtopic(value);
    setSelectedQuiz("");
  };

  const handleQuizChange = (e) => {
    const { value } = e.target;
    setSelectedQuiz(value);
  };

  const fetchQuestionsData = (pageNumber) => {
    fetch(
      `https://exam-back-end-2.vercel.app/admin/getAllQuestions?page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        setQuestionsData(data.data);
        setTotalPages(data.totalPages);
        setCurrentPage(pageNumber);

        setLoading(false);

        const detailsMap = {};
        data.data.forEach((question) => {
          detailsMap[question._id] = question;
        });

        setQuestionDetails(detailsMap);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions data:", error);
        setLoading(false);
      });
  };

  const fetchDropdownData = () => {
    const baseApi = "https://exam-back-end-2.vercel.app/admin/";

    // Fetch categories, topics, subtopics, quizzes, and mocks
    // (Assuming setCategories, setTopics, setSubtopics, setQuizzes, and setMocks are state setters)
    Promise.all([
      fetch(`${baseApi}getAllCategory`).then((response) => response.json()),
      fetch(`${baseApi}getAllTopics`).then((response) => response.json()),
      fetch(`${baseApi}getAllSubTopics`).then((response) => response.json()),
      fetch(`${baseApi}getAllQuizName`).then((response) => response.json()),
      fetch(`${baseApi}getAllMocks`).then((response) => response.json()),
    ])
      .then(([categories, topics, subtopics, quizzes, mocks]) => {
        setCategories(categories.data);
        setTopics(topics.data);
        setSubtopics(subtopics.data);
        setQuizzes(quizzes.data);
        setMocks(mocks.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleAddComponent = () => {
    setShowContainer(true);
  };

  const handleContainerClose = () => {
    setShowContainer(false);
  };

  const handleChange = (e, isUpdated = false) => {
    const { name, value } = e.target;

    if (isUpdated) {
      setUpdatedFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (name === "type" || name === "selectedYear") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        selectedYear:
          value === "previousYear" && !formData.selectedYear
            ? "Please select a year for the Previous Year option"
            : "",
      }));
    }
  };
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoryId") {
      setUpdatedFormData((prevData) => ({
        ...prevData,
        selectedCategory: value,
        selectedTopic: "",
        selectedSubtopic: "",
        selectedQuiz: "",
        selectedMock: "",
      }));
    } else if (name === "topicId") {
      setUpdatedFormData((prevData) => ({
        ...prevData,
        selectedTopic: value,
        selectedSubtopic: "",
        selectedQuiz: "",
        selectedMock: "",
      }));
    } else if (name === "subtopicId") {
      setUpdatedFormData((prevData) => ({
        ...prevData,
        selectedSubtopic: value,
        selectedQuiz: "", // Reset selectedQuiz when subtopic changes
        selectedMock: "", // Reset selectedMock when subtopic changes
      }));
    } else if (name === "quizId") {
      setUpdatedFormData((prevData) => ({
        ...prevData,
        selectedQuiz: value,
        selectedMock: "",
      }));
    } else if (name === "mockId") {
      setUpdatedFormData((prevData) => ({
        ...prevData,
        selectedMock: value,
      }));
    } else {
      setUpdatedFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const capitalizeFirstLetter = (string) => {
    if (string === undefined || string === null) {
      return "";
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setIsAddingQuestion(true);

      const submitButton = document.querySelector(".submitbutton");
      submitButton.setAttribute("disabled", "true");

      const dataToSend = {
        ...formData,
        categoryId: selectedCategory,
        topicId: selectedTopic,
        subtopicId: selectedSubtopic,
        quizId: selectedQuiz,
        mockId: selectedMock,
      };

      const adminToken = getAdminTokenFromCookie();
      const adminId = getAdminIdFromCookie();

      const totalQuestionsCount = theCountOfMock;
      const actualTotalAllowedQuestions = selectedMockTotalQuestions;

      const errors = {};

      // Check if the total questions count exceeds the allowed limit
      if (totalQuestionsCount >= actualTotalAllowedQuestions) {
        errors.mockFilled =
          "Mock is filled. Please choose another mock or delete some questions.";

        setValidationErrors(errors);
        submitButton.removeAttribute("disabled");

        // Set loading state to false on validation errors
        setIsAddingQuestion(false);
      } else {
        // If count is within the allowed limit, proceed to add the question
        const response = await fetch(
          `https://exam-back-end-2.vercel.app/admin/createQuestions/${adminId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify(dataToSend),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Question added successfully:", responseData);
        toast.success("Question added successfully");

        // Re-enable the button after successful submission
        submitButton.removeAttribute("disabled");

        // Clear validation errors
        setValidationErrors({});

        setTimeout(() => {
          setIsAddingQuestion(false);
          handleContainerClose();
          fetchQuestionsData(currentPage);
        }, 300);
      }
    } catch (error) {
      console.error("Error adding question:", error);

      toast.error("Error adding question. Please try again.");

      setIsAddingQuestion(false);
    }
  };

  const handleDelete = (question) => {
    const { _id } = question;
    const adminToken = getAdminTokenFromCookie();
    const adminId = getAdminIdFromCookie();

    fetch(
      `https://exam-back-end-2.vercel.app/admin/deleteQuestion/${_id}/${adminId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Question deleted successfully:", data);
        toast.success("Question deleted successfully");
        fetchQuestionsData(currentPage);
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
        toast.error("Error deleting question. Please try again.");
      });
  };
  console.log(updatedFormData);
  return (
    <div className="questions-page-container">
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
      {loading ? (
        <div className="loading-container">
          <TailSpin height={"10%"} width={"10%"} color={"#FFFFFF"} />
        </div>
      ) : (
        <div className="toping">
          <h2>Questions Page</h2>

          <button
            type="button"
            className="addcomponentbutton"
            onClick={handleAddComponent}
          >
            Add Question
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
            <div className="containering" onClick={(e) => e.stopPropagation()}>
              <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="type">Select Type:</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="currentAffair">Current Affair</option>
                  <option value="previousYear">Previous Year</option>
                  <option value="misc">Misc</option>
                </select>
                {validationErrors.type && (
                  <span className="error">{validationErrors.type}</span>
                )}
                {formData.type === "previousYear" && (
                  <>
                    <label htmlFor="selectedYear">Select Year:</label>
                    <select
                      id="selectedYear"
                      name="selectedYear"
                      value={formData.selectedYear}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a year</option>
                      {/* get all years from 50 yaers */}
                      {Array.from({ length: 21 }, (_, index) => {
                        const year = new Date().getFullYear() - index;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                    {validationErrors.selectedYear && (
                      <span className="error">
                        {validationErrors.selectedYear}
                      </span>
                    )}
                  </>
                )}

                <label htmlFor="categoryId">Category:</label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="topicId">Topic:</label>
                <select
                  id="topicId"
                  name="topicId"
                  value={selectedTopic}
                  onChange={handleTopicChange}
                  required={selectedCategory !== ""}
                >
                  <option value="">Select a topic</option>
                  {topics
                    .filter(
                      (topic) => topic.categoryId._id === selectedCategory
                    )
                    .map((topic) => (
                      <option key={topic._id} value={topic._id}>
                        {topic.name}
                      </option>
                    ))}
                </select>
                <label htmlFor="subtopicId">Subtopic:</label>
                <select
                  id="subtopicId"
                  name="subtopicId"
                  value={selectedSubtopic}
                  onChange={handleSubtopicChange}
                  required={selectedTopic !== ""}
                >
                  <option value="">Select a subtopic</option>
                  {subtopics
                    .filter(
                      (subtopic) => subtopic.topicId._id === selectedTopic
                    )
                    .map((subtopic) => (
                      <option key={subtopic._id} value={subtopic._id}>
                        {subtopic.name}
                      </option>
                    ))}
                </select>
                <label htmlFor="quizId">Quiz:</label>
                <select
                  id="quizId"
                  name="quizId"
                  value={selectedQuiz}
                  onChange={handleQuizChange}
                  required={selectedSubtopic !== ""}
                >
                  <option value="">Select a quiz</option>
                  {quizzes.map((quiz) => (
                    <option key={quiz._id} value={quiz._id}>
                      {quiz.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="mockId">Mock:</label>
                <select
                  id="mockId"
                  name="mockId"
                  value={selectedMock}
                  onChange={(e) => setSelectedMock(e.target.value)}
                >
                  <option value="">Select a mock (optional)</option>
                  {mocks.map((mock) => (
                    <option key={mock._id} value={mock._id}>
                      {mock.testName}
                    </option>
                  ))}
                </select>
                {validationErrors.mockFilled && (
                  <span className="mockFilledErrorMessage">
                    {validationErrors.mockFilled}
                  </span>
                )}
                <div>
                  <p>
                    {count !== null
                      ? `Present Questions in Mock: ${count}`
                      : "Loading..."}
                  </p>
                  <p>
                    Selected Mock:{" "}
                    {selectedMock
                      ? mocks.find((mock) => mock._id === selectedMock)
                          ?.totalQuestions || "Not mentioned"
                      : "Not mentioned"}
                  </p>
                </div>

                {count !== null &&
                selectedMock &&
                count >=
                  mocks.find((mock) => mock._id === selectedMock)
                    ?.totalQuestions ? (
                  <span style={{ color: "red" }}>
                    The Selected Mock Is full{" "}
                  </span>
                ) : (
                  <>
                    <div>
                      {count !== null &&
                      selectedMock &&
                      count >=
                        mocks.find((mock) => mock._id === selectedMock)
                          ?.totalQuestions ? (
                        <span style={{ color: "red" }}>Mock is full</span>
                      ) : (
                        <span style={{ color: "green" }}>
                          You can add a question
                        </span>
                      )}
                    </div>

                    <label htmlFor="question">Question:</label>
                    <textarea
                      rows={5}
                      id="question"
                      name="question"
                      value={formData.question}
                      onChange={handleChange}
                      required
                    ></textarea>
                    {validationErrors.question && (
                      <span className="error">{validationErrors.question}</span>
                    )}
                    <label htmlFor="option1">Option 1:</label>
                    <input
                      type="text"
                      id="option1"
                      name="option1"
                      value={formData.option1}
                      onChange={handleChange}
                      required
                    />
                    {validationErrors.option1 && (
                      <span className="error">{validationErrors.option1}</span>
                    )}
                    <label htmlFor="option2">Option 2:</label>
                    <input
                      type="text"
                      id="option2"
                      name="option2"
                      value={formData.option2}
                      onChange={handleChange}
                      required
                    />
                    {validationErrors.option2 && (
                      <span className="error">{validationErrors.option2}</span>
                    )}
                    <label htmlFor="option3">Option 3:</label>
                    <input
                      type="text"
                      id="option3"
                      name="option3"
                      value={formData.option3}
                      onChange={handleChange}
                      required
                    />
                    {validationErrors.option3 && (
                      <span className="error">{validationErrors.option3}</span>
                    )}
                    <label htmlFor="option4">Option 4:</label>
                    <input
                      type="text"
                      id="option4"
                      name="option4"
                      value={formData.option4}
                      onChange={handleChange}
                      required
                    />
                    {validationErrors.option4 && (
                      <span className="error">{validationErrors.option4}</span>
                    )}
                    <label htmlFor="answer">Correct Answer:</label>
                    <select
                      id="answer"
                      name="answer"
                      value={formData.answer}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select correct answer</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                      <option value="option4">Option 4</option>
                    </select>
                    {validationErrors.correctAnswer && (
                      <span className="error">
                        {validationErrors.correctAnswer}
                      </span>
                    )}
                    <label htmlFor="description">Description:</label>
                    <textarea
                      rows={3}
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    {validationErrors.description && (
                      <span className="error">
                        {validationErrors.description}
                      </span>
                    )}
                    <label htmlFor="difficultyLevel">Difficulty Level:</label>
                    <select
                      id="difficultyLevel"
                      name="difficultyLevel"
                      value={formData.difficultyLevel}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select difficulty level</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="veryHard">Very Hard</option>
                    </select>
                    {validationErrors.difficultyLevel && (
                      <span className="error">
                        {validationErrors.difficultyLevel}
                      </span>
                    )}
                    <button
                      type="submit"
                      className="submitbutton"
                      disabled={isAddingQuestion}
                      onClick={handleSubmit}
                    >
                      {isAddingQuestion ? "Adding ....." : "Add Question"}
                    </button>
                  </>
                )}

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
          <TailSpin height={"10%"} width={"10%"} color={"#FFFFFF"} />
        </div>
      ) : (
        questionsData.length > 0 && (
          <ul className="QuestionsList">
            {questionsData.map((question) => (
              <>
                <li key={question._id} className="QuestionItem">
                  <div className="question-details">
                    <div id="detail">
                      <strong>ID:</strong> &nbsp;{question._id}
                    </div>
                    <div id="detail">
                      <strong>Type:</strong> &nbsp;
                      {capitalizeFirstLetter(question.type) || "Not Available"}
                    </div>
                    <div id="detail">
                      <strong>Year:</strong> &nbsp;
                      {question.selectedYear || "Not mentioned"}
                    </div>
                    <div id="detail">
                      <strong>Category:</strong> &nbsp;
                      {capitalizeFirstLetter(question.categoryId?.name) ||
                        "Not Available"}
                    </div>
                    <div id="detail">
                      <strong>Topic :</strong> &nbsp;
                      {capitalizeFirstLetter(question.topicId?.name) ||
                        "Not Available"}
                    </div>
                    <div id="detail">
                      <strong>Subtopic : </strong>&nbsp;
                      {capitalizeFirstLetter(question.subtopicId?.name) ||
                        "Not Available"}
                    </div>
                    <div id="detail">
                      <strong>Quiz :</strong> &nbsp;
                      {capitalizeFirstLetter(question.quizId?.name) ||
                        "Not Available"}
                    </div>
                    <div id="detail">
                      <strong> Mock :</strong> &nbsp;
                      {question.mockId
                        ? capitalizeFirstLetter(question.mockId.testName)
                        : "Not Available"}
                    </div>

                    <div id="detail">
                      <strong> Created At:</strong> &nbsp;
                      {new Date(question.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="rightsidedetails">
                    <div id="detail">
                      <span className="QuestionName">
                        <strong>Question:</strong>
                      </span>
                      &nbsp;
                      {question.question}
                    </div>
                    <div className="question-answer">
                      <strong>Difficulty Level :</strong> &nbsp;
                      {capitalizeFirstLetter(question.difficultyLevel)}
                    </div>
                    <div className="question-options">
                      <div id="option">Option 1: {question.option1}</div>
                      <div id="option">Option 2: {question.option2}</div>
                      <div id="option">Option 3: {question.option3}</div>
                      <div id="option">Option 4: {question.option4}</div>
                    </div>
                    <div className="question-answer">
                      <strong>Correct Answer:</strong> &nbsp;{question.answer}
                    </div>
                    {question.description && (
                      <div className="question-description">
                        <strong>Description:</strong> &nbsp;
                        {question.description}
                      </div>
                    )}
                  </div>
                  <div className="buttonsspace">
                    <button
                      type="submit"
                      className="delete-button"
                      onClick={() => {
                        handleUpdate(question);
                      }}
                    >
                      Update
                    </button>
                    <button
                      type="submit"
                      className="delete-button"
                      onClick={() => {
                        handleDelete(question);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </>
            ))}
          </ul>
        )
      )}

      {loading ? (
        <div className="loading-container">
          <TailSpin height={"10%"} width={"10%"} color={"#FFFFFF"} />
        </div>
      ) : (
        totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )
      )}

      {showUpdateContainer && selectedQuestion && (
        <div className="overlay" onClick={handleContainerClose}>
          <div className="update-details-container">
            <form
              className="update-details-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateSubmit(updatedFormData);
              }}
            >
              <label htmlFor="type">Select Type:</label>
              <select
                id="type"
                name="type"
                value={updatedFormData.type}
                onChange={handleUpdateChange}
                required
              >
                <option value="">Select</option>
                <option value="currentAffair">Current Affair</option>
                <option value="previousYear">Previous Year</option>
                <option value="misc">Misc</option>
              </select>
              {validationErrors.type && (
                <span className="error">{validationErrors.type}</span>
              )}
              {updatedFormData.type === "previousYear" && (
                <>
                  <label htmlFor="selectedYear">Select Year:</label>
                  <select
                    id="selectedYear"
                    name="selectedYear"
                    value={updatedFormData.selectedYear}
                    onChange={handleUpdateChange}
                    required
                  >
                    <option value="">Select a year</option>
                    {/* get all years from 50 years */}
                    {Array.from({ length: 21 }, (_, index) => {
                      const year = new Date().getFullYear() - index;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  {validationErrors.selectedYear && (
                    <span className="error">
                      {validationErrors.selectedYear}
                    </span>
                  )}
                </>
              )}

              <lable htmlFor="categoryId">Category:</lable>
              <select
                id="categoryId"
                name="categoryId"
                value={updatedFormData.selectedCategory}
                onChange={handleUpdateChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label htmlFor="topicId">Topic:</label>
              <select
                id="topicId"
                name="topicId"
                value={updatedFormData.selectedTopic}
                onChange={handleUpdateChange}
                required={selectedCategory !== ""}
              >
                <option value="">Select a topic</option>
                {topics.map(
                  (topic) =>
                    topic.categoryId._id ===
                      updatedFormData.selectedCategory && (
                      <option key={topic._id} value={topic._id}>
                        {topic.name}
                      </option>
                    )
                )}
              </select>

              <label htmlFor="subtopicId">Subtopic:</label>
              <select
                id="subtopicId"
                name="subtopicId"
                value={updatedFormData.selectedSubtopic}
                onChange={handleUpdateChange}
                required={selectedTopic !== ""}
              >
                <option value="">Select a subtopic</option>
                {subtopics.map(
                  (subtopic) =>
                    subtopic.topicId._id === updatedFormData.selectedTopic && (
                      <option key={subtopic._id} value={subtopic._id}>
                        {subtopic.name}
                      </option>
                    )
                )}
              </select>

              <label htmlFor="quizId">Quiz:</label>
              <select
                id="quizId"
                name="quizId"
                value={updatedFormData.selectedQuiz}
                onChange={handleUpdateChange}
                required={selectedSubtopic !== ""}
              >
                <option value="">Select a quiz</option>
                {quizzes.map((quiz) => (
                  <option key={quiz._id} value={quiz._id}>
                    {quiz.name}
                  </option>
                ))}
              </select>

              <label htmlFor="mockId">Mock:</label>
              <select
                id="mockId"
                name="mockId"
                value={updatedFormData.selectedMock}
                onChange={handleUpdateChange}
              >
                <option value="">Select a mock (optional)</option>
                {mocks.map((mock) => (
                  <option key={mock._id} value={mock._id}>
                    {mock.testName}
                  </option>
                ))}
              </select>
              {validationErrors.mockFilled && (
                <span className="error">{validationErrors.mockFilled}</span>
              )}

              <div>
                {count !== null && (
                  <p>Present Questions in Mock: {count} || Not Mentioned</p>
                )}
                <p>
                  Selected Mock:{" "}
                  {selectedMock
                    ? mocks.find((mock) => mock._id === selectedMock)
                        ?.totalQuestions || "Not mentioned"
                    : "Not mentioned"}
                </p>
              </div>

              {count !== null &&
              selectedMock &&
              count >=
                mocks.find((mock) => mock._id === selectedMock)
                  ?.totalQuestions ? (
                <span style={{ color: "red" }}>The Selected Mock Is full </span>
              ) : (
                <>
                  <div>
                    {count !== null &&
                    selectedMock &&
                    count >=
                      mocks.find((mock) => mock._id === selectedMock)
                        ?.totalQuestions ? (
                      <span style={{ color: "red" }}>Mock is full</span>
                    ) : (
                      <span style={{ color: "green" }}>
                        You can add a question
                      </span>
                    )}
                  </div>

                  <label htmlFor="question">Question:</label>
                  <textarea
                    rows={5}
                    id="question"
                    name="question"
                    value={updatedFormData.question}
                    onChange={handleUpdateChange}
                    required
                  ></textarea>
                  {validationErrors.question && (
                    <span className="error">{validationErrors.question}</span>
                  )}

                  <label htmlFor="option1">Option 1:</label>
                  <input
                    type="text"
                    id="option1"
                    name="option1"
                    value={updatedFormData.option1}
                    onChange={handleUpdateChange}
                    required
                  />
                  {validationErrors.option1 && (
                    <span className="error">{validationErrors.option1}</span>
                  )}

                  <label htmlFor="option2">Option 2:</label>
                  <input
                    type="text"
                    id="option2"
                    name="option2"
                    value={updatedFormData.option2}
                    onChange={handleUpdateChange}
                    required
                  />
                  {validationErrors.option2 && (
                    <span className="error">{validationErrors.option2}</span>
                  )}

                  <label htmlFor="option3">Option 3:</label>
                  <input
                    type="text"
                    id="option3"
                    name="option3"
                    value={updatedFormData.option3}
                    onChange={handleUpdateChange}
                    required
                  />
                  {validationErrors.option3 && (
                    <span className="error">{validationErrors.option3}</span>
                  )}

                  <label htmlFor="option4">Option 4:</label>
                  <input
                    type="text"
                    id="option4"
                    name="option4"
                    value={updatedFormData.option4}
                    onChange={handleUpdateChange}
                    required
                  />
                  {validationErrors.option4 && (
                    <span className="error">{validationErrors.option4}</span>
                  )}

                  <label htmlFor="answer">Correct Answer:</label>
                  <select
                    id="answer"
                    name="answer"
                    value={updatedFormData.answer}
                    onChange={handleUpdateChange}
                    required
                  >
                    <option value="">Select correct answer</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </select>
                  {validationErrors.correctAnswer && (
                    <span className="error">
                      {validationErrors.correctAnswer}
                    </span>
                  )}
                  <label htmlFor="description">Description:</label>
                  <textarea
                    rows={3}
                    id="description"
                    name="description"
                    value={updatedFormData.description}
                    onChange={handleUpdateChange}
                  />
                  {validationErrors.description && (
                    <span className="error">
                      {validationErrors.description}
                    </span>
                  )}
                  <label htmlFor="difficultyLevel">Difficulty Level:</label>
                  <select
                    id="difficultyLevel"
                    name="difficultyLevel"
                    value={updatedFormData.difficultyLevel}
                    onChange={handleUpdateChange}
                    required
                  >
                    <option value="">Select difficulty level</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="veryHard">Very Hard</option>
                  </select>
                  {validationErrors.difficultyLevel && (
                    <span className="error">
                      {validationErrors.difficultyLevel}
                    </span>
                  )}

                  <button
                    type="submit"
                    className="update-submit-button"
                    disabled={isUpdatingQuestion}
                    onClick={() => {
                      handleUpdateSubmit();
                    }}
                  >
                    {isUpdatingQuestion ? "Updating...." : "Update Question"}
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={handleCancelUpdate}
                className="update-cancel-button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCancelUpdate}
                className="close-button"
              >
                <AiOutlineClose />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
