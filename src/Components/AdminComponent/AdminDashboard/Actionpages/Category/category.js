import React, { useState, useEffect } from "react";
import "./category.css";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showUpdateContainer, setShowUpdateContainer] = useState(false);
  const [isUpdatingCategory, setIsUpdatingCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContainer, setShowContainer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    fetch("https://exam-back-end-2.vercel.app/admin/getAllCategory")
      .then((response) => response.json())
      .then((data) => {
        setCategoryData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleAddComponent = () => {
    setShowContainer(true);
  };

  const handleContainerClose = () => {
    setShowContainer(false);
    getAllCategories();
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

    if (!formData.name || !formData.description) {
      console.error("Name and description are required");
      return;
    }

    // Disable the button to prevent multiple clicks
    setIsAddingCategory(true);

    fetch("https://exam-back-end-2.vercel.app/admin/addCategory", {
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
        console.log("Category added successfully:", data);

        toast.success("Category added successfully");

        handleContainerClose();
      })
      .catch((error) => {
        console.error("Error adding category:", error);

        toast.error("Error adding category. Please try again.");
      })
      .finally(() => {
        // Enable the button after the operation is completed (whether success or error)
        setIsAddingCategory(false);
      });
  };
  const handleUpdateCategory = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
    });
    setShowUpdateContainer(true);
  };

  const handleUpdateContainerClose = () => {
    setShowUpdateContainer(false);
    setSelectedCategory(null);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      console.error("Name and description are required");
      return;
    }

    // Disable the button to prevent multiple clicks
    setIsUpdatingCategory(true);

    fetch(
      `https://exam-back-end-2.vercel.app/admin/updateCategory/${selectedCategory._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Category updated successfully:", data);

        toast.success("Category updated successfully");

        // Re-enable the button after a successful operation
        setIsUpdatingCategory(false);

        setTimeout(() => {
          handleUpdateContainerClose();
          getAllCategories();
        }, 300);
      })
      .catch((error) => {
        console.error("Error updating category:", error);

        toast.error("Error updating category. Please try again.");

        // Re-enable the button after an error
        setIsUpdatingCategory(false);
      });
  };
  return (
    <div className="themain">
      <div className="CategoryPage">
        {loading ? (
          <div className="loading-container">
            <TailSpin height={"10%"} width={"10%"} color={"#FFFFFF"} />
          </div>
        ) : (
          <div className="toping">
            <h2>Category Page</h2>
            <button
              type="button"
              className="addcomponentbutton"
              onClick={handleAddComponent}
            >
              Add Category
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

                  <button
                    type="submit"
                    className="submitbutton"
                    disabled={isAddingCategory} // Disable the button when adding category
                  >
                    {isAddingCategory ? (
                      <span>
                        Adding...
                       
                      </span>
                    ) : (
                      "Add Category"
                    )}
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
        {showUpdateContainer && selectedCategory && (
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
                    disabled={isUpdatingCategory}
                  >
                    {isUpdatingCategory ? (
                      <span>
                        Updating...
                       
                      </span>
                    ) : (
                      "Update Category"
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
          <ul className="CategoryList">
            {categoryData.map((category) => (
              <li key={category._id} className="CategoryItem">
                <div className="theDetails">
                  <div id="detail">
                    <strong>ID:</strong> &nbsp;{category._id}
                  </div>
                  <div id="detail">
                    <span className="CategoryName">
                      <strong>Name:</strong>
                    </span>
                    &nbsp;
                    {capitalizeFirstLetter(category.name)}
                  </div>
                  <div id="detail">
                    <strong> Created At:</strong> &nbsp;
                    {new Date(category.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="description">
                  <strong>Description:</strong> &nbsp;{category.description}
                </div>
                <div className="buttonforupdatecategory">
                  <button
                    type="button"
                    className="logoutbutton"
                    onClick={() => handleUpdateCategory(category)}
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

export default CategoryPage;
