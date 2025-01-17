import "./App.css";
import Home from "./components/Home";
import Admin from "./components/Admin";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UpdateCourseForm from "./components/UpdateCourseForm";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import CourseOverview from "./components/CourseOverview";
import VideoPlayer from "./components/VideoPlayer";
import PaymentGateway from "./components/PaymentGateway";

const AuthWrapper = ({ 
  children, 
  requireAuth = true,
  showNavbar = true 
}: { 
  children: React.ReactNode, 
  requireAuth?: boolean,
  showNavbar?: boolean 
}) => {
  const token = localStorage.getItem("token");
  
  if (requireAuth && !token) {
    return <Navigate to="/signin" replace />;
  }
  
  if (!requireAuth && token) {
    return <Navigate to="/" replace />;
  }
  
  return <>
    {showNavbar && <Navbar />}
    {children}
  </>;
};

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AuthWrapper requireAuth={true} showNavbar={true}>
              <Home />
            </AuthWrapper>
          } />
          
          <Route path="/signin" element={
            <AuthWrapper requireAuth={false} showNavbar={false}>
              <SignIn />
            </AuthWrapper>
          } />
          
          <Route path="/signup" element={
            <AuthWrapper requireAuth={false} showNavbar={false}>
              <SignUp />
            </AuthWrapper>
          } />

          <Route path="/courses/:courseId" element={
            <AuthWrapper requireAuth={true} showNavbar={true}>
              <CourseOverview />
            </AuthWrapper>
          } />
          <Route path="/courses/:courseId/:videoId" element={
            <AuthWrapper requireAuth={true} showNavbar={true}>
              <VideoPlayer />
            </AuthWrapper>
          } />

          <Route path="/admin" element={
            <AuthWrapper requireAuth={true} showNavbar={true}>
              <Admin />
            </AuthWrapper>
          } />
          
          <Route path="/admin/update-course" element={
            <AuthWrapper requireAuth={true} showNavbar={true}>
              <UpdateCourseForm />
            </AuthWrapper>
          } />
          <Route path="/buy-course/:courseId" element={
            <AuthWrapper requireAuth={true} showNavbar={true}>
              <PaymentGateway />
            </AuthWrapper>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
