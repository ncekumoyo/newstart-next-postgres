import React from "react";
import Link from "next/link";

const ActionLink = ({ route, icon, bgColor, textColor }) => {
  return (
    <Link href={route} className={`rounded-circle btn btn-${bgColor} mx-1 p-2`} style={{ width: 45, height: 45 }}>
      <i className={`fa fa-${icon} text-${textColor}`}></i>
    </Link>
  );
};

export default ActionLink;
