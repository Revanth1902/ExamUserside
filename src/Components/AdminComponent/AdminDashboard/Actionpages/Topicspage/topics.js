import React, { useState, useEffect } from "react";
import "./topics.css";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const TopicsPage = () => {
  const [topicsData, setTopicsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContainer, setShowContainer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllTopics();

    fetch("https://exam-back-end-2.vercel.app/admin/getAllCategory")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const getAllTopics = () => {
    setTopicsData([]);
    fetch("https://exam-back-end-2.vercel.app/admin/getAllTopics")
      .then((response) => response.json())
      .then((data) => {
        setTopicsData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
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
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.categoryId) {
      console.error("Name, description, and category are required");
      return;
    }

    fetch("https://exam-back-end-2.vercel.app/admin/addTopic", {
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
        console.log("Topic added successfully:", data);

        toast.success("Topic added successfully");

        setTopicsData((prevData) => [...prevData, data.topic]);

        setTimeout(() => {
          handleContainerClose();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error adding topic:", error);

        toast.error("Error adding topic. Please try again.");
      });
  };

  return (
    <div className="themain">
      <div className="TopicsPage">
        <div className="toping">
          <h2>Topics Page</h2>
          <button
            type="button"
            className="addcomponentbutton"
            onClick={handleAddComponent}
          >
            Add Topic
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
              <div className="container" onClick={(e) => e.stopPropagation()}>
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

                  <label htmlFor="categoryId">Category:</label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {capitalizeFirstLetter(category.name)}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="submitbutton">
                    Add Topic
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
          <ul className="TopicsList">
            {topicsData.map((topic) => (
              <li key={topic._id} className="TopicItem">
                <div className="theDetails">
                  <div id="detail">
                    <strong>ID:</strong> &nbsp;{topic._id}
                  </div>
                  <div id="detail">
                    <span className="TopicName">
                      <strong>Name:</strong>
                    </span>
                    &nbsp;
                    {capitalizeFirstLetter(topic.name)}
                  </div>

                  <div id="detail">
                    <strong> Topic ID:</strong> &nbsp;{topic.categoryId}
                  </div>

                  <div id="detail">
                    <strong> Created At:</strong> &nbsp;
                    {new Date(topic.createdAt).toLocaleString()}
                  </div>
                </div>
                {topic.description && (
                  <div className="description1">
                    <strong>Description:</strong> &nbsp;{topic.description}
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

export default TopicsPage;
