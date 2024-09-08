import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Camera, Text } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { renderIconText } from "@/helpers";
import { EmployerTypes } from "@/types";

import FollowEmployerButton from "./FollowEmployerButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/lib/utils";

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
    }
  );

  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 max-md:flex-col">
          <Avatar className="w-28 h-28">
            <AvatarImage
              src={getImageUrl(employer?.image)}
              className="object-cover w-auto h-auto"
            />
          </Avatar>
          <div className="flex flex-col gap-1 basis-full">
            <div className="flex gap-3 justify-between max-sm:flex-col sm:items-center">
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
        <div className="w-full gap-6 flex items-center justify-between flex-wrap">
          {FooterEmployerData.map((data) => renderIconText(data))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmployerItem;
