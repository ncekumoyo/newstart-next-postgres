import React from "react";

const AuthHeader = ({ title }) => {
  return (
    <div className="text-center mb-3">
      <i className="fa fa-heart-pulse fa-3x text-success"></i>
      <h1 className="display-6 fw-bold">
        Newstart
        <br />
        Health App
        <br />
        <span className="text-success">{title}</span>
      </h1>
    </div>
  );
};

export default AuthHeader;
