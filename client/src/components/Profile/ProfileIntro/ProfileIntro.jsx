import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../Button/Button";
import FbCard from "../../FbCard/FbCard";

const ProfileIntro = () => {
  const { user } = useSelector((state) => state.auth);

  // bio show
  const [bioShow, setBioShow] = useState(false);
  const [bioSaveBtn, setBioSaveBtn] = useState(true);
  const [bio, setBio] = useState(user.bio ?? "");
  const [bioCount, setBioCount] = useState(101 - bio);

  const handleBioShow = () => {
    setBioShow(true);
  };
  console.log(bio);
  // count boi length
  const handleBioLetter = (e) => {
    // console.log(e.target.value.length);
    setBio(e.target.value);
    setBioCount(101 - e.target.value.length);
    setBioSaveBtn(false);
  };
  // console.log(user);

  return (
    <>
      <FbCard>
        <h3>Intro</h3>
        <div className="profile-bio">
          {user.bio && !bioShow && (
            <>
              <p>-{user.bio}-</p>
              <button
                className="button-css"
                style={{ margin: "5px 0px" }}
                onClick={handleBioShow}
              >
                Edit Bio
              </button>
            </>
          )}
          {!user.bio && !bioShow && (
            <>
              <button
                className="button-css"
                style={{ margin: "5px 0px" }}
                onClick={handleBioShow}
              >
                Add Bio
              </button>
            </>
          )}

          {bioShow && (
            <>
              <div className="click-update">
                <textarea
                  placeholder="Describe who your are"
                  name=""
                  onChange={handleBioLetter}
                >
                  {bio}
                </textarea>
                <p>{bioCount} character reaming</p>
                <div className="click-update-btn">
                  <div className="bio-status">
                    <img
                      className="earth-icon"
                      src="https://cdn-icons-png.flaticon.com/512/44/44386.png"
                      alt=""
                    />
                    <span></span>
                    Public
                  </div>
                  <div className="bio-btn">
                    <button onClick={() => setBioShow(false)}>Cancel</button>
                    <button disabled={bioSaveBtn}>Save</button>
                  </div>
                </div>
              </div>
            </>
          )}
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
    </>
  );
};

export default ProfileIntro;
