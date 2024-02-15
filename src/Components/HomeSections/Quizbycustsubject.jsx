import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

const Quizbycustsubject = () => {
  const [allCategory, setAllCategory] = useState(() => {
    return [];
  });
  const [selectedCategroy, setSelectCategory] = useState("");
  const [allTopics, setAllTopics] = useState(() => {
    return [];
  });
  const [selectedTopic, setSelectedTopic] = useState("");
  const [allSubtopics, setAllSubtopics] = useState(() => {
    return [];
  });
  const [selectedSubTopic, setSelectedSubTopic] = useState("");

  const [allQuizName, setQuizName] = useState(() => {
    return [];
  });

  const [remainingData, setData] = useState({
    difficultyLevel: "",
    type: "",
    quizId: "",
  });

  useEffect(() => {
    getAllCategory();
    getAllQuizName();
  }, []);

  useEffect(() => {
    if (selectedCategroy !== "") {
      getTopicsById();
    }
  }, [selectedCategroy]);

  useEffect(() => {
    if (selectedCategroy !== "") {
      getSubTopicsById();
    }
  }, [selectedTopic]);

  /**Fuctions to call api's */
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "https://exam-back-end.vercel.app/admin/getAllCategory"
      );

      if (res.status === 200) {
        setAllCategory(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllQuizName = async () => {
    try {
      const res = await axios.get(
        "https://exam-back-end.vercel.app/admin/getAllQuizName"
      );

      if (res.status === 200) {
        setQuizName(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTopicsById = async () => {
    try {
      const res = await axios.get(
        `https://exam-back-end.vercel.app/admin/getTopicsByCategoryId/${selectedCategroy}`
      );
      if (res.status === 200) {
        setAllTopics(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getSubTopicsById = async () => {
    try {
      const res = await axios.get(
        `https://exam-back-end.vercel.app/admin/getSubTopicsByTopicId/${selectedTopic}`
      );
      if (res.status === 200) {
        setAllSubtopics(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <h2 className="mock-head pb-4 text-center text-lg-start ">
          Custom <span className="badge bg-secondary">Quiz</span>
        </h2>
        <img src="/Quiz.jpg" alt="Quiz Image" />
        <div className="customize">
          <form>
            <div>
              <label htmlFor="category">Select Category : &nbsp;</label>
              <select
                style={{ textTransform: "capitalize" }}
                onChange={(e) => {
                  setSelectCategory(e.target.value);
                }}
                id="category"
              >
                <option value="">Select</option>
                {allCategory.map((each) => (
                  <option
                    value={each._id}
                    style={{ textTransform: "capitalize" }}
                    id={each._id}
                  >
                    {each.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedCategroy === "" && (
              <p
                style={{
                  margin: 0,
                  fontSize: ".8rem",
                  color: "red",
                  marginBottom: "-2%",
                }}
              >
                * required
              </p>
            )}
            <div>
              <label htmlFor="topics">Select Topic : &nbsp;</label>
              <select
                onClick={(e) => {
                  setSelectedTopic(e.target.value);
                }}
                id="topics"
              >
                <option value="">Select</option>
                {selectedCategroy !== "" &&
                  allTopics.map((each) => (
                    <option
                      value={each._id}
                      style={{ textTransform: "capitalize" }}
                      id={each._id}
                    >
                      {each.name}
                    </option>
                  ))}
              </select>
            </div>
            {selectedCategroy === "" ? (
              <p
                style={{
                  margin: 0,
                  fontSize: ".8rem",
                  color: "red",
                  marginBottom: "-2%",
                }}
              >
                * select category to get topics
              </p>
            ) : (
              selectedTopic === "" && (
                <p
                  style={{
                    margin: 0,
                    fontSize: ".8rem",
                    color: "red",
                    marginBottom: "-2%",
                  }}
                >
                  * required
                </p>
              )
            )}
            <div>
              <label htmlFor="topics">Select Sub Topic : &nbsp;</label>
              <select
                onClick={(e) => {
                  setSelectedSubTopic(e.target.value);
                }}
                id="topics"
              >
                <option value="">Select</option>
                {selectedCategroy !== "" &&
                  selectedTopic !== "" &&
                  allSubtopics.map((each) => (
                    <option
                      value={each._id}
                      style={{ textTransform: "capitalize" }}
                      id={each._id}
                    >
                      {each.name}
                    </option>
                  ))}
              </select>
            </div>
            {selectedTopic === "" && (
              <p
                style={{
                  margin: 0,
                  fontSize: ".8rem",
                  color: "red",
                  marginBottom: "-2%",
                }}
              >
                * select topic to get subtopics
              </p>
            )}
          </form>
          <form>
            <div>
              <label htmlFor="category">Difficulty Level : &nbsp;</label>
              <select
                onChange={(e) => {
                  setData({
                    ...remainingData,
                    difficultyLevel: e.target.value,
                  });
                }}
                id="category"
              >
                <option value="">Select</option>

                <option value="easy" style={{ textTransform: "capitalize" }}>
                  Easy
                </option>
                <option value="medium" style={{ textTransform: "capitalize" }}>
                  Medium
                </option>
                <option value="hard" style={{ textTransform: "capitalize" }}>
                  Hard
                </option>
                <option
                  value="veryHard"
                  style={{ textTransform: "capitalize" }}
                >
                  Very Hard
                </option>
              </select>
            </div>
          </form>
          {
            <button
              onClick={() => {
                if (Cookies.get("userToken") === undefined) {
                  window.location.href = "/StudentLogin";
                } else if (selectedCategroy === "") {
                  toast("Please Select Category");
                } else if (selectedTopic === "") {
                  toast("Please Select Topic");
                } else {
                  window.location.href = `/mcqcustom?data=${encodeURIComponent(
                    JSON.stringify({
                      difficultyLevel: remainingData.difficultyLevel,
                      categoryId: selectedCategroy,
                      topicId: selectedTopic,
                      subtopicId: selectedSubTopic,
                    })
                  )}`;
                }
              }}
              type="button"
            >
              Start
            </button>
          }
        </div>
      </div>
    </>
  );
};

export default Quizbycustsubject;
