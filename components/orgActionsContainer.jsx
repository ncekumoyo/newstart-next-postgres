import React from "react";

const OrgActionsContainer = ({ children }) => {
  return (
    <div className="mx-auto bg-success rounded mb-3 d-flex justify-content-end p-3" style={{ maxWidth: 400 }}>
      {children}
    </div>
  );
};

export default OrgActionsContainer;
