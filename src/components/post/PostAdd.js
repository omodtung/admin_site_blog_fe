import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as actions from "../../redux/actions";
import { useDispatch } from "react-redux";
import requestApi from "../../helpers/api";
// import { Toast } from "react-toastify/dist/components";
import { toast } from "react-toastify";

import {
  ClassicEditor,
  Context,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  ContextWatchdog,
} from "ckeditor5";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";

import "ckeditor5/ckeditor5.css";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const PostAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmitFormAdd = async (data) => {
    console.log("data form = >", data);
    // dispatch(actions.controlLoading(true));
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi("/user", "POST", data);
      console.log("res =>", res);

      // fix Dispatch
      dispatch(actions.controlLoading(false));

      //fix toastify
      // toast.success("User Has been Created Successfully", {
      //   position: "top-center",
      //   autoClose: 2000,
      // });

      setTimeout(() => navigate("/users"), 3000);
    } catch (error) {
      console.log("errors =>", error);
      dispatch(actions.controlLoading(false));
    }
  };

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Tables</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              {/* <a href="index.html">Dashboard</a>
               */}
              <Link to="/"> DashBoard </Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to="/posts"> Post</Link>
            </li>
            <li className="breadcrumb-item active">Add Post Site</li>
          </ol>

          <div className="mb-3">
            <br></br>
            <div className="card-body">
              <form>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-floating mb-3 mb-md-0">
                      <input
                        class="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your Title"
                        {...register("title", {
                          required: "Title Is Required",
                        })}
                      />
                      <label for="inputFirstName"> Title </label>
                      {errors.title && (
                        <p style={{ color: "red" }}>{errors.title.message}</p>
                      )}
                    </div>
                  </div>

                  {/* status */}
                  <div class="col-md-6">
                    <div class="form-floating mb-3 mb-md-0">
                      <select
                        {...register("status", {
                          required: "status Is Required  ",
                        })}
                        className="form-select"
                      >
                        <option value="1"> Active</option>
                        <option value="2"> InActive</option>
                      </select>
                      <label for="inputEmail">Status</label>
                      {errors.status && (
                        <p style={{ color: "red" }}>{errors.status.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-floating mb-3 mb-md-0">
                      <input
                        class="form-control"
                        id="inputPassword"
                        type="text"
                        placeholder="Create a password"
                        {...register("summary", {
                          required: "Summary Is Required",
                        })}
                      />
                      <label for="inputPassword">Summary </label>
                      {errors.summary && (
                        <p style={{ color: "red" }}>{errors.summary.message}</p>
                      )}
                    </div>
                  </div>

                 
                </div>
                <div class="card mb-4">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-md-4">
                  <img
                    // src={
                    //   profileData.avatar
                    //     ? profileData.avatar
                    //     : "../assets/images/default_pic_ava.png"
                    // }
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
                      // onChange={onImageChange}
                    />
                  </div>
                  {/* {isSelectedFile && ( */}
                    <button
                      className="btn btn-sm btn-success float-end"
                      // onClick={handleUpdateAvatar}
                    >
                      {" "}
                      update{" "}
                    </button>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
                {/* Description  */}
                <div class="col-md-6">
                  <div class="form-floating">
                    <label for="inputLastName"> Description</label>
                    {errors.description && (
                      <p style={{ color: "red" }}>
                        {errors.description.message}
                      </p>
                    )}

                    <CKEditorContext
                      context={Context}
                      contextWatchdog={ContextWatchdog}
                    >
                      <CKEditor
                    
                        editor={ClassicEditor}
                        config={{
                          plugins: [Essentials, Bold, Italic, Paragraph],
                          toolbar: ["undo", "redo", "|", "bold", "italic"],
                        }}
                        data="<p>Hello from the first editor working with the context!</p>"
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          console.log("Editor 1 is ready to use!", editor);
                          register('description',{required:'Description is Required'})
                        }}
                        onChange={(event,editor) =>
                        {
                          const data = editor.getData();
                          console.log ({event,editor,data})

                        }}
                      />
                    </CKEditorContext>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit(handleSubmitFormAdd)}
                  className="btn btn-success"
                >
                  {" "}
                  SubMit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostAdd;
