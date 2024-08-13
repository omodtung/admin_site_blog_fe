import React, { useEffect, useState } from "react";

const DataTable = (props) => {
  const { name, data, columns, currentPage, numOfPage } = props;
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
      <li key="prev" className="page-item">
        <button className="page-link">&laquo;</button>
      </li>
    );
    for (let i = 1; i <= numOfPage; i++) {
      pagination.push(
        <li key={i} className="page-item">
          <button className="page-link">{i}</button>
        </li>
      );
    }

    pagination.push(
      <li key="next" className="page-item">
        <button className="page-link">&raquo;</button>
      </li>
    );
    return pagination;
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
              <label className="d-inline-flex float-end">Search:</label>
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
          <div className="row">
            <div className="col-sm-12 col-md-7">
              <ul className="pagination justify-content-end">
                {renderPagination()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
