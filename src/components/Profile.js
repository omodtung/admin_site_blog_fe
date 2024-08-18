import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";
import * as actions from "../redux/actions";
import { toast } from "react-toastify";

import requestApi from "../helpers/api";
const Profile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({});
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  useEffect(() => {
    dispatch(actions.controlLoading(true));
    requestApi("/user/profile", "GET")
      .then((res) => {
        console.log("res =>", res);
        setProfileData({
          ...res.data,
          avatar: process.env.REACT_APP_API_URL + "/" + res.data.avatar,
        });
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log("err=>", err);
        dispatch(actions.controlLoading(false));
      });
  }, []);
  const onImageChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          avatar: reader.result,
          file: file,
        });
        setIsSelectedFile(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpdateAvatar = () => {
    let formData = new FormData();
    formData.append("avatar", profileData.file);
    dispatch(actions.controlLoading(true));
    requestApi(
      "/user/upload-avatar",
      "POST",
      formData,
      "json",
      "multipart/form-data"
    )
      .then((res) => {
        console.log("res=>", res);
        dispatch(actions.controlLoading(false));
        // toast in here
      })
      .catch((err) => {
        console.log("err=>", err);
        dispatch(actions.controlLoading(false));
      });
  };
  return (
    <div id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <h1 class="mt-4">Profile</h1>
          <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">update avatar</li>
          </ol>
          <div class="card mb-4">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-md-4">
                  <img
                    src={
                      profileData.avatar
                        ? profileData.avatar
                        : "../assets/images/default_pic_ava.png"
                    }
                    className="profile-user"
                  />
                  <div className="input-file float-start">
                    <label
                      htmlFor="file"
                      className="btn-file btn-sm btn btn-primary"
                    >
                      {" "}
                      Browse File{" "}
                    </label>
                    <input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={onImageChange}
                    />
                  </div>
                  {isSelectedFile && (
                    <button
                      className="btn btn-sm btn-success float-end"
                      onClick={handleUpdateAvatar}
                    >
                      {" "}
                      update{" "}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
