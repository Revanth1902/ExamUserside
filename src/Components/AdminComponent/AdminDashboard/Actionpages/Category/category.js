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
    setFormData({
      name: "",
      description: "",
    });
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

    // Get adminId from cookie
    const adminToken = getAdminTokenFromCookie();
    const adminId = getAdminIdFromCookie(); // Replace this with your actual function to get the adminId from the cookie

    fetch(`https://exam-back-end-2.vercel.app/admin/addCategory/${adminId}`, {
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
        console.log("Category added successfully:", data);

        handleContainerClose();
        toast.success("Category added successfully");
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

  const handleUpdateContainerClose = () => {
    setShowUpdateContainer(false);
    setSelectedCategory(null);
    getAllCategories();
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      console.error("Name and description are required");
      return;
    }

    // Disable the button to prevent multiple clicks
    setIsUpdatingCategory(true);

    const adminToken = getAdminTokenFromCookie();
    const adminId = getAdminIdFromCookie();

    fetch(
      `https://exam-back-end-2.vercel.app/admin/updateCategory/${selectedCategory._id}/${adminId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
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

        setIsUpdatingCategory(false);

        handleUpdateContainerClose();
        getAllCategories();
        toast.success("Category updated successfully");
      })
      .catch((error) => {
        console.error("Error updating category:", error);

        toast.error("Error updating category. Please try again.");

        // Re-enable the button after an error
        setIsUpdatingCategory(false);
      });
  };

  // Rest of your code for getAdminIdFromCookie and getAdminTokenFromCookie

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

                  <button
                    type="submit"
                    className="submitbutton"
                    disabled={isAddingCategory} // Disable the button when adding category
                  >
                    {isAddingCategory ? <span>Adding...</span> : "Add Category"}
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
                      <span>Updating...</span>
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
