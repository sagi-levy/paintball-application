import React from "react";
import PageHeader from "../pageHeader";
import BasicPackages from "./basicPackages";
const ActivityDetails = ({ title, description, icon }) => {
  return (
    <div className="mb-4 col-lg-4 col-sm-12">
      <h2 className="mb-3">{title}</h2>
      <div className="d-flex align-items-center">
        <div className="me-3">{icon}</div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ActivityDetails;
