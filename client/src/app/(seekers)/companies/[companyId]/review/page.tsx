"use client";

import Protected from "@/components/Hoc/Protected";
import { ReviewCompanyForm } from "@/components/Seekers/Employers/Details/Reviews/New";
import React from "react";

const ReviewCompany = ({ params }: { params: { companyId: string } }) => {
  return (
    <section className="flex flex-col gap-[10px] py-6 overflow-hidden mx-40 max-xl:mx-0">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-base-black">Review Employer</h1>
        </div>
        <div>
          <p className="text-initial-gray">
            Get insights into company culture, hiring processes, and employee
            experiences.
          </p>
        </div>
      </div>
      <div>
        <ReviewCompanyForm employerId={params.companyId} />
      </div>
    </section>
  );
};

export default Protected(ReviewCompany, ["seeker"]);
