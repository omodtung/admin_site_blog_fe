import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const UserAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
            <li className="breadcrumb-item active">Add Site</li>
          </ol>

          <div className="mb-3">
            <button type="button" className="btn btn-sm btn-success me-2">
              <i className="fa fa-plus"></i> Add new
            </button>
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
                    </div>
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                    {...register("email", {
                      required: "Email Is Required",
                      pattern: {
                        value: /^\A[A-Z0-9+_.-]+@[A-Z0-9.-]+\Z$/,
                        message: " Invalid Email Address",
                      },
                    })}
                  />
                  <label for="inputEmail">Email address</label>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-floating mb-3 mb-md-0">
                      <input
                        class="form-control"
                        id="inputPassword"
                        type="password"
                        placeholder="Create a password"
                        {...register("password", {
                          required: "Password Is Required",
                        })}
                      />
                      <label for="inputPassword">Password</label>
                    </div>
                  </div>

                  {/* <div className="row mb-3"> */}
                
                  {/* </div> */}

                  <div class="col-md-6">
                    <div class="form-floating mb-3 mb-md-0">
                
                        <select {...register("status")} className="form-select">
                          <option value="1"> Active</option>
                          <option value="2"> InActive</option>
                        </select>
                        <label for="inputEmail">Status</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserAdd;
