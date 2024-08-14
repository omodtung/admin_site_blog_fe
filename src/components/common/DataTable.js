import React, { useEffect, useState } from "react";
import LiveSearch from "./LiveSearch";

const DataTable = (props) => {
  const {
    name,
    data,
    columns,
    currentPage,
    numOfPage,
    onPageChange,
    onChangeItemsPerPage,
    onKeySearch
  } = props;
  const renderHeaders = () => {
    return columns.map((col, index) => <th key={index}>{col.name}</th>);
  };
  const renderData = () => {
    return data.map((item, index) => (
      <tr key={index}>
        {columns.map((col, ind) => (
          <td key={ind}>
            {typeof col.element === "function" ? (
              col.element(item)
            ) : (
              <span>{col.element}</span>
            )}
          </td>
        ))}
      </tr>
    ));
  };
  const renderPagination = () => {
    const pagination = [];
    const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
    const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;
    pagination.push(
      <li key="prev" className={prevPage ? "page-item" : "page-item disabled"}>
        <button className="page-link" onClick={() => onPageChange(prevPage)}>
          &laquo;
        </button>
      </li>
    );
    // css in Boostrap active
    // <nav class="p-2" aria-label="Pagination">
    //   <ul class="pagination justify-content-end mb-0 flex-wrap">
    //   <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
    //   <li class="page-item active"><a class="page-link" href="#">1</a></li>
    //   <li class="page-item active"><a class="page-link" href="#">2</a></li>
    //   <li class="page-item active"><a class="page-link" href="#">3</a></li>
    //   <li class="page-item"><a class="page-link" href="#">Next</a></li>
    // </ul>
    // </nav>
    for (let i = 1; i <= numOfPage; i++) {
      pagination.push(
        <li
          key={i}
          className={currentPage === i ? "page-item active" : "page-item"}
        >
          <button className="page-link" onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    pagination.push(
      <li key="next" className={nextPage ? "page-item" : "page-item disabled"}>
        <button className="page-link" onClick={() => onPageChange(nextPage)}>
          &raquo;
        </button>
      </li>
    );
    return pagination;
  };
  const onChangeOption = (event) => {
    const target = event.target;
    console.log("-----target---");
    console.log(target);
    console.log("----target-----------");
    console.log("change item per page to=> ", target.value);
    onChangeItemsPerPage(target.value);
  };
  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1"></i>
          {name}
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-sm-12 col-md-6">
              <label className="d-inline-flex">
                Show
                <select
                  name="example_length"
                  className="form-select form-select-sm ms-1 me-1"
                  onChange={onChangeOption}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>{" "}
                entries
              </label>
            </div>
            <div className="col-sm-12 col-md-6">
              <label className="d-inline-flex float-end">Search:
              <LiveSearch onKeySearch={onKeySearch}/>
              </label>
            </div>
          </div>
          <table
            className="table table-striped table-bordered"
            cellSpacing="0"
            width="100%"
          >
            <thead>
              <tr>{renderHeaders()}</tr>
            </thead>
            <tbody>{renderData()}</tbody>
            <tfoot>
              <tr>
                <td></td>
                {renderHeaders()}
              </tr>
            </tfoot>
          </table>
          {numOfPage > 1 && (
            <div className="row">
              <div className="col-sm-12 col-md-7">
                <ul className="pagination justify-content-end">
                  {renderPagination()}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
