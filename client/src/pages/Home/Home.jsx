import React from "react";
import { useSelector } from "react-redux";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import Timeline from "../../components/Timeline/Timeline";

const Home = () => {
  return (
    <>
      <HomeHeader />

      <div className="fb-home-body">
        <Sidebar />

        <Timeline size="68%" />
      </div>
    </>
  );
};

export default Home;
