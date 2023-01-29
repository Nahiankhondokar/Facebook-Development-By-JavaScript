import React, { useRef } from "react";
import "../../assets/css/style.css";
import Button from "../../components/Button/Button";
import FbCard from "../../components/FbCard/FbCard";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Timeline from "../../components/Timeline/Timeline";
import "./Profile.css";

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
            <FbCard>
              <h3>Intro</h3>
              <div className="profile-bio">
                <p>-This is Bio-</p>
                <Button title="Edit Bio" />
              </div>
              {/* // Profile personal info */}
              <div className="personal-details-info">
                <ul>
                  <li>
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/OyWm6cSjuMt.png?_nc_eui2=AeFJ5YhayfVYeVqzA8Vxiw2oocTnxQvULLKhxOfFC9Qssv7SWwmA4k4nzNgL3KpCGTOeelHWZjvOhrMQz6yrvhQv"
                      alt=""
                    />
                    <p>Profile </p>
                  </li>

                  <li>
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/OyWm6cSjuMt.png?_nc_eui2=AeFJ5YhayfVYeVqzA8Vxiw2oocTnxQvULLKhxOfFC9Qssv7SWwmA4k4nzNgL3KpCGTOeelHWZjvOhrMQz6yrvhQv"
                      alt=""
                    />
                    <p>Profile </p>
                  </li>

                  <li>
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/OyWm6cSjuMt.png?_nc_eui2=AeFJ5YhayfVYeVqzA8Vxiw2oocTnxQvULLKhxOfFC9Qssv7SWwmA4k4nzNgL3KpCGTOeelHWZjvOhrMQz6yrvhQv"
                      alt=""
                    />
                    <p>Profile </p>
                  </li>
                </ul>
                <Button title="Edit Details" />
              </div>
              {/* // Hobbies */}
              <div className="personal-hobbies">
                <div className="hobbies-list">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/616/616616.png"
                    alt=""
                  />
                  <span>Trvelling</span>
                </div>

                <div className="hobbies-list">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/616/616616.png"
                    alt=""
                  />
                  <span>Trvelling</span>
                </div>

                <div className="hobbies-list">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/616/616616.png"
                    alt=""
                  />
                  <span>Trvelling</span>
                </div>
                <Button title="Edit Hobbies" />
              </div>

              {/* // Add featured */}
              <div className="prfile-featured">
                <div className="profile-featured-gallery">
                  <div className="profile-featured-item">
                    <div
                      className="profile-featured-image"
                      style={{
                        backgroundImage:
                          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSsuzJnbOMxh6xecDOaqPZP7ke_ZSVAMxngQfKFRfUd2ydXt24PU6yGTMA0un5ynZIH3Y&usqp=CAU')",
                      }}
                    ></div>
                    <span className="featured-count">+15</span>
                  </div>

                  <div className="profile-featured-item">
                    <div
                      className="profile-featured-image"
                      style={{
                        backgroundImage:
                          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSsuzJnbOMxh6xecDOaqPZP7ke_ZSVAMxngQfKFRfUd2ydXt24PU6yGTMA0un5ynZIH3Y&usqp=CAU')",
                      }}
                    ></div>
                    <span className="featured-count">+15</span>
                  </div>

                  <div className="profile-featured-item">
                    <div
                      className="profile-featured-image"
                      style={{
                        backgroundImage:
                          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSsuzJnbOMxh6xecDOaqPZP7ke_ZSVAMxngQfKFRfUd2ydXt24PU6yGTMA0un5ynZIH3Y&usqp=CAU')",
                      }}
                    ></div>
                    <span className="featured-count">+15</span>
                  </div>
                </div>
                <Button title="Edit Featured" />
              </div>
            </FbCard>

            <FbCard>
              <div className="profile-gallery">
                <div className="profile-header">
                  <h5>Photos</h5>
                  <a href="#">See all photos</a>
                </div>
                <div className="gallery-area">
                  <a
                    href="
                  #"
                  >
                    <img
                      src="https://www.pandotrip.com/wp-content/uploads/2018/07/San-Quirico-Val-d%E2%80%99Orcia-Tuscany-Italy.jpg"
                      alt=""
                    />
                  </a>
                  <a
                    href="
                  #"
                  >
                    <img
                      src="https://www.pandotrip.com/wp-content/uploads/2018/07/San-Quirico-Val-d%E2%80%99Orcia-Tuscany-Italy.jpg"
                      alt=""
                    />
                  </a>

                  <a
                    href="
                  #"
                  >
                    <img
                      src="https://www.pandotrip.com/wp-content/uploads/2018/07/San-Quirico-Val-d%E2%80%99Orcia-Tuscany-Italy.jpg"
                      alt=""
                    />
                  </a>

                  <a
                    href="
                  #"
                  >
                    <img
                      src="https://www.pandotrip.com/wp-content/uploads/2018/07/San-Quirico-Val-d%E2%80%99Orcia-Tuscany-Italy.jpg"
                      alt=""
                    />
                  </a>

                  <a
                    href="
                  #"
                  >
                    <img
                      src="https://www.pandotrip.com/wp-content/uploads/2018/07/San-Quirico-Val-d%E2%80%99Orcia-Tuscany-Italy.jpg"
                      alt=""
                    />
                  </a>

                  <a
                    href="
                  #"
                  >
                    <img
                      src="https://www.pandotrip.com/wp-content/uploads/2018/07/San-Quirico-Val-d%E2%80%99Orcia-Tuscany-Italy.jpg"
                      alt=""
                    />
                  </a>

                  <a
                    href="
                  #"
                  >
                    <img
                      src="https://www.pandotrip.com/wp-content/uploads/2018/07/San-Quirico-Val-d%E2%80%99Orcia-Tuscany-Italy.jpg"
                      alt=""
                    />
                  </a>

                  <a
                    href="
                  #"
                  >
                    <img
                      src="https://www.pandotrip.com/wp-content/uploads/2018/07/San-Quirico-Val-d%E2%80%99Orcia-Tuscany-Italy.jpg"
                      alt=""
                    />
                  </a>

                  <a
                    href="
                  #"
                  >
                    <img
                      src="https://www.pandotrip.com/wp-content/uploads/2018/07/San-Quirico-Val-d%E2%80%99Orcia-Tuscany-Italy.jpg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </FbCard>

            <FbCard>
              <div className="profile-all-friend">
                <div className="profile-header">
                  <div>
                    <h5 ref={h5}>Friends</h5>
                    <div className="friends-count" ref={friends}>
                      151 firends
                    </div>
                  </div>
                  <a href="#">See all friends</a>
                </div>
                <div className="friends-area">
                  <div className="friend-item">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature.jpg"
                      alt=""
                    />
                    <a href="">Nahian</a>
                  </div>

                  <div className="friend-item">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature.jpg"
                      alt=""
                    />
                    <a href="">Nahian</a>
                  </div>

                  <div className="friend-item">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature.jpg"
                      alt=""
                    />
                    <a href="">Nahian</a>
                  </div>

                  <div className="friend-item">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature.jpg"
                      alt=""
                    />
                    <a href="">Nahian</a>
                  </div>

                  <div className="friend-item">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature.jpg"
                      alt=""
                    />
                    <a href="">Nahian</a>
                  </div>

                  <div className="friend-item">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature.jpg"
                      alt=""
                    />
                    <a href="">Nahian</a>
                  </div>

                  <div className="friend-item">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature.jpg"
                      alt=""
                    />
                    <a href="">Nahian</a>
                  </div>

                  <div className="friend-item">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature.jpg"
                      alt=""
                    />
                    <a href="">Nahian</a>
                  </div>

                  <div className="friend-item">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature.jpg"
                      alt=""
                    />
                    <a href="">Nahian</a>
                  </div>
                </div>
              </div>
            </FbCard>
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
