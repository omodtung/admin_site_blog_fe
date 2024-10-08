import React, { act } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions";
import requestApi from "../helpers/api";
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const dispatch = useDispatch();

  // dashboardData là một đối tượng JavaScript.
  // totalUser là một thuộc tính (property) của đối tượng dashboardData.
  // Việc sử dụng toán tử spread (...) trong setDashboardData đảm bảo rằng chúng ta không ghi đè lên các thuộc tính khác trong dashboardData mà chỉ thêm thuộc tính mới vào.
  useEffect(() => {
    // requestApi("/user", "GET", [])
    //   .then((response) => {
    //     console.log(response);
    //     setDashboardData({
    //       ...dashboardData,
    //       totalUser: response.data.total,
    //     });
    //   })

    //   .catch((err) => {
    //     console.log(err);
    //   });
// song song api user and post thuc hien phia frontend
    const promiseUser = requestApi("/user", "GET");
    const promisePost = requestApi("/post", "GET");

    dispatch(actions.controlLoading(true));
    Promise.all([promiseUser, promisePost])
      .then((res) => {
        console.log("res=>", res);
        setDashboardData(
          {
            ...dashboardData,totalUser:res[0].data.total ,totalPost :res[1].data.total
          }
        )
        dispatch(actions.controlLoading(false));
      })
      .catch((error) => {
        console.log("error=>", error);
        dispatch(actions.controlLoading(false));
      });
  }, []);
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-primary text-white mb-4">
                <div className="card-body">
                  Total Users
                 
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {dashboardData.totalUser}
                    </span>
                
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body">Total Post</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    View Details
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {dashboardData.totalPost}
                    </span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-success text-white mb-4">
                <div className="card-body">Success Card</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    View Details
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-danger text-white mb-4">
                <div className="card-body">Danger Card</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    View Details
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
