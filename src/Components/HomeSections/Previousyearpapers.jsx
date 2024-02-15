import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

const Previousyearpapers = () => {
  const [allYears, setAllYears] = useState(() => {
    return [];
  });
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    generatePrevious20Years();
  }, []);

  const generatePrevious20Years = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 1; i < 20; i++) {
      years.push(currentYear - i);
    }
    setAllYears(years);
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
          Previous Year <span className="badge bg-secondary">Papers</span>
        </h2>
        <img src="/Quiz.jpg" alt="Quiz Image" />
        <div className="customize">
          <form style={{ marginTop: "10%" }}>
            <div>
              <label htmlFor="category">Select Year : &nbsp;</label>
              <select
                style={{ textTransform: "capitalize" }}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                }}
                id="category"
              >
                <option value="">Select</option>
                {allYears.map((each) => (
                  <option
                    value={each}
                    style={{ textTransform: "capitalize" }}
                    id={each}
                  >
                    {each}
                  </option>
                ))}
              </select>
            </div>
            {selectedYear === "" && (
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
          </form>

          {
            <button
              onClick={() => {
                if (Cookies.get("userToken") === undefined) {
                  window.location.href = "/StudentLogin";
                } else if (selectedYear === "") {
                  toast("Please Select Year");
                } else {
                  window.location.href = `/mcqprev/${selectedYear}`;
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

export default Previousyearpapers;
