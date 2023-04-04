import React from "react";
import CompanyItem from "./CompanyItem";

const CompanyList = ({ companies }) => {
  return (
    <ul className="company_list">
      {companies.map((company) => {
        const { id, logo, name, employers, jobs, salary, rating } = company;

        return (
          <CompanyItem
            key={id}
            id={id}
            logo={logo}
            name={name}
            employers={employers}
            jobs={jobs}
            salary={salary}
            rating={rating}
          />
        );
      })}
    </ul>
  );
};

export default CompanyList;
