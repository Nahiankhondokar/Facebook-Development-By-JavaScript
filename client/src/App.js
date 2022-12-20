import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import Activation from "./pages/Activation/Activation";
import Profile from "./pages/Profile/Profile";
import ForgotPass from "./pages/ForgotPass/ForgotPass";
import FindAccount from "./pages/FindAccount/FindAccount";
import LoadingBar from "react-top-loading-bar";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import AuthReject from "./middlewares/AuthReject";
import "./App.css";

function App() {
  // selector
  const loader = useSelector((state) => state.loader);
  const loaderDispatch = useDispatch();

  return (
    <>
      {/* Top Loader */}
      <LoadingBar
        color="red"
        progress={loader}
        onLoaderFinished={() => loaderDispatch({ type: "LOADER_END" })}
      />

      {/* Toaster */}
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
        <Route
          path="/home"
          element={
            <AuthReject>
              <Home />
            </AuthReject>
          }
        />
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
