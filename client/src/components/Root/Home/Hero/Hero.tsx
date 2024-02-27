import React from "react";
import { LinkElement } from "@/components/shared/Link";

const Hero: React.FC = () => {
  return (
    <section className="flex items-start gap-3">
      <div className="flex flex-col gap-6 basis-1/2">
        <div>
          <h1 className="text-6xl">
            Explore, Find, and Apply For Jobs that Make Professional
            Opportunities
          </h1>
        </div>
        <div>
          <p className="text-initial-gray">
            Connecting Job Seekers with Opportunities <br />
            and Employers with Talents
          </p>
        </div>
        <div className="pt-4">
          <LinkElement href="/find-jobs" variant="default">
            Find Jobs Now
          </LinkElement>
        </div>
      </div>
      <div className="basis-1/2"></div>
    </section>
  );
};

export { Hero };
