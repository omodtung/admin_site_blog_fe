import React, { useDebugValue, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { set, useForm } from "react-hook-form";
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

const PostUpdate = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState([]);
  const [category, setCategory] = useState([]);
  const [postData, setPostData] = useState({});
  const handleSubmitFormUpdate = async (data) => {
    console.log("data form ----------------------------------= >", data);
    dispatch(actions.controlLoading(true));
    let formData = new FormData();
    console.log("form-data =>", formData);
    for (let key in data) {
      if (key == "thumbnail") {
        if (data.thumbnail[0] instanceof File) {
          formData.append(key, data[key][0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(
        `/post/${param.id}`,
        "PATCH",
        formData,
        "json",
        "multipart/form-data"
      );
      console.log("res=>", res);
      dispatch(actions.controlLoading(false));
      // toast.success("Post has been  created succesfully", {
      //   position: "top-center",
      //   autoClose: 2000,
      // });
      setTimeout(() => navigate("/posts"), 3000);
    } catch (error) {
      console.log("error =>", error);
      dispatch(actions.controlLoading(false));
    }
  };

  // const onThumbnailChange = (event) => {
  //   if ( event.target.files[0]) {
  //     const file = event.target.files[0];
  //     let reader = new FileReader();
  //     reader.onload = (e) => {
  //       setPostData({ ...postData, thumbnail: reader.result,  file: file, });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const onThumbnailChange = (event) => {
    if (event.target.files[0] && event.target.files) {
      // const file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        setPostData({
          ...postData,
          thumbnail: reader.result,
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  useEffect(() => {
    dispatch(actions.controlLoading(true));
    // requestApi("/category", "GET")
    //   .then((rest) => {
    //     console.log("res=>", rest);
    //     setCategory(rest.data);
    //     dispatch(actions.controlLoading(false));
    //   })
    //   .catch((err) => {
    //     console.log("err = >", err);
    //     dispatch(actions.controlLoading(false));
    //   });

    try {
      const renderData = async () => {
        const res = await requestApi("/category", "GET");
        console.log("res =>", res);
        setCategory(res.data);
        const detailPost = await requestApi(`/post/${param.id}`, "GET");
        console.log("detailPost=>", detailPost);
        const fields = [
          "title",
          "summary",
          "description",
          "thumbnail",
          "category",
          "status",
        ];
        fields.forEach((field) => {
          if (field == "category") {
            setValue(field, detailPost.data[field].id);
          } else {
            setValue(field, detailPost.data[field]);
          }
        });
        setPostData({
          ...detailPost.data,
          thumbnail:
            process.env.REACT_APP_API_URL + "/" + detailPost.data.thumbnail,
        });

        dispatch(actions.controlLoading(false));
      };
      renderData();
    } catch (err) {
      console.log("err =>", err);
      dispatch(actions.controlLoading(false));
    }
  }, []);
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

                  <div class="col-md-6">
                    <div class="form-floating mb-3 mb-md-0">
                      <select
                        {...register("category", {
                          required: "Category Is Required  ",
                        })}
                        className="form-select"
                      >
                        <option value=""> Select a Category</option>
                        {category.map((cat) => {
                          return (
                            <option key={cat.id} value={cat.id}>
                              {" "}
                              {cat.name}
                            </option>
                          );
                        })}
                      </select>
                      <label for="inputEmail">Category</label>
                      {errors.status && (
                        <p style={{ color: "red" }}>{errors.status.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div class="card mb-4">
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col-md-4">
                        <img
                          src={postData.thumbnail}
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
                            // onChange={onThumbnailChange}

                            name="thumbnail"
                            {...register("thumbnail", {onChange:onThumbnailChange})}
                            accept="image/*"

                            // onChange={onThumbnailChange}
                          />
                        </div>
                        {/* {isSelectedFile && ( */}

                        {/* )} */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Description  */}
                <div class="col-md-6">
                  <div class="form-floating">
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
                        data={postData.description}
                        config={{
                          plugins: [Essentials, Bold, Italic, Paragraph],
                          toolbar: ["undo", "redo", "|", "bold", "italic"],
                        }}
                        // data="<p>Hello from the first editor working with the context!</p>"
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          console.log("Editor 1 is ready to use!", editor);
                          register("description", {
                            required: "Description is Required",
                          });
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          console.log({ event, editor, data });
                          setValue("description", data);
                          trigger("description");
                        }}
                        className="ckeditor-editor"
                      />
                    </CKEditorContext>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit(handleSubmitFormUpdate)}
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

export default PostUpdate;
