import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/FakeAuthContxt";
import React, { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
import Course from "./pages/Course";
import ConfirmMail from "./pages/ConfirmMail";

const Home = lazy(() => import("./pages/Homepage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Likes = lazy(() => import("./pages/Likes"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const MyLearning = lazy(() => import("./pages/MyLearning"));
const InProgress = lazy(() => import("./pages/InProgress"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Confirm = lazy(() => import("./pages/ConfirmMail"));
const Courses = lazy(() => import("./pages/Courses"));
const FirstPage = lazy(() => import("./pages/FirstPage"));
const Cart = lazy(() => import("./pages/Cart"));


function App() {
  return (
    <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<FirstPage />} />
                <Route path="homePage" element={<Home />} /> 
                <Route path="aboutus" element={<AboutUs />} />
                <Route path="courses" element={<Courses />}>
                  <Route path="/courses/:id" component={Course} />
                </Route>
                <Route path="mylearning" element={<MyLearning />} />
                <Route path="inprogress" element={<InProgress />} />
                <Route path="cart" element={<Cart />} />
                <Route path="likes" element={<Likes />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />
                <Route path="confirm" element={<ConfirmMail />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>   
    </AuthProvider>
  );
}
export default App;
