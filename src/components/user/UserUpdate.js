import React, { useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as actions from "../../redux/actions";
import { useDispatch } from "react-redux";
import requestApi from "../../helpers/api";
// import { Toast } from "react-toastify/dist/components";
import { toast } from "react-toastify";

const UserUpdate = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const params = useParams();
  console.log("id user=>", params.id);

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const getDetailUser = async () => {
        const res = await requestApi(`/user/${params.id}`, "GET");
        console.log("res =>", res);
        dispatch(actions.controlLoading(false));
        const fields = ['first_name','last_name','status']
        fields.forEach((field)=>
        setValue(field ,res.data[field])
        )
      };
      getDetailUser();
    } catch (error) {
      console.log("error=>", error);
      dispatch(actions.controlLoading(false));
    }
  },[]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmitFormUpdate = async (data) => {
    console.log("data form = >", data);
    // dispatch(actions.controlLoading(true));
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/user/${params.id}`, "PUT", data);
      
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
              <Link to="/users"> Users</Link>
            </li>
            <li className="breadcrumb-item active">Edit Site</li>
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
                        placeholder="Enter your first name"
                        {...register("first_name", {
                          required: "First Name Is Required",
                        })}
                      />
                      <label for="inputFirstName">First name</label>
                      {errors.first_name && (
                        <p style={{ color: "red" }}>
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-floating">
                      <input
                        class="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                        {...register("last_name", {
                          required: "last Name Name Is Required",
                        })}
                      />
                      <label for="inputLastName">Last name</label>
                      {errors.last_name && (
                        <p style={{ color: "red" }}>
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  {/* <div className="row mb-3"> */}

                  {/* </div> */}

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

export default UserUpdate;
