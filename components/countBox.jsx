import Link from "next/link";
import React from "react";

const CountBox = ({ title, count, route }) => {
  return (
    <Link href={route} className="btn btn-light ms-2 mb-2" style={{ width: 150, height: 150 }}>
      <h3 className="lead fw-bold mb-3">{title}</h3>
      <span className="display-6 text-success">{count}</span>
    </Link>
  );
};

export default CountBox;
