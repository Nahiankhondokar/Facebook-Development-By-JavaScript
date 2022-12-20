import React, { useState } from "react";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import Timeline from "../../components/Timeline/Timeline";

const Home = () => {
  return (
    <>
      <HomeHeader />

      <div className="fb-home-body">
        <Sidebar />

        <Timeline />
      </div>
    </>
  );
};

export default Home;
