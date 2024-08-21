import React from "react";
import { EducationItemProps } from "./types";
import Image from "next/image";
import { Calendar, Trash } from "lucide-react";
import { renderIconText } from "@/lib/jsx/render-icon-text";
import { formatDate } from "@/lib/date";
import { useMutation } from "react-query";
import { deleteEducation } from "@/lib/actions/seekers.actions";
import useAuthentication from "@/hooks/useAuthentication";
import { toast } from "react-toastify";
import { queryClient } from "@/contexts/react-query-client";

const EducationItem: React.FC<EducationItemProps> = ({
  _id,
  degree,
  fieldOfStudy,
  graduationDate,
  institution,
}) => {
  const { userType, token } = useAuthentication().getCookieHandler();
  const { mutateAsync: deleteEducationMutate } = useMutation({
    mutationFn: () => deleteEducation(_id, token!),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const graduationDateFormatted = formatDate(graduationDate);

  return (
    <div className="dark:bg-[#1b1b1b] rounded-xl bg-white p-6 flex gap-3 border border-gray-100 dark:border-[#3b3b3b] overflow-auto">
      <div className="max-sm:hidden">
        <Image
          src="/images/education.png"
          alt="education_card_image"
          width={100}
          height={100}
          priority
          className="object-cover w-16 h-16 rounded-lg"
        />
      </div>
      <div className="flex justify-between gap-3 basis-full lg:items-center max-lg:flex-col">
        <div className="flex flex-col">
          <div className="whitespace-nowrap">
            <h1 className="font-bold">{institution}</h1>
          </div>
          <div>
            <p className="text-initial-gray">
              {degree} deegre, {fieldOfStudy}
            </p>
          </div>
        </div>
        <div className="flex items-end lg:flex-col max-lg:justify-between max-lg:items-center">
          {userType === "seeker" && (
            <div>
              <button onClick={async () => await deleteEducationMutate()}>
                <Trash color="red" />
              </button>
            </div>
          )}
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
