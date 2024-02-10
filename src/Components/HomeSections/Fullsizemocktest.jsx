import React from "react";
import data from "../data.js";
import "./mock.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { Hourglass } from "react-loader-spinner";

const Fullsizemocktest = () => {
  const [showModel, setShowModel] = useState(false);
  const [mockId, setMockId] = useState("");
  const [receivedMocks, setReceivedMocks] = useState(() => {
    return [];
  });

  const [load, setLoad] = useState(false);

  useEffect(() => {
    getAllMocks();
  }, []);

  const getAllMocks = async () => {
    setLoad(false);
    try {
      const url = `https://exam-back-end-2.vercel.app/admin/getAllMocks`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setLoad(true);
        setReceivedMocks(data.data);
      }
    } catch (error) {
      setLoad(true);
      console.error(error);
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
        {receivedMocks.map(
          (each) =>
            each._id === mockId && (
              <div className="mock-model-con">
                <h1 style={{ textTransform: "capitalize" }}>{each.testName}</h1>
                <p>{each.description}</p>
                <h5>Total Marks : {each.totalMarks}</h5>

                <h5>Exam Time : {each.examTiming} Mins</h5>
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
                      window.location.href = `/mockmcq/${each.examTiming}/${mockId}`;
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
          Mock <span className="badge bg-secondary">Test</span>
        </h2>
        <div className="mockmain">
          {load ? (
            receivedMocks.map((each) => (
              <div key={each._id} className="mock-div">
                <div>
                  <img src="./Mock.png" alt="Mock" />
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

export default Fullsizemocktest;
