import React from "react";
import CompanyItem from "./CompanyItem";

const CompanyList = ({ companies }) => {
  return (
    <ul className="company_list">
      {companies.map((company) => {
        const {
          id,
          em_image,
          em_name,
          em_employees,
          em_jobs,
          em_salary,
          em_rating,
        } = company;
        return (
          <CompanyItem
            key={id}
            id={id}
            logo={em_image}
            name={em_name}
            employers={em_employees}
            jobs={em_jobs.length}
            salary={em_salary}
            rating={em_rating}
          />
        );
      })}
    </ul>
  );
};

export default CompanyList;
