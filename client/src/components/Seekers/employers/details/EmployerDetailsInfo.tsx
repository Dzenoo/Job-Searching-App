import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Building, Camera, FileText, Text } from "lucide-react";

import useFollowEmployer from "@/hooks/mutations/useFollowEmployer";
import { EmployerTypes } from "@/types";
import { findIndustriesData } from "@/lib/utils";
import { renderIconText } from "@/helpers";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigator from "@/components/ui/navigator";

import FollowEmployerButton from "../FollowEmployerButton";

type EmployerDetailsInfoProps = {
  employer: EmployerTypes;
};

const EmployerDetailsInfo: React.FC<EmployerDetailsInfoProps> = ({
  employer,
}) => {
  const { mutateAsync: followEmployerMutate, isLoading } = useFollowEmployer(
    employer?._id
  );
  const employerIndustry = findIndustriesData(employer?.industry);

  const FooterEmployerData = new Array(
    {
      id: "1",
      icon: <Camera color="gray" />,
      data: employer?.followers.length + " Followers",
    },
    {
      id: "2",
      icon: <Text color="gray" />,
      data: employer?.reviews.length + " Reviews",
    },
    {
      id: "3",
      icon: <FileText color="gray" />,
      data: employer?.events.length + " Events",
    }
  );

  return (
    <div className="flex flex-col gap-6">
      <Navigator info="Employers" href={"/companies"} title={employer?.name} />
      <Card>
        <div className="flex gap-3 overflow-auto justify-between max-lg:flex-wrap">
          <div className="flex sm:items-center gap-3 max-sm:flex-col">
            <CardHeader>
              <div>
                <Image
                  src={employer?.image}
                  alt={employer?.name}
                  width={100}
                  height={100}
                  className="object-cover w-auto h-auto"
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="rounded-full bg-blue-100 p-3 w-fit dark:bg-blue-300">
                <p className="text-initial-blue">
                  {employer?.address || "Location"}
                </p>
              </div>
              <div>
                <h1 className="text-base-black">{employer?.name}</h1>
              </div>
              <div>
                {renderIconText({
                  id: "1",
                  icon: <Building color="gray" />,
                  data: employerIndustry,
                })}
              </div>
            </CardContent>
          </div>
          <CardFooter className="flex flex-col justify-between gap-10 max-lg:basis-full">
            <div className="flex items-center gap-6 flex-wrap justify-between">
              {FooterEmployerData.map((data) => renderIconText(data))}
            </div>
            <div className="flex items-center justify-end gap-6 max-lg:justify-stretch max-lg:flex-wrap">
              <div>
                <Link
                  href={employer?.website || ""}
                  className="text-initial-blue"
                >
                  Visit Website
                </Link>
              </div>
              <div>
                <Link href={`/companies/${employer?._id}/review`}>
                  <Button variant="outline">Review</Button>
                </Link>
              </div>
              <div>
                <FollowEmployerButton employerId={employer?._id} />
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-base-black">About</h1>
        </div>
        <div>
          <p className="text-initial-gray">
            {employer?.company_description || "No Biography Defined"}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default EmployerDetailsInfo;
