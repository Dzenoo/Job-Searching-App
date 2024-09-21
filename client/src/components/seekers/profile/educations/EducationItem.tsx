import React from "react";
import Image from "next/image";

import { Calendar, Trash } from "lucide-react";

import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";

import useAuthentication from "@/hooks/defaults/useAuthentication";

import { deleteEducation } from "@/lib/actions/seekers.actions";
import { queryClient } from "@/context/react-query-client";

import { formatDate } from "@/lib/utils";
import { renderIconText } from "@/helpers";

export type EducationItemProps = {
  institution: string;
  graduationDate: string;
  fieldOfStudy: string;
  degree: string;
  _id: string;
};

const EducationItem: React.FC<EducationItemProps> = ({
  _id,
  degree,
  fieldOfStudy,
  graduationDate,
  institution,
}) => {
  const { toast } = useToast();
  const { userType, token } = useAuthentication().getCookieHandler();
  const { mutateAsync: deleteEducationMutate } = useMutation({
    mutationFn: () => deleteEducation(_id, token!),
    onSuccess: (response) => {
      toast({ title: "Success", description: response.message });
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const graduationDateFormatted = formatDate(graduationDate);

  return (
    <div className="dark:bg-[#1b1b1b] rounded-xl bg-white p-6 flex gap-3 items-center border border-gray-100 dark:border-[#3b3b3b] overflow-auto">
      <div className="max-sm:hidden">
        <Image
          src="/images/education.png"
          alt="education_card_image"
          width={150}
          height={150}
          priority
          className="w-10 h-10"
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

export default EducationItem;
