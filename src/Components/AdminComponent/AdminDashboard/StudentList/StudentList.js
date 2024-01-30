import { useState, useEffect } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";

import { useHistory } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);

  let history = useHistory();

  function handleGoBack() {
    history.push(`/AdminDashboard/Exam`);
  }

  useEffect(() => {
    async function getAllStudent() {
      let value = await axios.get("http://localhost:3333/user");
      setStudents(value.data);
    }
    getAllStudent();
  }, []);

  return (
    <>
      <div className="container mx-auto px-0">
        <div className="mx-2">
          <h2>Student List</h2>
        </div>

        <div className="mx-auto px-0 container table responsive col-lg-12">
          <table className="table table-light table-stripped table-hover table-borderless">
            <thead className="table-dark">
              <tr>
                <th>User Name</th>
                <th>User Email</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {students.map((data, i) => {
                return (
                  <tr key={i}>
                    <td className="pt-3">{data.user_name}</td>
                    <td className="pt-3">{data.user_email}</td>
                    <td>
                      <NavLink
                        exact
                        to={`/AdminDashboard/StudentList/Details/${data.id}`}
                      >
                        <button className="px-3 mx-1 my-1 rounded-pill">
                          Result
                        </button>
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <button className="btn2 mx-2 rounded-pill" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}

export default StudentList;
