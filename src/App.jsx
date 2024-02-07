import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContxt";
import React, { Suspense, lazy } from "react";
import { RatingsProvider } from "./contexts/RatingContext";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";
import Course from "./pages/Course";

const Home = lazy(() => import("./pages/Homepage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Likes = lazy(() => import("./pages/Likes"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const MyLearning = lazy(() => import("./pages/MyLearning"));
const InProgress = lazy(() => import("./pages/InProgress"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Courses = lazy(() => import("./pages/Courses"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  return (
    <AuthProvider>
      <RatingsProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Home />} />
                <Route path="aboutus" element={<AboutUs />} />
                <Route path="courses" element={<Courses />}>
                  <Route path="/courses/:id" component={Course} />
                </Route>
                <Route path="mylearning" element={<MyLearning />} />
                <Route path="inprogress" element={<InProgress />} />
                <Route path="likes" element={<Likes />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />

                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route index element={<CityList />} />
                  <Route path="cities" element={<CityList />} />
                  {/* <Route path="cities/:id" element={<City />} /> */}
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </RatingsProvider>
    </AuthProvider>
  );
}
export default App;
