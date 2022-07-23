
// import './App.css';
import Home from './Home';
import MyNavbar from './MyNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Login from './Login';
import Update from './Update';
import AddCourseToTrainer from './AddCourseToTrainer';
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import StudentList from './StudentList';
import StudentDetail from './StudentDetail';
import CourseCreate from './CourseCreate';
import CourseUpdate from './CourseUpdate';
import BatchCreate from './BatchCreate';
import BatchList from './BatchList';
import BatchDetail from './BatchDetail';
import BatchUpdate from './BatchUpdate';
import AddStudentToBatch from './AddStudentToBatch';
import TeacherList from './TeacherList';
import Schedule from './Schedule';
import EventOfDay from './EventOfDay';
import EventUpdate from './components/EventUpdate';
import { useEffect, useState, } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // function loggingIn(ok) {
  //   ok ? setLoggedIn(true) : setLoggedIn(false);
  // }
  const loggingIn = ((ok) => (
    ok ? setLoggedIn(true) : setLoggedIn(false)
  ))

  // const link = "http://www.google.com";
  return (
    <Router>
      <div className="App">
        <MyNavbar loggedIn={loggedIn} loggingIn={loggingIn} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/update/:id">
              <Update />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/blogs/:id">
              <BlogDetails />
            </Route>

            <Route exact path="/create">
              <Create />
            </Route>
            {/* course */}
            <Route exact path="/courses">
              <CourseList />
            </Route>
            <Route exact path="/courses/create">
              <CourseCreate />
            </Route>
            <Route exact path="/courses/update/:id">
              <CourseUpdate />
            </Route>
            <Route exact path="/courses/assign">
              <AddCourseToTrainer />
            </Route>
            <Route exact path="/courses/:id">
              <CourseDetail />
            </Route>

            {/* batch */}
            <Route exact path="/batches">
              <BatchList />
            </Route>
            <Route exact path="/batches/create">
              <BatchCreate />
            </Route>
            <Route exact path="/batches/update/:id">
              <BatchUpdate />
            </Route>
            <Route exact path="/batches/assign">
              <AddStudentToBatch />
            </Route>
            <Route exact path="/batches/:id">
              <BatchDetail />
            </Route>


            {/* Student */}
            <Route exact path="/students">
              <StudentList />
            </Route>
            <Route exact path="/students/:id">
              <StudentDetail />
            </Route>



            {/* Teacher */}
            <Route exact path="/teachers">
              <TeacherList />
            </Route>

            {/* Schedule */}
            <Route exact path="/schedule">
              <Schedule />
            </Route>

            <Route exact path="/schedule/:dayName">
              <EventOfDay />
            </Route>

            <Route exact path="/schedule/:dayName/:eventName">
              <EventUpdate />
            </Route>

            {/* action */}
            {/* unknown url */}
            <Route path="*">
              <NotFound />
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
