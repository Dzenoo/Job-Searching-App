import React from "react";
import { EducationItemProps } from "./types";
import Image from "next/image";
import { Calendar, Trash } from "lucide-react";
import { renderIconText } from "@/utils/jsx/render-icon-text";
import { formatDate } from "@/utils/date";

const EducationItem: React.FC<EducationItemProps> = ({
  degree,
  fieldOfStudy,
  graduationDate,
  institution,
}) => {
  const graduationDateFormatted = formatDate(graduationDate);

  return (
    <div className="rounded-xl bg-white p-6 flex gap-3 border border-gray-100">
      <div>
        <Image
          src="/images/education.png"
          alt="education_card_image"
          width={100}
          height={100}
          priority
          className="object-cover w-16 h-16 rounded-lg"
        />
      </div>
      <div className="flex justify-between gap-3 basis-full items-center">
        <div className="flex flex-col">
          <div>
            <h1 className="font-bold">{institution}</h1>
          </div>
          <div>
            <p className="text-initial-gray">
              {degree} deegre, {fieldOfStudy}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div>
            <button>
              <Trash color="red" />
            </button>
          </div>
          <div>
            {renderIconText({
              id: "1",
              data: graduationDateFormatted,
              icon: <Calendar />,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { EducationItem };
