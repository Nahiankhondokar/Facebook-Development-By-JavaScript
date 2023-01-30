import React, { useRef } from "react";
import Button from "../../components/Button/Button";
import FbCard from "../../components/FbCard/FbCard";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import ProfileHeader from "../../components/Profile/ProfileHeader/ProfileHeader";
import ProfileIntro from "../../components/Profile/ProfileIntro/ProfileIntro";
import Timeline from "../../components/Timeline/Timeline";
import "./Profile.css";
import "../../assets/css/style.css";
import ProfilePhoto from "../../components/Profile/ProfilePhoto/ProfilePhoto";
import ProfileFriend from "../../components/Profile/ProfileFriend/ProfileFriend";

const Profile = () => {
  const h5 = useRef(null);
  console.log(h5.current);

  const friends = useRef(null);
  console.log(friends.current);

  return (
    <>
      <HomeHeader />
      <ProfileHeader />
      <div className="fb-profile-body">
        <div className="fb-profile-body-wrapper">
          <div className="user-profile-personal-info">
            <ProfileIntro />

            <ProfilePhoto />

            <ProfileFriend />
          </div>
          <div className="user-profile-posts">
            <Timeline size="100%" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
