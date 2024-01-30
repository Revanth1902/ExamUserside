import React, { useState } from "react";
import data from "../data.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Currentaffair = () => {
  const [weeklyNoOffElement, setweeklyNoOffElement] = useState(4);

  const slice = data.weeklyCurrentAffairData.slice(0, weeklyNoOffElement);

  const loadMore = () => {
    setweeklyNoOffElement(weeklyNoOffElement + weeklyNoOffElement);
  };

  const [monthlyNoOffElement, setmonthlyNoOffElement] = useState(4);

  const monthlySlice = data.monthlyCurrentAffairData.slice(
    0,
    monthlyNoOffElement
  );

  const monthlyLoadMore = () => {
    setmonthlyNoOffElement(monthlyNoOffElement + monthlyNoOffElement);
  };

  const handleCurrentAfair = () => {
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
        <h2 className="pt-4 text-center text-lg-start">
          Current Affair <span class="badge bg-secondary">New</span>
        </h2>
        <h3 className="pb-2 text-center">
          <span class="badge bg-secondary">Weekly</span> Current Affair
        </h3>
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
                        onClick={handleCurrentAfair}
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

      {/* <hr />

      <section className="py-4 container">
        <h3 className="pb-2 text-center">
          <span class="badge bg-secondary">Monthly</span> Current Affair
        </h3>
        <div className="row justify-content-center">
          {monthlySlice.map((item, index) => {
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
                        onClick={handleCurrentAfair}
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
          onClick={() => monthlyLoadMore()}
        >
          Load More
        </button>
      </section>

      <hr /> */}
    </>
  );
};

export default Currentaffair;
