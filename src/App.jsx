import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import { CourseProvider } from "./contexts/CoursesApis";
import React, { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
import Course from "./pages/Course";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const FirstPage = lazy(() => import("./pages/FirstPage"));
const Home = lazy(() => import("./pages/Homepage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Likes = lazy(() => import("./pages/Likes"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const MyLearning = lazy(() => import("./pages/MyLearning"));
const InProgress = lazy(() => import("./pages/InProgress"));
const Profile = lazy(() => import("./pages/Profile"));
const Confirm = lazy(() => import("./pages/ConfirmMail"));
const Courses = lazy(() => import("./pages/Courses"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  const loggedIn = localStorage.getItem("isLoggedIn");
  console.log(loggedIn);

  return (
    <AuthProvider>
      <CourseProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route
                exact
                path="/"
                element={loggedIn ? <Home /> : <FirstPage />}
              />
              <Route path="homepage" element={<Home />} />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="courses" element={<Courses />} />
              <Route path="/courses/:id" element={<Course />} />
              <Route path="mylearning" element={<MyLearning />} />
              <Route path="inprogress" element={<InProgress />} />
              <Route path="cart" element={<Cart />} />
              <Route path="likes" element={<Likes />} />
              <Route path="profile" element={<Profile />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="confirm" element={<Confirm />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
