import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quizbycustsubject = () => {
  const handleQuizBySub = () => {
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
      <div class="container py-4">
        <h2 className="text-center text-lg-start">
          Quiz by Custom Subject / Topic{" "}
          <span class="badge bg-secondary">New</span>
        </h2>
        <div class="row justify-content-center">
          <div class="col-sm-12 col-md-8 col-lg-6">
            <div class="container bg-white rounded my-2 px-0">
              <div class="py-1 bg-info text-white">
                <h1 style={{ textAlign: "center" }}>CUSTOM SUBJECT</h1>
              </div>
              <div class="mt-3 " style={{ textAlign: "center" }}>
                <img src="register-icon.png" width="100px" alt="" />
              </div>
              <form action="">
                <div class="py-3 mx-5">
                  <label htmlFor="" className="mb-2">
                    No. of Question
                  </label>
                  <input
                    type="text"
                    name="noOfQuestion"
                    required
                    class="form-control  border-info"
                    placeholder="No. of Question"
                  />
                </div>
                <div class="py-3 mx-5">
                  <label htmlFor="" className="mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    class="form-control  border-info"
                    placeholder="Subject"
                  />
                </div>
                <div class="py-3 mx-5">
                  <label htmlFor="" className="mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    name="topic"
                    required
                    class="form-control  border-info"
                    placeholder="Topic"
                  />
                </div>
                <div class="py-3 mx-5">
                  <label htmlFor="" className="mb-2">
                    Sub Topic
                  </label>
                  <input
                    type="text"
                    name="subTopic"
                    required
                    class="form-control  border-info"
                    placeholder="Sub Topic"
                  />
                </div>
                <div class="py-3 mx-5">
                  <label htmlFor="" className="mb-2">
                    Difficulty Level
                  </label>
                  <input
                    type="text"
                    name="difficultyLevel"
                    required
                    class="form-control  border-info"
                    placeholder="Difficulty Level"
                  />
                </div>
                <div class="pt-3 mx-5 ">
                  <input
                    type="button"
                    class="form-control btn-info text-white"
                    value="Start Now"
                    onClick={handleQuizBySub}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
};

export default Quizbycustsubject;
