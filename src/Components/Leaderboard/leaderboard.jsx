import React, { useEffect, useState } from "react";
import "./leaderboard.css";
import { useParams } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";

import Cookies from "js-cookie";

// Library imports
import { CgProfile } from "react-icons/cg";

import axios from "axios";

const backgroundColors = [
  "#FFD700", // Gold
  "#ADD8E6", // Light Blue
  "#FFA07A", // Light Salmon
  "#98FB98", // Pale Green
  "#FF6347", // Tomato
  "#87CEEB", // Sky Blue
  "#FFDAB9", // Peachpuff
  "#F0E68C", // Khaki
  "#00FA9A", // Medium Spring Green
  "#FFB6C1", // Light Pink
  "#00CED1", // Dark Turquoise
  "#FF4500", // Orange Red
  "#F0FFF0", // Honeydew
  "#FF69B4", // Hot Pink
  "#00FF7F", // Spring Green
  "#FFC0CB", // Pink
  "#98FF98", // Mint Green
  "#B0E0E6", // Powder Blue
  "#FF8C00", // Dark Orange
  "#FFF8DC", // Cornsilk
  "#87CEFA", // Light Sky Blue
  "#F5F5DC", // Beige
  "#FF00FF", // Magenta
  "#00FFFF", // Aqua
  "#FFE4B5", // Moccasin
  "#FAFAD2", // Light Goldenrod Yellow
  "#FF4500", // Red-Orange
  "#F0F8FF", // Alice Blue
  "#FFE4C4", // Bisque
  "#7CFC00", // Lawn Green
];

const LeaderBoard = () => {
  const params = useParams();

  const [leaderboardResults, setLeaderBoardResults] = useState([]);

  useEffect(() => {
    getLeaderboardDetailsByMockId();
  }, []);

  useEffect(() => {
    const evTypep = window.performance.getEntriesByType("navigation")[0].type;
    if (evTypep === "reload" || evTypep === "back_forward") {
      window.location.replace("/");
    }
  }, []);

  const getUserTokenFromCookie = () => {
    const cookieName = "userToken";
    return localStorage.getItem(cookieName) || null;
  };

  const getLeaderboardDetailsByMockId = async () => {
    try {
      const userToken = getUserTokenFromCookie();
      const url = `https://exam-back-end-2.vercel.app/user/getLeaderBoardByMockId/${params.mockid}`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.status === 200) {
        const sortedArr = res.data.data.sort(
          (a, b) => b.totalMark - a.totalMark
        );
        let position = 0;
        const positionAdded = sortedArr.map((each) => {
          position = position + 1;
          return { ...each, position: position };
        });
        setLeaderBoardResults(positionAdded);
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  return (
    <div className="leaderboard-container">
      {leaderboardResults.length > 0 ? (
        <>
          <div>
            <h1>Leaderboard</h1>
          </div>

          <table>
            <thead>
              <tr className="table-head">
                <th></th>
                <th>Name</th>
                <th>Position</th>
                <th>Total Marks</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardResults.map(
                (data, index) =>
                  data.position < 11 && (
                    <tr
                      key={data.position}
                      style={{
                        backgroundColor:
                          backgroundColors[
                            Math.floor(Math.random() * backgroundColors.length)
                          ],
                      }}
                      className={
                        index < 3
                          ? index === 0
                            ? "highlighted"
                            : index === 1
                            ? "highlighted2"
                            : "highlighted3"
                          : ""
                      }
                    >
                      <td>
                        <CgProfile />
                      </td>
                      <td style={{ position: "relative" }}>
                        {data.userId
                          ? `${data.userId.firstName} ${data.userId.lastName}`
                          : "N/A"}
                        {data.position === 1 ||
                        data.position === 2 ||
                        data.position === 3 ? (
                          <img
                            className="medal"
                            src={
                              data.position === 1
                                ? "/badge1.png"
                                : data.position === 2
                                ? "/badge2.png"
                                : data.position === 3 && "/badge3.png"
                            }
                            alt={`Medal for position ${data.position}`}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{data.position}</td>
                      <td>{data.totalMark}</td>
                      <td>
                        {data.userId?.email || "N/A"}
                        {data.usr}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
          <table style={{ marginTop: "2%" }}>
            <tbody>
              {leaderboardResults.map(
                (data, index) =>
                  data.userId &&
                  data.userId._id === localStorage.getItem("jwt_userID") && (
                    <tr
                      key={data.position}
                      style={{
                        backgroundColor:
                          backgroundColors[
                            Math.floor(Math.random() * backgroundColors.length)
                          ],
                      }}
                      className={
                        index < 3
                          ? index === 0
                            ? "highlighted"
                            : index === 1
                            ? "highlighted2"
                            : "highlighted3"
                          : ""
                      }
                    >
                      <td>
                        <CgProfile />
                      </td>
                      <td style={{ position: "relative" }}>
                        {`${data.userId.firstName} ${data.userId.lastName}`}
                        {data.position === 1 ||
                        data.position === 2 ||
                        data.position === 3 ? (
                          <img
                            className="medal"
                            src={
                              data.position === 1
                                ? "/badge1.png"
                                : data.position === 2
                                ? "/badge2.png"
                                : data.position === 3 && "/badge3.png"
                            }
                            alt={`Medal for position ${data.position}`}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{data.position}</td>
                      <td>{data.totalMark}</td>
                      <td>
                        {data.userId.email || "N/A"}
                        {data.usr}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </>
      ) : (
        <div
          style={{
            height: "100vh",
            width: "85vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Hourglass colors={["#212529", "#212529"]} />
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
