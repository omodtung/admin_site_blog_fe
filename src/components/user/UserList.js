import React, { useEffect ,useState} from "react";
import DataTable from "../common/DataTable";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
const UserList = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const [numOfPage, setNumOfPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    dispatch(actions.controlLoading(true));
    requestApi(`/user`, "GET", [])
      .then((response) => {
        console.log("response = >", response);
        setUsers(response.data.data);
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(actions.controlLoading(false));
      });
  }, []);


  const columns = [
    {
        name: "ID",
        element: row => row.id
    },
    {
        name: "First name",
        element: row => row.first_name
    },
    {
        name: "Last name",
        element: row => row.last_name
    },
    {
        name: "Email",
        element: row => row.email
    },
    {
        name: "Created at",
        element: row => row.created_at
    },
    {
        name: "Updated at",
        element: row => row.updated_at
    },
    {
        name: "Actions",
        element: row => (
            <>
                <button type="button" className="btn btn-sm btn-warning me-1"><i className="fa fa-pencil"></i> Edit</button>
                <button type="button" className="btn btn-sm btn-danger me-1" ><i className="fa fa-trash"></i> Delete</button>
            </>
        )
    }
]

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Tables</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Tables</li>
          </ol>
          <div className="mb-3">
            <button type="button" className="btn btn-sm btn-success me-2">
              <i className="fa fa-plus"></i> Add new
            </button>
           
              <button
                type="button"
                className="btn btn-sm btn-danger"
               
              >
                <i className="fa fa-trash"></i> Delete
              </button>
        
          </div>
          <DataTable
            name="List Users"
            data={users}
            columns={columns}
            numOfPage={numOfPage}
currentPage = {currentPage}
          ></DataTable>
        </div>
      </main>
     
    </div>
  );
};

export default UserList;
