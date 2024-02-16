import React, { useEffect } from "react";
import data from "../data.js";
import "./mock.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { Hourglass } from "react-loader-spinner";

const Mocks = [
  {
    _id: "january",
    testName: "January",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
  {
    _id: "february",
    testName: "February",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
  {
    _id: "march",
    testName: "March",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
  {
    _id: "april",
    testName: "April",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
  {
    _id: "may",
    testName: "May",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
  {
    _id: "june",
    testName: "June",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
  {
    _id: "july",
    testName: "July",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
  {
    _id: "august",
    testName: "August",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
  {
    _id: "september",
    testName: "September",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
  {
    _id: "october",
    testName: "October",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
  {
    _id: "november",
    testName: "November",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
  {
    _id: "december",
    testName: "December",
    description:
      "In this test, each question is related to current affairs, and each correct answer will be allotted 2 marks. However, there is a negative marking system in place where you will lose 1 mark for every wrong answer, Make sure that you don't participate in any MalPractice or Mass Copy if so they will be disqualified from the exam, Please accpet the terms below and contiue to the exam, All the Best! ",
  },
];

const Currentaffair = () => {
  const [showModel, setShowModel] = useState(false);
  const [mockId, setMockId] = useState("");
  const [receivedMocks, setReceivedMocks] = useState(() => {
    return Mocks;
  });

  const [sortedQuestion, setSortedQuestions] = useState(() => {
    return {};
  });

  const [load, setLoad] = useState(false);
  useEffect(() => {
    getWeeklyCurrentAffairs();
  }, []);

  const getWeeklyCurrentAffairs = async () => {
    setLoad(false);
    const url =
      "https://exam-back-end-2.vercel.app/admin/getAllQuestionByCurrentAffairs";

    const res = await axios.get(url);

    if (res.status === 200) {
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/
      /**The sorting was requested by the client to be done in  frontend*/

      let january = [];
      let february = [];
      let march = [];
      let april = [];
      let may = [];
      let june = [];
      let july = [];
      let august = [];
      let september = [];
      let october = [];
      let november = [];
      let december = [];

      const date = new Date();

      const year = date.getFullYear();
      // const month = date.getMonth() + 1;

      console.log(res.data.data);

      res.data.data.map((each) => {
        let obtainedDate = new Date(each.createdAt);
        const obtainedyear = obtainedDate.getFullYear();
        const obtainedmonth = obtainedDate.getMonth() + 1;
        // const obtainedday = obtainedDate.getDate();

        if (year === obtainedyear) {
          if (obtainedmonth === 1) {
            january.push(each);
          } else if (obtainedmonth === 2) {
            february.push(each);
          } else if (obtainedmonth === 3) {
            march.push(each);
          } else if (obtainedmonth === 4) {
            april.push(each);
          } else if (obtainedmonth === 5) {
            may.push(each);
          } else if (obtainedmonth === 6) {
            june.push(each);
          } else if (obtainedmonth === 7) {
            july.push(each);
          } else if (obtainedmonth === 8) {
            august.push(each);
          } else if (obtainedmonth === 9) {
            september.push(each);
          } else if (obtainedmonth === 10) {
            october.push(each);
          } else if (obtainedmonth === 11) {
            november.push(each);
          } else if (obtainedmonth === 12) {
            december.push(each);
          }
        }
      });

      setSortedQuestions({
        january,
        february,
        march,
        april,
        may,
        june,
        july,
        august,
        september,
        october,
        november,
        december,
      });
      setLoad(true);
    }
  };

  const MockModel = () => {
    const [acceptTerms, setTerms] = useState(false);

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
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#22222280",
            zIndex: 1,
          }}
        ></div>
        {sortedQuestion[mockId].length * 2 === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="mock-model-con"
          >
            <h1>No Question's In This Month</h1>
            <button
              type="button"
              onClick={() => {
                setShowModel(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          receivedMocks.map(
            (each) =>
              each._id === mockId && (
                <div className="mock-model-con">
                  <h1 style={{ textTransform: "capitalize" }}>
                    {each.testName}
                  </h1>
                  <p>{each.description}</p>
                  <h5>Total Marks : {sortedQuestion[mockId].length * 2}</h5>
                  <div className="div-inside">
                    <input
                      onChange={() => {
                        setTerms(!acceptTerms);
                      }}
                      checked={acceptTerms}
                      type="checkbox"
                    />
                    <p>Accept The Terms and Condition</p>
                  </div>
                  <button
                    onClick={() => {
                      if (acceptTerms === false) {
                        toast("Please Accept Terms and conditions");
                      } else {
                        localStorage.setItem(
                          "data",
                          JSON.stringify(sortedQuestion[mockId])
                        );
                        window.location.href = `/mcqcurrentAffairs/monthly`;
                      }
                    }}
                    button="button"
                  >
                    Go To Exam
                  </button>
                  <button
                    style={{ marginLeft: "5%" }}
                    type="button"
                    onClick={() => {
                      setShowModel(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              )
          )
        )}
      </>
    );
  };

  return (
    <>
      {showModel && <MockModel />}
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

      <section className="mock-container">
        <h2 className="mock-head pb-4 text-center text-lg-start ">
          Monthly <span className="badge bg-secondary">Current Affairs</span>
        </h2>
        <div className="mockmain">
          {load ? (
            receivedMocks.map((each) => (
              <div
                key={each._id}
                style={{ width: "20%", marginLeft: "3%" }}
                className="mock-div"
              >
                <div>
                  <img src="./Mock.png" alt="Mock" style={{ height: "25vh" }} />
                  <h3 style={{ textTransform: "capitalize" }}>
                    {each.testName}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      if (Cookies.get("userToken") === undefined) {
                        window.location.href = "/StudentLogin";
                      } else if (Cookies.get("userToken") !== undefined) {
                        setMockId(each._id);
                        setShowModel(true);
                      }
                    }}
                  >
                    Take Test
                  </button>
                </div>
              </div>
            ))
          ) : (
            <section
              style={{
                height: "60%",
                weight: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "45%",
                marginTop: "5%",
              }}
            >
              <Hourglass colors={["#212529", "#212529"]} />
            </section>
          )}
        </div>
      </section>
    </>
  );
};

export default Currentaffair;
