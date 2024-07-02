import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import { CourseProvider } from "./contexts/CoursesApis";
import { ProfileProvider } from "./contexts/ProfileContext";
import { CartProvider } from "./contexts/CartContext";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
import ProtectedRoute from "./pages/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const FirstPage = lazy(() => import("./pages/FirstPage"));
const CarSystem = lazy(() => import("./pages/CarSystem"));
const Home = lazy(() => import("./pages/Homepage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Likes = lazy(() => import("./pages/Likes"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const MyLearning = lazy(() => import("./pages/MyLearning"));
const InProgress = lazy(() => import("./pages/InProgress"));
const Profile = lazy(() => import("./pages/Profile"));
const Confirm = lazy(() => import("./pages/ConfirmMail"));
const Courses = lazy(() => import("./pages/Courses"));
const Course = lazy(() => import("./pages/Course"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  const loggedIn = localStorage.getItem("isLoggedIn");
  
  return (
    <AuthProvider>
      <CourseProvider>
        <ProfileProvider>
          <CartProvider>
            <BrowserRouter>
              <Suspense fallback={<SpinnerFullPage />}>
                <Routes>
                  <Route
                    path="/"
                    element={loggedIn ? <Home /> : <FirstPage />}
                  />
                  <Route path="carsystem" element={<CarSystem />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="confirm" element={<Confirm />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="homepage" element={<Home />} />
                    <Route path="aboutus" element={<AboutUs />} />
                    <Route path="mylearning" element={<MyLearning />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="/courses/:id" element={<Course />} />
                    <Route path="inprogress" element={<InProgress />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="likes" element={<Likes />} />
                    <Route path="profile" element={<Profile />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </CartProvider>
        </ProfileProvider>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
