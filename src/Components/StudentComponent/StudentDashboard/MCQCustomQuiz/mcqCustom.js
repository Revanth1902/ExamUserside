import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";

import { Hourglass } from "react-loader-spinner";

import {
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

import axios from "axios";

import "./mcqCustom.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MCQCustom = () => {
  const params = useParams();
  const location = useLocation();

  const [currentQuestion, setCurrent] = useState("");
  const [mcqquestions, setQuestions] = useState(() => {
    return [];
  });
  const [allQuestion, setAllQuestions] = useState(() => {
    return [];
  });
  const [submitted, setSubmitted] = useState("");
  const [showResults, setResults] = useState(false);
  const [showAns, setshowAns] = useState(false);
  const [totalCount, setCount] = useState(0);

  const [totalQuestions, setTotalQuestion] = useState(0);
  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(false);
  const [page, setPage] = useState(1);

  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("section", JSON.stringify("custom"));
    const evTypep = window.performance.getEntriesByType("navigation")[0].type;
    if (evTypep === "reload" || evTypep === "back_forward") {
      window.location.replace("/");
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const objectString = queryParams.get("data");
    if (objectString) {
      const myObject = JSON.parse(decodeURIComponent(objectString));
      getCustomQuestions(myObject);
    }
  }, [location.search, page]);
  const getUserTokenFromCookie = () => {
    const cookieName = "userToken";
    return localStorage.getItem(cookieName) || null;
  };

  const getCustomQuestions = async (myObject) => {
    setLoad2(false);
    const userToken = getUserTokenFromCookie();
    try {
      const filterdObj = {};

      for (let each in myObject) {
        if (myObject[each] !== "") {
          filterdObj[each] = myObject[each];
        }
      }

      const url = `https://exam-back-end.vercel.app/admin/getQuestionsByAllFilters?difficultyLevel=${
        filterdObj.difficultyLevel !== undefined
          ? filterdObj.difficultyLevel
          : ""
      }&categoryId=${
        filterdObj.categoryId !== undefined ? filterdObj.categoryId : ""
      }&topicId=${
        filterdObj.topicId !== undefined ? filterdObj.topicId : ""
      }&subtopicId=${
        filterdObj.subtopicId !== undefined ? filterdObj.subtopicId : ""
      }`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.status === 200) {
        let count = 0;
        let updatedArr = res.data.result.map((each) => {
          count = count + 1;
          return {
            ...each,
            no: count,
            answered: "",
          };
        });
        if (updatedArr.length === 0) {
          toast("No Questions Available");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else if (mcqquestions.length === 0) {
          setCount(updatedArr.length);
          setQuestions(updatedArr);
          setCurrent(res.data.currentPage);
          setTotalQuestion(res.data.totalPages);
          setLoad(false);
          setLoad2(true);
        } else {
          let newUpdatedArr = [];
          let matched = false;
          for (let question of updatedArr) {
            for (let each of allQuestion) {
              if (question._id === each._id) {
                newUpdatedArr.push(each);
                matched = true;
                break;
              }
            }
            if (matched === false) {
              newUpdatedArr.push(question);
            } else {
              matched = false;
            }
          }
          new setQuestions(newUpdatedArr);
          setCurrent(res.data.currentPage);
          setTotalQuestion(res.data.totalPages);
          setLoad(false);
          setLoad2(true);
        }
      }
      const element = document.getElementById("scrollToStart");
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } catch (error) {
      toast(error);
      window.location.href = "/";
    }
  };
  const Results = () => {
    const [data, setData] = useState([
      { name: "Correct", value: 0 },
      { name: "Wrong", value: 0 },
    ]);
    useEffect(() => {
      const updatedData = allQuestion.reduce(
        (acc, each) => {
          if (each.answered === each[each.answer]) {
            acc[0].value += 1; // Increment 'Correct' value
          } else {
            acc[1].value += 1; // Increment 'Wrong' value
          }
          return acc;
        },
        [...data] // Use a copy of the existing data to ensure immutability
      );
      updatedData.push({ name: "Attempted", value: allQuestion.length });
      updatedData.push({
        name: "Not Attempted",
        value: totalCount - allQuestion.length,
      });
      setData(updatedData);
      // addingResultsToLeaderBoard(data[0].value * 2 - data[0].value * 0.5);
    }, []);
    // const addingResultsToLeaderBoard = async (marks) => {
    //   try {
    //     const url = `https://exam-back-end.vercel.appadmin/createLeaderBoard`;
    //     const reqConfigure = {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         mockId: params.id,
    //         userId: localStorage.getItem("jwt_userID"),
    //         totalMark: marks,
    //       }),
    //     };
    //     await fetch(url, reqConfigure);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    const COLORS = ["#00C49F", "#cc0000", "#FFBB28", "#598BAF"];
    return (
      <>
        <div className="submitBackground"></div>
        <div className="results">
          <h1>Results</h1>
          <ResponsiveContainer width="50%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="results-sub">
            {data.map((each) => (
              <p>
                {each.name === "Correct" ? (
                  <span style={{ backgroundColor: COLORS[0] }}></span>
                ) : each.name === "Wrong" ? (
                  <span style={{ backgroundColor: COLORS[1] }}></span>
                ) : each.name === "Attempted" ? (
                  <span style={{ backgroundColor: COLORS[2] }}></span>
                ) : (
                  each.name === "Not Attempted" && (
                    <span style={{ backgroundColor: COLORS[3] }}></span>
                  )
                )}
                {each.name} - {each.value}
              </p>
            ))}
            <p style={{ fontWeight: "bolder", marginTop: "5%" }}>
              Total Marks - {totalCount * 2}&nbsp; &nbsp; ObtainedMarks - &nbsp;
              {data[0].value * 2 - data[1].value * 0.5}
            </p>
            <button
              onClick={() => {
                history.replace("/");
              }}
              className="cls"
              type="button"
            >
              Go To Home Page
            </button>
            <button
              onClick={() => {
                setResults(false);
                setshowAns(true);
              }}
              className="leaderboard"
              type="button"
              style={{ marginLeft: "3%" }}
            >
              Check Answers
            </button>
          </div>
        </div>
      </>
    );
  };

  const Ans = () => {
    return (
      <>
        <div className="submitBackground"></div>
        <div
          className="results"
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {allQuestion.map((each) => (
            <div style={{ position: "relative" }}>
              <h3 style={{ marginBottom: "2%" }}>
                Q{each.qno}.&nbsp;{each.question} &nbsp;
              </h3>
              <span
                style={{
                  backgroundColor:
                    each.option1 === each.answered
                      ? each.answered === each[each.answer]
                        ? "#00FF0050"
                        : "#FF000050"
                      : each.option1 === each[each.answer]
                      ? "#00FF0050"
                      : "transparent",
                  marginLeft: "2%",
                  padding: "0% 2%",
                }}
              >
                I.&nbsp;{each.option1}
              </span>
              <br />
              <span
                style={{
                  backgroundColor:
                    each.option2 === each.answered
                      ? each.answered === each[each.answer]
                        ? "#00FF0050"
                        : "#FF000050"
                      : each.option2 === each[each.answer]
                      ? "#00FF0050"
                      : "transparent",
                  marginLeft: "2%",
                  padding: "0% 2%",
                }}
              >
                II.&nbsp;{each.option2}
              </span>
              <br />
              <span
                style={{
                  backgroundColor:
                    each.option3 === each.answered
                      ? each.answered === each[each.answer]
                        ? "#00FF0050"
                        : "#FF000050"
                      : each.option3 === each[each.answer]
                      ? "#00FF0050"
                      : "transparent",
                  marginLeft: "2%",
                  padding: "0% 2%",
                }}
              >
                III.&nbsp;{each.option3}
              </span>
              <br />
              <span
                style={{
                  backgroundColor:
                    each.option4 === each.answered
                      ? each.answered === each[each.answer]
                        ? "#00FF0050"
                        : "#FF000050"
                      : each.option4 === each[each.answer]
                      ? "#00FF0050"
                      : "transparent",
                  marginLeft: "2%",
                  padding: "0% 2%",
                }}
              >
                IV.&nbsp;{each.option4}
              </span>
              <br />
              <p
                style={{
                  marginTop: "2%",
                  marginBottom: "2%",
                  paddingLeft: "2%",
                }}
              >
                Explanation : {each.description}
              </p>
            </div>
          ))}
          <button
            onClick={() => {
              setResults(true);
              setshowAns(false);
            }}
            style={{
              backgroundColor: "#212529",
              color: "white",
              paddingTop: "0%",
              paddingBottom: ".3%",
              paddingLeft: "1%",
              paddingRight: "1%",
              borderRadius: ".2rem",
              width: "10%",
              marginLeft: "85%",
              border: 0,
            }}
            type="button"
          >
            Close
          </button>
        </div>
      </>
    );
  };

  const SubmitExam = () => {
    return (
      <>
        <div className="submitBackground"></div>
        <div className="submitExam">
          <h1 style={{ fontSize: "3rem" }}>{submitted}</h1>
          <button
            onClick={() => {
              setResults(true);
            }}
            className="submit"
            type="button"
          >
            Submit
          </button>
          <button
            id="close"
            className="close"
            onClick={() => {
              setSubmitted("");
            }}
            type="button"
          >
            Close
          </button>
        </div>
      </>
    );
  };
  const handleAns = (id, ans, ea) => {
    const answeredArr = mcqquestions.map((each) =>
      each._id === id ? { ...each, answered: ans } : each
    );
    let match = false;
    let changedArr = [];
    allQuestion.map((each) => {
      if (each._id === id) {
        changedArr.push({ ...each, answered: ans });
        match = true;
      } else {
        changedArr.push(each);
      }
    });
    setQuestions(answeredArr);
    setAllQuestions(
      match === true ? changedArr : [...changedArr, { ...ea, answered: ans }]
    );
  };
  return (
    <>
      {submitted !== "" && <SubmitExam />}
      {showResults === true ? <Results /> : showAns && <Ans />}

      <div id="scrollToStart">
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
      </div>

      {!load ? (
        <div className="mcq-con">
          <h1>Custom Quiz</h1>
          <button
            style={{
              position: "fixed",
              top: "5%",
              left: "90%",
              height: "10%",
              right: 0,
              width: "5%",
              padding: "1% 2%",
              background: "transparent",
              border: 0,
              color: "white",
            }}
            onClick={() => {
              history.replace("/");
            }}
            type="button"
          >
            X
          </button>

          {mcqquestions.length > 0 && (
            <div style={{ overflow: "hidden" }} className="questions-box">
              {!load2 && (
                <div
                  style={{
                    position: "absolute",
                    height: "110%",
                    width: "110%",
                    top: "-5%",
                    left: "-5%",
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#22222260",
                    zIndex: 5,
                  }}
                ></div>
              )}
              {mcqquestions.map((each) => (
                <div key={each._id}>
                  <h3>
                    Q{each.no}.&nbsp; {each.question}
                  </h3>

                  <div className="options">
                    <div>
                      <input
                        style={{ cursor: "pointer" }}
                        type="radio"
                        id="radio1"
                        name={each._id}
                        value={each.answered}
                        checked={each.answered === each.option1}
                        onChange={() => {
                          handleAns(each._id, each.option1, each);
                        }}
                      />
                      <p>{each.option1}</p>
                    </div>
                    <div>
                      <input
                        style={{ cursor: "pointer" }}
                        type="radio"
                        id="radio2"
                        name={each._id}
                        value={each.answered}
                        checked={each.answered === each.option2}
                        onChange={() => {
                          handleAns(each._id, each.option2, each);
                        }}
                      />
                      <p>{each.option2}</p>
                    </div>
                    <div>
                      <input
                        style={{ cursor: "pointer" }}
                        type="radio"
                        id="radio3"
                        name={each._id}
                        checked={each.answered === each.option3}
                        value={each.answered}
                        onChange={() => {
                          handleAns(each._id, each.option3, each);
                        }}
                      />
                      <p>{each.option3}</p>
                    </div>
                    <div>
                      <input
                        style={{ cursor: "pointer" }}
                        type="radio"
                        id="radio4"
                        name={each._id}
                        value={each.answered}
                        checked={each.answered === each.option4}
                        onChange={() => {
                          handleAns(each._id, each.option4, each);
                        }}
                      />
                      <p>{each.option4}</p>
                    </div>
                  </div>
                  {currentQuestion > 1 && load2 && (
                    <button
                      onClick={() => {
                        setPage(currentQuestion - 1);
                      }}
                      className="prev"
                      type="button"
                    >
                      « Prev
                    </button>
                  )}
                  {currentQuestion < totalQuestions && load2 && (
                    <button
                      onClick={() => {
                        setPage(currentQuestion + 1);
                      }}
                      className="next"
                      type="button"
                    >
                      Next »
                    </button>
                  )}
                  {currentQuestion === totalQuestions &&
                    allQuestion.length > 0 && (
                      <button
                        onClick={() => {
                          setSubmitted("Are you sure to submit ?");
                        }}
                        className="next"
                        type="button"
                        style={{ bottom: "0.5%" }}
                      >
                        Submit Exam
                      </button>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="mcq-con"
        >
          <Hourglass colors={["#ffffff", "#ffffff"]} />
        </div>
      )}
    </>
  );
};

export default MCQCustom;
