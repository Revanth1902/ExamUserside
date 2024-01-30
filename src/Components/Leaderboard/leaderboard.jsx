import React from "react";
import "./leaderboard.css";

// Library imports
import { CgProfile } from "react-icons/cg";

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
  const leaderboardData = [
    {
      position: 1,
      name: "Sharmila",
      enteredOn: "2024-01-18",
      timeTaken: "1:30",
      totalQuestions: 10,
      attempted: 8,
      score: 80,
      result: "Pass",
    },
    {
      position: 2,
      name: "Abhishek",
      enteredOn: "2024-01-19",
      timeTaken: "1:45",
      totalQuestions: 10,
      attempted: 9,
      score: 75,
      result: "Pass",
    },
    {
      position: 3,
      name: "Arun",
      enteredOn: "2024-01-20",
      timeTaken: "2:00",
      totalQuestions: 10,
      attempted: 7,
      score: 70,
      result: "Pass",
    },
    {
      position: 4,
      name: "Purna",
      enteredOn: "2024-01-21",
      timeTaken: "1:20",
      totalQuestions: 10,
      attempted: 8,
      score: 85,
      result: "Pass",
    },
    {
      position: 5,
      name: "Noy",
      enteredOn: "2024-01-22",
      timeTaken: "1:15",
      totalQuestions: 10,
      attempted: 9,
      score: 78,
      result: "Pass",
    },
    {
      position: 6,
      name: "Vamsi",
      enteredOn: "2024-01-18",
      timeTaken: "1:30",
      totalQuestions: 10,
      attempted: 8,
      score: 80,
      result: "Pass",
    },
    {
      position: 7,
      name: "John",
      enteredOn: "2024-01-19",
      timeTaken: "1:45",
      totalQuestions: 10,
      attempted: 9,
      score: 75,
      result: "Pass",
    },
    {
      position: 8,
      name: "Emma",
      enteredOn: "2024-01-20",
      timeTaken: "2:00",
      totalQuestions: 10,
      attempted: 7,
      score: 70,
      result: "Pass",
    },
    {
      position: 9,
      name: "Alex",
      enteredOn: "2024-01-21",
      timeTaken: "1:20",
      totalQuestions: 10,
      attempted: 8,
      score: 85,
      result: "Pass",
    },
    {
      position: 10,
      name: "Sophie",
      enteredOn: "2024-01-22",
      timeTaken: "1:15",
      totalQuestions: 10,
      attempted: 9,
      score: 78,
      result: "Pass",
    },
  ];

  return (
    <div className="leaderboard-container">
      <div>
        <h1>Leaderboard</h1>
      </div>
      <table>
        <thead>
          <tr className="table-head">
            <th></th>
            <th>Name</th>
            <th>Position</th>
            <th>Entered On</th>
            <th>Time Taken</th>
            <th>Total Questions</th>
            <th>Attempted</th>
            <th>Score</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((data, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: `${
                  backgroundColors[
                    Math.ceil(Math.random() * backgroundColors.length)
                  ]
                }`,
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
                {data.name}
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
                  />
                ) : (
                  ""
                )}
              </td>
              <td>{data.position}</td>
              <td>{data.enteredOn}</td>
              <td>{data.timeTaken}</td>
              <td>{data.totalQuestions}</td>
              <td>{data.attempted}</td>
              <td>{data.score}</td>
              <td>{data.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
