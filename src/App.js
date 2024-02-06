import "./App.css";
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
import AdminLogin from "./Components/AdminComponent/AdminLogin/AdminLogin";

import StudentDashboard from "./Components/StudentComponent/StudentDashboard/StudentDashboard";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import StudentSignup from "./Components/StudentComponent/StudentSignup/StudentSignup";
import Footer from "./Components/Footer";

import LeaderBoard from "./Components/Leaderboard/leaderboard";
import MCQ from "./Components/StudentComponent/StudentDashboard/MCQ/mcq";
import Dashboard from "./Components/AdminComponent/AdminDashboard/Dashboard";

import Dashboard from "./Components/AdminComponent/AdminDashboard/Dashboard";
import MyProfile from "./Components/HomeComponent/userMainPage";
import MCQCustom from "./Components/StudentComponent/StudentDashboard/MCQCustomQuiz/mcqCustom.js";

function App() {
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
          <Route exact path="/AdminLogin" component={AdminLogin}></Route>
          <Route exact path="/AdminDashboard" component={Dashboard}></Route>
          <Route
            exact
            path="/StudentDashboard"
            component={StudentDashboard}
          ></Route>
          <Route exact path="/myprofile" component={MyProfile} />
          <Route exact path="/leaderboard" component={LeaderBoard} />
          <Route exact path="/mockmcq/:time/:id" component={MCQ} />
          <Route exact path="/mcqcustom" component={MCQCustom} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
