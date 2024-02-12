// SubtopicsPage.jsx
import React, { useState, useEffect } from "react";
import "./subtopics.css";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const SubtopicsPage = () => {
  const [subtopicsData, setSubtopicsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContainer, setShowContainer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    topicId: "",
  });
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllSubtopics();

    fetch("https://exam-back-end-2.vercel.app/admin/getAllTopics")
      .then((response) => response.json())
      .then((data) => {
        setTopics(data.data);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, []);

  const getAllSubtopics = () => {
    setSubtopicsData([]);
    fetch("https://exam-back-end-2.vercel.app/admin/getAllSubtopics")
      .then((response) => response.json())
      .then((data) => {
        setSubtopicsData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subtopics:", error);
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

    if (!formData.name || !formData.description || !formData.topicId) {
      console.error("Name, description, and topic are required");
      return;
    }

    fetch("https://exam-back-end-2.vercel.app/admin/addSubtopic", {
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

        toast.success("Subtopic added successfully");

        setTimeout(() => {
          handleContainerClose();
          getAllSubtopics();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error adding subtopic:", error);

        toast.error("Error adding subtopic. Please try again.");
      });
  };
  return (
    <div className="themain">
      <div className="SubtopicsPage">
        {loading ? (
          <div className="loading-container">
            <TailSpin height={"10%"} width={"10%"} color={"#FFFFFF"} />
          </div>
        ) : (
          <div className="toping">
            <h2>Subtopics Page</h2>
            <button
              type="button"
              className="addcomponentbutton"
              onClick={handleAddComponent}
            >
              Add Subtopic
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
              <div
                className="containering"
                onClick={(e) => e.stopPropagation()}
              >
                <form className="form" onSubmit={handleSubmit}>
                  <label htmlFor="name">Name:</label>
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

                  <label htmlFor="topicId">Topic:</label>
                  <select
                    id="topicId"
                    name="topicId"
                    value={formData.topicId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    {topics.map((topic) => (
                      <option key={topic._id} value={topic._id}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="submitbutton">
                    Add Subtopic
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
          <ul className="SubtopicsList">
            {subtopicsData.map((subtopic) => (
              <li key={subtopic._id} className="SubtopicItem">
                <div className="theDetails">
                  <div id="detail">
                    <strong>ID:</strong> &nbsp;{subtopic._id}
                  </div>
                  <div id="detail">
                    <span className="SubtopicName">
                      <strong>Name:</strong>
                    </span>
                    &nbsp;
                    {capitalizeFirstLetter(subtopic.name)}
                  </div>

                  <div id="detail">
                    <strong> Topic ID:</strong> &nbsp;{subtopic.topicId}
                  </div>

                  <div id="detail">
                    <strong> Created At:</strong> &nbsp;
                    {new Date(subtopic.createdAt).toLocaleString()}
                  </div>
                </div>
                {subtopic.description && (
                  <div className="description1">
                    <strong>Description:</strong> &nbsp;{subtopic.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SubtopicsPage;
