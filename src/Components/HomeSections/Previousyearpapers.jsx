import React, { useState } from "react";
import data from "../data.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";

const Previousyearpapers = () => {
  const [weeklyNoOffElement, setweeklyNoOffElement] = useState(4);

  const slice = data.previousyearpaper.slice(0, weeklyNoOffElement);

  const loadMore = () => {
    setweeklyNoOffElement(weeklyNoOffElement + weeklyNoOffElement);
  };

  const handlePreviousYear = () => {
    toast("You cannot access without logging in. \n please login first.");
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
      <section className="py-4 container">
        <h2 className="pb-4 text-center text-lg-start">
          Previous year Paper <span class="badge bg-secondary">New</span>
        </h2>
        <div className="row justify-content-center">
          {slice.map((item, index) => {
            return (
              <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                <div className="card p-0 overflow-hidden h-100 shadow">
                  <img src={item.img} alt="" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.desc}</p>
                    <div className="text-center">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        onClick={() => {
                          Cookies.get("userToken") === undefined
                            ? (window.location.href = "/StudentLogin")
                            : handlePreviousYear();
                        }}
                      >
                        Start Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-dark d-block w-100"
          onClick={() => loadMore()}
        >
          Load More
        </button>
      </section>

      <hr />
    </>
  );
};

export default Previousyearpapers;
