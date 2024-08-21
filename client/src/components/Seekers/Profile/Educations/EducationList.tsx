import React from "react";
import { EducationItem } from "./Item";
import { EducationItemProps } from "./Item/types";

type EducationListProps = {
  educations?: EducationItemProps[];
};

const EducationList: React.FC<EducationListProps> = ({ educations }) => {
  return (
    <div>
      <div className="text-center">
        {educations?.length === 0 && (
          <p className="text-initial-gray">No Educations Founded</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {educations?.map((education) => (
          <EducationItem
            _id={education._id}
            key={education._id}
            graduationDate={education.graduationDate}
            fieldOfStudy={education.fieldOfStudy}
            institution={education.institution}
            degree={education.degree}
          />
        ))}
      </div>
    </div>
  );
};

export default EducationList;
