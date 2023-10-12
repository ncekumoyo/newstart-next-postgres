import React from "react";
import useToggle from "@/hooks/useToggle";

const TogglablePassword = ({ label, reference }) => {
  const { value: passwordVisible, toggle } = useToggle(false);
  return (
    <>
      <label className="fw-bold ms-1 mb-1">
        {label}
        <span className="fw-bold text-danger">* </span>
      </label>
      <div className="d-flex align-items-center rounded mb-3 bg-white">
        <input
          type={`${passwordVisible ? "text" : "password"}`}
          className="form-control flex-grow-1 border-0 p-2 input-control"
          ref={reference}
          required
        />
        <button
          type="button"
          className="border-0 bg-white"
          onClick={() => {
            toggle((current) => !current);
          }}
        >
          <i className={`fa fa-eye${passwordVisible ? "-slash" : ""} px-2`}></i>
        </button>
      </div>
    </>
  );
};

export default TogglablePassword;
