import React from "react";
import { companies } from "../../shared/data/data";
import { useParams } from "react-router-dom";

const CompanyDetails = () => {
  const compId = useParams().companyId;
  const currentCompany = companies.find((c) => c.id === compId);

  return (
    <>
      <h1>{currentCompany.name}</h1>
    </>
  );
};

export default CompanyDetails;
