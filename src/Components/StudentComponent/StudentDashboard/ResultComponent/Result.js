//    import axios from "axios";
//    import React, {useState , useEffect} from "react";

//    import style from "../StudentDashboard.module.css";

// function Result() {

//     const [results , setResults] = useState([]);

//      useEffect(()=>{
//         async function getAllResults(){
//             let value = await axios.get("http://localhost:3333/result");
//             setResults(value.data);
//         }
//             getAllResults();
//      },[]);

//     return (
//         <>
//             <div id={style.displayHeadingBox}>
//                 <h2>Student Exam List</h2>
//             </div>
//             <div id={style.tableBox}>
//                 <table >
//                     <thead>
//                         <tr>
//                              <th id={style.center}>User Email</th>
//                              <th id={style.center}>Exam Name</th>
//                              <th id={style.center}>Exam Date</th>
//                              <th id={style.center}>Result Status</th>
//                              <th id={style.center}>Your Score</th>
//                              <th id={style.center}>Total Marks</th>
//                              <th id={style.center}>Total Question</th>
//                         </tr>
//                     </thead>
//                     <tbody >
//                     {
//                         results.map((data , i) => {
//                                 if( data.user_email === sessionStorage.getItem("user"))
//                                     return(
//                                           <tr key={i}>
//                                               <td>{data.user_email}</td>
//                                               <td>{data.exam_name}</td>
//                                               <td>{data.exam_date}</td>
//                                               <td>{data.result_status}</td>
//                                               <td>{data.result_score}</td>
//                                               <td>{data.total_marks}</td>
//                                               <td>{data.total_Question}</td>
//                                           </tr>
//                                     );

//                                     return <React.Fragment key={i}></React.Fragment>
//                                 })
//                             }

//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// }

// export default Result;

import axios from "axios";
import React, { useState, useEffect } from "react";

import style from "../StudentDashboard.module.css";

function Result() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getAllResults() {
      let value = await axios.get("http://localhost:3333/result");
      setResults(value.data);
    }
    getAllResults();
  }, []);

  return (
    <>
      <div className="container mx-auto px-0">
        <div className="mx-2 my-3">
          <h2>Student Exam List</h2>
        </div>

        <div className="mx-auto px-0 container table responsive col-lg-12">
          <table className="table table-light table-stripped table-hover table-borderless">
            <thead className="table-dark">
              <tr>
                <th>User Email</th>
                <th>Exam Name</th>
                <th className="d-none d-sm-table-cell">Exam Date</th>
                <th>Result Status</th>
                <th>Your Score</th>
                <th className="d-none d-sm-table-cell">Total Marks</th>
                <th className="d-none d-sm-table-cell">Total Question</th>
              </tr>
            </thead>
            <tbody>
              {results.map((data, i) => {
                if (data.user_email === sessionStorage.getItem("user"))
                  return (
                    <tr key={i}>
                      <td>{data.user_email}</td>
                      <td>{data.exam_name}</td>
                      <td className="d-none d-sm-table-cell">
                        {data.exam_date}
                      </td>
                      <td>{data.result_status}</td>
                      <td>{data.result_score}</td>
                      <td className="d-none d-sm-table-cell">
                        {data.total_marks}
                      </td>
                      <td className="d-none d-sm-table-cell">
                        {data.total_Question}
                      </td>
                    </tr>
                  );

                return <React.Fragment key={i}></React.Fragment>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Result;
