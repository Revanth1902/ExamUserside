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
  const [showUpdateContainer, setShowUpdateContainer] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isUpdatingTopic, setIsUpdatingTopic] = useState(false);
  const [topicsData, setTopicsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContainer, setShowContainer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
  });
  const [isAddingCategory, setIsAddingCategory] = useState(false);
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
    setFormData({
      name: "",
      description: "",
    });
  };

  const handleContainerClose = () => {
    setShowContainer(false);
    getAllTopics();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(value);
  };
  const getAdminIdFromCookie = () => {
    const cookieName = "jwt_AdminId";
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${cookieName}=`)) {
        // Extract the adminId value from the cookie
        const adminId = cookie.substring(cookieName.length + 1);
        return adminId;
      }
    }

    // Return a default value or handle the case where the cookie is not found
    return null;
  };
  const getAdminTokenFromCookie = () => {
    const cookieName = "jwt_AdminToken";
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${cookieName}=`)) {
        // Extract the token value from the cookie
        return cookie.substring(cookieName.length + 1);
      }
    }

    // Return a default value or handle the case where the cookie is not found
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.categoryId) {
      console.error("Name, description, and category are required");
      return;
    }

    // Disable the button to prevent multiple clicks
    setIsAddingCategory(true);
    const adminId = getAdminIdFromCookie();
    const adminToken = getAdminTokenFromCookie();

    fetch(`https://exam-back-end-2.vercel.app/admin/addTopic/${adminId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
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

        
        handleContainerClose();
        getAllTopics();
        toast.success("Topic added successfully");

      })
      .catch((error) => {
        console.error("Error adding topic:", error);

        toast.error("Error adding topic. Please try again.");
      })
      .finally(() => {
        // Enable the button after the operation is completed (whether success or error)
        setIsAddingCategory(false);
      });
  };

  const handleUpdateTopic = (topic) => {
    setSelectedTopic(topic);
    setFormData({
      name: topic.name,
      description: topic.description,
      categoryId: topic.categoryId,
    });
    setShowUpdateContainer(true);
  };

  // Function to handle closing the update container
  const handleUpdateContainerClose = () => {
    setShowUpdateContainer(false);
    setSelectedTopic(null);
    getAllTopics();
  };

  // Function to handle updating a topic
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.categoryId) {
      console.error("Name, description, and category are required");
      return;
    }

    // Disable the button to prevent multiple clicks
    setIsUpdatingTopic(true);
    const adminId = getAdminIdFromCookie();
    const adminToken = getAdminTokenFromCookie();

    const updateData = {
      name: formData.name,
      description: formData.description,
    };

    fetch(
      `https://exam-back-end-2.vercel.app/admin/updateTopic/${selectedTopic._id}/${adminId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(updateData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Topic updated successfully:", data);

        

        handleUpdateContainerClose();
        getAllTopics();
        toast.success("Topic updated successfully");
      })
      .catch((error) => {
        console.error("Error updating topic:", error);

        toast.error("Error updating topic. Please try again.");
      })
      .finally(() => {
        // Enable the button after the operation is completed (whether success or error)
        setIsUpdatingTopic(false);
      });
  };
  return (
    <div className="themain">
      <div className="TopicsPage">
        {loading ? (
          <div className="loading-container">
            <TailSpin height={"10%"} width={"10%"} color={"#FFFFFF"} />
          </div>
        ) : (
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
        )}
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
                      <option
                        key={category?._id || ""}
                        value={category?._id || ""}
                      >
                        {category && capitalizeFirstLetter(category.name)}
                      </option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="submitbutton"
                    disabled={isAddingCategory}
                  >
                    {isAddingCategory ? <span>Adding...</span> : "Add Topic"}
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
        {showUpdateContainer && selectedTopic && (
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
            
            <div className="overlay" onClick={handleUpdateContainerClose}>
              <div
                className="containering"
                onClick={(e) => e.stopPropagation()}
              >
                <form className="form" onSubmit={handleUpdateSubmit}>
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

                  <button
                    type="submit"
                    className="submitbutton"
                    disabled={isUpdatingTopic}
                  >
                    {isUpdatingTopic ? (
                      <span>Updating...</span>
                    ) : (
                      "Update Topic"
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
                    <strong> Category :</strong> &nbsp;
                    {capitalizeFirstLetter(topic.categoryId.name)}
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
                <div className="buttonforupdatetopic">
                  <button
                    type="button"
                    className="logoutbutton"
                    onClick={() => handleUpdateTopic(topic)}
                  >
                    Update
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopicsPage;
