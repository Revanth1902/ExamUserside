import { useEffect, useReducer, useState } from "react";
import "./mcq.css";

import Cookies from "js-cookie";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { Hourglass } from "react-loader-spinner";

import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

import axios from "axios";

const MCQ = () => {
  const params = useParams();

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

  const [timer, setTimer] = useState({
    minutes: String(params.time),
    seconds: "00",
  });
  const [totalQuestions, setTotalQuestion] = useState(0);

  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(false);

  const [page, setPage] = useState(1);
  const history = useHistory();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timer.minutes === "00" && timer.seconds === "00") {
        setSubmitted("Times Up");
        setTimeout(() => {
          clearTimeout(timerId);
          setResults(true);
        }, 1000);
      } else if (timer.seconds === "00") {
        if (timer.minutes <= "10") {
          setTimer({
            minutes: `0${String(parseInt(timer.minutes) - 1)}`,
            seconds: "60",
          });
        } else {
          setTimer({
            minutes: String(parseInt(timer.minutes) - 1),
            seconds: "60",
          });
        }
      } else {
        if (timer.seconds <= "10") {
          setTimer({
            minutes: timer.minutes,
            seconds: `0${String(parseInt(timer.seconds) - 1)}`,
          });
        } else {
          setTimer({
            minutes: timer.minutes,
            seconds: String(parseInt(timer.seconds) - 1),
          });
        }
      }
    }, 1000);
    if (showResults === true) {
      clearTimeout(timerId);
    }
  }, [timer.minutes, timer.seconds, showResults]);

  useEffect(() => {
    const evTypep = window.performance.getEntriesByType("navigation")[0].type;
    if (evTypep === "reload" || evTypep === "back_forward") {
      window.location.replace("/");
    }
  }, []);

  useEffect(() => {
    getMockQuestions();
  }, [page]);

  const getMockQuestions = async () => {
    setLoad2(false);
    try {
      const url = `https://exam-back-end-2.vercel.app/admin/getQuestionsByMockId/${params.id}?page=${page}&limit=10`;

      const res = await axios.get(url);

      if (res.status === 200) {
        let updatedArr = res.data.data.map((each) => ({
          ...each,
          answered: "",
        }));

        if (mcqquestions.length === 0) {
          setCount(res.data.count);
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

          setQuestions(newUpdatedArr);
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
      setLoad(false);
      setLoad2(true);
      console.error(error);
    }
  };

  const Results = () => {
    const [data, setData] = useState([
      { name: "Correct", value: 0 },
      { name: "Wrong", value: 0 },
    ]);

    const [ontimeCall, setOneTimeCall] = useState(0);

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

      addingResultsToLeaderBoard(data[0].value * 2 - data[1].value * 0.5);
      setOneTimeCall(ontimeCall + 1);
    }, []);

    useEffect(() => {
      if (ontimeCall === 1) {
        addingResultsToLeaderBoard(data[0].value * 2 - data[1].value * 0.5);
      }
    }, [ontimeCall]);

    const addingResultsToLeaderBoard = async (marks) => {
      let count = 0;
      try {
        const url = `https://exam-back-end.vercel.app/admin/createLeaderBoard`;

        const reqConfigure = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mockId: params.id,
            userId: Cookies.get("jwt_userID"),
            totalMark: marks,
          }),
        };

        await fetch(url, reqConfigure);
      } catch (error) {
        console.error(error);
      }
    };

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
                history.push("/");
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
              style={{ bottom: "22.5%" }}
              type="button"
            >
              Check Answers
            </button>
            <button
              onClick={() => {
                history.push(`/leaderboard/${params.id}`);
              }}
              className="leaderboard"
              type="button"
            >
              Show LeaderBoard
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
        <div className="results">Answers</div>
      </>
    );
  };

  const SubmitExam = () => {
    return (
      <>
        <div className="submitBackground"></div>
        <div className="submitExam">
          <h1>{submitted}</h1>
          <h4>
            {timer.minutes} : {timer.seconds}
          </h4>

          {submitted !== "Times Up" && (
            <>
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
            </>
          )}
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
      <div id="scrollToStart"></div>
      {!load ? (
        <div className="mcq-con">
          <h1>Mock Test</h1>

          <h4>
            Timer {timer.minutes} : {timer.seconds}
          </h4>
          <button
            style={{
              position: "fixed",
              top: "5%",
              left: "90%",
              height: "10%",
              right: 0,
              width: "5%",
              padding: "1% 2%",
            }}
            onClick={() => {
              history.push("/");
            }}
            className="cls"
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
                  <h3>Q. {each.question}</h3>
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

                  {currentQuestion === totalQuestions && (
                    <button
                      onClick={() => {
                        setSubmitted("Are you sure to submit ?");
                      }}
                      className="next"
                      type="button"
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

export default MCQ;
