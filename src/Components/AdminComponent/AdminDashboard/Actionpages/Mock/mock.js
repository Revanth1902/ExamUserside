import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import "./mock.css";

const MockPage = () => {
  const [mockData, setMockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContainer, setShowContainer] = useState(false);
  const [showUpdateContainer, setShowUpdateContainer] = useState(false);
  const [formData, setFormData] = useState({
    testName: "",
    description: "",
    totalMarks: "",
    examTiming: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isAddingMock, setIsAddingMock] = useState(false);
  const [isUpdatingMock, setIsUpdatingMock] = useState(false);
  const [selectedMock, setSelectedMock] = useState(null);

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

  const handleAddComponent = () => {
    setShowContainer(true);
  };

  const handleContainerClose = () => {
    setShowContainer(false);
    setSelectedMock(null);
    fetchMockData();
  };

  const handleUpdateMock = (mock) => {
    setSelectedMock(mock);
    setFormData({
      testName: mock.testName,
      description: mock.description,
      totalMarks: mock.totalMarks,
      examTiming: mock.examTiming,
    });
    setShowUpdateContainer(true);
  };

  const handleUpdateContainerClose = () => {
    setShowUpdateContainer(false);
    setSelectedMock(null);
    fetchMockData();
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

    setIsAddingMock(true);

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

        setIsAddingMock(false);

        setTimeout(() => {
          handleContainerClose();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error adding mock:", error);

        toast.error("Error adding mock. Please try again.");

        setIsAddingMock(false);
      });
  };

  const validateUpdateForm = () => {
    const errors = {};

    // Add validation for update form fields if needed
    // Similar to validateForm function
    // Set errors for each field if validation fails

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (!validateUpdateForm()) {
      // Validation failed, do not proceed with the submission
      return;
    }

    setIsUpdatingMock(true);

    const dataToSend = {
      testName: formData.testName,
      description: formData.description,
      totalMarks: formData.totalMarks || 100,
      examTiming: formData.examTiming,
    };

    fetch(
      `https://exam-back-end-2.vercel.app/admin/updateMock/${selectedMock._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Mock updated successfully:", data);

        toast.success("Mock updated successfully");

        setIsUpdatingMock(false);

        setTimeout(() => {
          handleUpdateContainerClose();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error updating mock:", error);

        toast.error("Error updating mock. Please try again.");

        setIsUpdatingMock(false);
      });
  };

  return (
    <div className="mock-page-container">
      {loading ? (
        <div className="loading-container">
          <TailSpin height={"10%"} width={"10%"} color={"#FFFFFF"} />
        </div>
      ) : (
        <div className="toping">
          <h2>Mock Tests Page</h2>
          <button
            type="button"
            className="addcomponentbutton"
            onClick={handleAddComponent}
            disabled={isAddingMock || isUpdatingMock}
          >
            {isAddingMock || isUpdatingMock ? (
              <span>
                {isAddingMock ? "Adding..." : "Updating..."}
                <TailSpin height={12} width={12} color={"#ffffff"} />
              </span>
            ) : (
              "Add Mock Test"
            )}
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
      {showUpdateContainer && selectedMock && (
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
          <div className="overlay" onClick={handleUpdateContainerClose}>
            <div className="containering" onClick={(e) => e.stopPropagation()}>
              <form className="form" onSubmit={handleUpdateSubmit}>
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

                <button
                  type="submit"
                  className="submitbutton"
                  disabled={isUpdatingMock}
                >
                  {isUpdatingMock ? (
                    <span>
                      Updating...
                      <TailSpin height={12} width={12} color={"#ffffff"} />
                    </span>
                  ) : (
                    "Update Mock Test"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleUpdateContainerClose}
                  className="close-button"
                >
                  <AiOutlineClose />
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      {!loading && (
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
              <div className="buttonforupdate">
                <button
                  type="button"
                  onClick={() => handleUpdateMock(mock)}
                  className="logoutbutton"
                  disabled={isUpdatingMock}
                >
                  {isUpdatingMock &&
                  selectedMock &&
                  selectedMock._id === mock._id ? (
                    <span>
                      Updating...
                      <TailSpin height={12} width={12} color={"#ffffff"} />
                    </span>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MockPage;
