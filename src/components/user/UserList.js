import React, { useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const UserList = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState("single");
  const [refresh, setRefresh] = useState(Date.now());

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;
    requestApi(`/user${query}`, "GET", [])
      .then((response) => {
        console.log("response = >", response);
        setUsers(response.data.data);

        setNumOfPage(response.data.lastPage);

        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(actions.controlLoading(false));
      });
  }, [currentPage, itemsPerPage, searchString, refresh]);

  const handleDelete = (id) => {
    console.log("single Delete with id", id);
    setShowModal(true);

    setDeleteItem(id);

    setDeleteType("single");
  };
  const handleMultiDelete = () => {
    console.log("multi delete", selectedRows);
    setShowModal(true);
    setDeleteType("multi");
  };
  const columns = [
    {
      name: "ID",
      element: (row) => row.id,
    },
    {
      name: "First name",
      element: (row) => row.first_name,
    },
    {
      name: "Last name",
      element: (row) => row.last_name,
    },
    {
      name: "Email",
      element: (row) => row.email,
    },
    {
      name: "Created at",
      element: (row) => row.created_at,
    },
    {
      name: "Updated at",
      element: (row) => row.updated_at,
    },
    {
      name: "Actions",
      element: (row) => (
        <>
          <Link
            to={`/users/edit/${row.id}`}
            className="btn btn-sm btn-warning me-1"
          >
            <i className="fa fa-pencil"></i> Edit
          </Link>

          <button
            type="button"
            className="btn btn-sm btn-danger me-1"
            onClick={() => handleDelete(row.id)}
          >
            <i className="fa fa-trash"></i> Delete
          </button>
        </>
      ),
    },
  ];

  const requestDeleteApi = () => {
    if (deleteType == "single") {
      dispatch(actions.controlLoading(true));
      requestApi(`/user/${deleteItem}`, `DELETE`, [])
        .then((response) => {
          setShowModal(false);
          setRefresh(Date.now());
          dispatch(actions.controlLoading(false));
        })
        .catch((err) => {
          console.log(err);
          setShowModal(false);
          dispatch(actions.controlLoading(false));
        });
    } else {
      dispatch(actions.controlLoading(true));
      requestApi(`/user/multiple?ids=${selectedRows.toString()}`, `DELETE`, [])
        .then((response) => {
          setShowModal(false);
          setRefresh(Date.now());
          setSelectedRows([]);
          dispatch(actions.controlLoading(false));
        })
        .catch((err) => {
          console.log(err);
          setShowModal(false);
          dispatch(actions.controlLoading(false));
        });
    }
  };
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
              onClick={handleMultiDelete}
            >
              <i className="fa fa-trash"></i> Delete
            </button>
          </div>
          <DataTable
            name="List Users"
            data={users}
            columns={columns}
            numOfPage={numOfPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onChangeItemsPerPage={setItemsPerPage}
            onKeySearch={(keyword) => {
              console.log("keyword in user list comp=> ", keyword);
              setSearchString(keyword);
            }}
            onSelectedRows={(rows) => {
              console.log("selected rows in useList=>", rows);
              setSelectedRows(rows);
            }}
          ></DataTable>
        </div>
      </main>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete?</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
          <Button className="btn-danger" onClick={requestDeleteApi}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
