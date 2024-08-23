import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Camera, FileText, Text } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { renderIconText } from "@/helpers";
import { EmployerTypes } from "@/types";

import FollowEmployerButton from "./FollowEmployerButton";

type EmployersItemProps = {
  employer: EmployerTypes;
};

const EmployerItem: React.FC<EmployersItemProps> = ({ employer }) => {
  const FooterEmployerData = new Array(
    {
      id: "1",
      icon: <Camera color="gray" />,
      data: employer.followers.length + " Followers",
    },
    {
      id: "2",
      icon: <Text color="gray" />,
      data: employer.reviews.length + " Reviews",
    },
    {
      id: "3",
      icon: <FileText color="gray" />,
      data: employer.events.length + " Events",
    }
  );

  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 max-md:flex-col">
          <div>
            <Image
              src={employer?.image}
              alt={employer?.name}
              width={100}
              height={100}
              className="object-cover w-auto h-auto"
            />
          </div>
          <div className="flex flex-col gap-3 basis-full">
            <div className="flex items-center gap-3 justify-between">
              <div>
                <Link href={`/companies/${employer._id}?typeEmp=jobs`}>
                  <h1 className="text-base-black font-bold">{employer.name}</h1>
                </Link>
              </div>
              <div>
                <FollowEmployerButton employerId={employer._id} />
              </div>
            </div>
            <div>
              <p className="text-initial-gray truncate">
                {employer.company_description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-6 dark:border-[#0d0d0d]">
        <div className="gap-6 flex items-center justify-between flex-wrap">
          {FooterEmployerData.map((data) => renderIconText(data))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmployerItem;
