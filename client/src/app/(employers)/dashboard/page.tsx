import { Statistics } from "@/components/Employers/Dashboard/Overview/Statistics";
import React from "react";

const Dashboard = () => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-[3px]">
        <div>
          <h1 className="text-base-black">Hi There, Ubisoft</h1>
        </div>
        <div>
          <p className="text-initial-gray">Gain Valuable Insights</p>
        </div>
      </div>
      <div>
        <Statistics />
      </div>
    </section>
  );
};

export default Dashboard;
