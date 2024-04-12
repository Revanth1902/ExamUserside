import "./App.css";
import { useEffect } from "react";
// import Navbar from "./Components/HomeComponent/Navbar";
import Home from "./Components/Home";
import CurrentAffair from "./Components/HomeSections/Currentaffair";
import Previousyearpapers from "./Components/HomeSections/Previousyearpapers";
import Quizbycustsubject from "./Components/HomeSections/Quizbycustsubject";
import Fullsizemocktest from "./Components/HomeSections/Fullsizemocktest";
import About from "./Components/About";
import Services from "./Components/Services";
import Document from "./Components/Document";
import Contact from "./Components/Contact";

import StudentLogin from "./Components/StudentComponent/StudentLogin/StudentLogin";


import StudentDashboard from "./Components/StudentComponent/StudentDashboard/StudentDashboard";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import StudentSignup from "./Components/StudentComponent/StudentSignup/StudentSignup";


import LeaderBoard from "./Components/Leaderboard/leaderboard";
import MCQ from "./Components/StudentComponent/StudentDashboard/MCQ/mcq";


import MyProfile from "./Components/HomeComponent/userMainPage";
import MCQCustom from "./Components/StudentComponent/StudentDashboard/MCQCustomQuiz/mcqCustom.js";
import MCQCurrentAffairs from "./Components/StudentComponent/StudentDashboard/MCQCurreentAffairs/mcqcurrentaffairs.js";
import MCQPrev from "./Components/StudentComponent/StudentDashboard/MCQPrev/mcqprev.jsx";


function App() {
  useEffect(() => {
    // Data to be shared
    const yourData = "Hello"

    // Store data in local storage
    localStorage.setItem('yourDataKey', JSON.stringify(yourData));

    // Send data to parent window
    window.parent.postMessage(yourData, '*'); // '*' allows communication with any origin
  }, []);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/CurrentAffair" component={CurrentAffair}></Route>
          <Route
            exact
            path="/Previousyearpapers"
            component={Previousyearpapers}
          ></Route>
          <Route
            exact
            path="/Quizbycustsubject"
            component={Quizbycustsubject}
          ></Route>
          <Route
            exact
            path="/Fullsizemocktest"
            component={Fullsizemocktest}
          ></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/services" component={Services}></Route>
          <Route exact path="/document" component={Document}></Route>
          <Route exact path="/contact" component={Contact}></Route>
          <Route exact path="/StudentLogin" component={StudentLogin}></Route>
          <Route exact path="/StudentSignup" component={StudentSignup}></Route>
         
          <Route
            exact
            path="/StudentDashboard"
            component={StudentDashboard}
          ></Route>
          <Route exact path="/myprofile/:name" component={MyProfile} />
          <Route exact path="/leaderboard/:mockid" component={LeaderBoard} />
          <Route exact path="/mockmcq/:time/:id" component={MCQ} />
          <Route exact path="/mcqcustom" component={MCQCustom} />
          <Route
            exact
            path="/mcqcurrentAffairs/:id"
            component={MCQCurrentAffairs}
          />
          <Route exact path="/mcqprev/:year" component={MCQPrev} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
