import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Activation from "./pages/Activation/Activation";
import Profile from "./pages/Profile/Profile";
import ForgotPass from "./pages/ForgotPass/ForgotPass";
import FindAccount from "./pages/FindAccount/FindAccount";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

function App() {
  return (
    <>
      <ToastContainer
        style={{ zIndex: 99999 }}
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activation/:key" element={<Activation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/find-account" element={<FindAccount />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default App;
