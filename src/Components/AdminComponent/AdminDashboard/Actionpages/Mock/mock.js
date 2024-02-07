// MockPage.jsx
import React, { useState, useEffect } from "react";
import "./mock.css";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const MockPage = () => {
  const [mockData, setMockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContainer, setShowContainer] = useState(false);
  const [formData, setFormData] = useState({
    testName: "",
    description: "",
    totalMarks: "",
    examTiming: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchMockData();
  }, []);

  const fetchMockData = () => {
    fetch("https://exam-back-end-2.vercel.app/admin/getAllMocks")
      .then((response) => response.json())
      .then((data) => {
        setMockData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching mock data:", error);
        setLoading(false);
      });
  };
  const getAllMocks = () => {
    fetchMockData();
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

  const validateForm = () => {
    const errors = {};

    if (!formData.testName.trim()) {
      errors.testName = "Test Name is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!formData.examTiming.trim() || isNaN(formData.examTiming)) {
      errors.examTiming = "Exam Timing must be a number";
    } else if (parseInt(formData.examTiming) <= 0) {
      errors.examTiming = "Exam Timing must be greater than 0";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Validation failed, do not proceed with the submission
      return;
    }

    const dataToSend = {
      testName: formData.testName,
      description: formData.description,
      totalMarks: formData.totalMarks || 100,
      examTiming: formData.examTiming,
    };

    fetch("https://exam-back-end-2.vercel.app/admin/createMocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Mock added successfully:", data);

        toast.success("Mock added successfully");

        setTimeout(() => {
          handleContainerClose();
          getAllMocks();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error adding mock:", error);

        toast.error("Error adding mock. Please try again.");
      });
  };

  return (
    <div className="mock-page-container">
      <div className="toping">
        <h2>Mock Tests Page</h2>
        <button
          type="button"
          className="addcomponentbutton"
          onClick={handleAddComponent}
        >
          Add Mock Test
        </button>
      </div>
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
          <div className="overlay" onClick={handleContainerClose}>
            <div className="containering" onClick={(e) => e.stopPropagation()}>
              <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="testName">Test Name:</label>
                <input
                  type="text"
                  id="testName"
                  name="testName"
                  value={formData.testName}
                  onChange={handleChange}
                  required
                />
                {validationErrors.testName && (
                  <span className="error">{validationErrors.testName}</span>
                )}

                <label htmlFor="description">Description:</label>
                <textarea
                  rows={5}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
                {validationErrors.description && (
                  <span className="error">{validationErrors.description}</span>
                )}

                <label htmlFor="totalMarks">Total Marks:</label>
                <input
                  type="text"
                  id="totalMarks"
                  name="totalMarks"
                  value={formData.totalMarks || 100}
                  onChange={handleChange}
                  required
                  disabled
                />

                <label htmlFor="examTiming">Exam Timing (minutes):</label>
                <select
                  id="examTiming"
                  name="examTiming"
                  value={formData.examTiming}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Exam Timing</option>
                  {[...Array(15).keys()].map((minute) => (
                    <option key={minute + 1} value={(minute + 1) * 10}>
                      {(minute + 1) * 10}
                    </option>
                  ))}
                </select>
                {validationErrors.examTiming && (
                  <span className="error">{validationErrors.examTiming}</span>
                )}

                <button type="submit" className="submitbutton">
                  Add Mock Test
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
        <ul className="MockList">
          {mockData.map((mock) => (
            <li key={mock._id} className="MockItem">
              <div className="theDetails">
                <div id="detail">
                  <strong>ID:</strong> &nbsp;{mock._id}
                </div>
                <div id="detail">
                  <span className="MockName">
                    <strong>Test Name:</strong>
                  </span>
                  &nbsp;
                  {mock.testName}
                </div>

                <div id="detail">
                  <strong> Created At:</strong> &nbsp;
                  {new Date(mock.createdAt).toLocaleString()}
                </div>
              </div>
              {mock.description && (
                <div className="description">
                  <strong>Description:</strong> &nbsp;{mock.description}
                </div>
              )}
              <div className="theDetails">
                <div id="detail">
                  <strong>Total Marks:</strong> &nbsp;{mock.totalMarks}
                </div>
                <div id="detail">
                  <strong> Exam Timing:</strong> &nbsp;{mock.examTiming} minutes
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MockPage;
