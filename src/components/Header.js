import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function JumboTron() {
  return (
    <div className="jumbotron jumbotron-fluid text-center bg-danger">
      <div className="container">
        <h1 className="display-4 text-white font-weight-bold">Employee Directory</h1>
        <h2 className="lead text-white font-weight-bold">Search Employees below</h2>
      </div>
    </div>
  );
}
export default JumboTron;