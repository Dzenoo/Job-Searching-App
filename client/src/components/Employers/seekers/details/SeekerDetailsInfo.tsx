"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Github, Linkedin, LucideImage } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navigator from "@/components/ui/navigator";

import useGetEmployer from "@/hooks/mutations/useGetEmployer";

import EducationList from "@/components/seekers/profile/educations/EducationList";
import CreateDirectMessagesButton from "./CreateDirectMessagesButton";

import { SeekerTypes } from "@/types";
import { getImageUrl, getSkillsData } from "@/lib/utils";

type SeekerDetailsInfoProps = {
  seeker: SeekerTypes;
};

const SeekerDetailsInfo: React.FC<SeekerDetailsInfoProps> = ({ seeker }) => {
  const profileImageUrl = getImageUrl(seeker?.image);
  const categorizedSkills = getSkillsData(seeker?.skills);

  const SocialsArrays = new Array(
    {
      id: "1",
      href: seeker?.portfolio || "",
      icon: <LucideImage />,
    },
    {
      id: "2",
      href: seeker?.github || "",
      icon: <Github />,
    },
    {
      id: "3",
      href: seeker?.linkedin || "",
      icon: <Linkedin />,
    }
  );

  return (
    <div className="flex flex-col gap-6">
      <Navigator info="Seekers" href={"/seekers"} title={seeker?.first_name} />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-5 max-sm:flex-col">
            <div className="flex items-start gap-7 max-md:flex-col">
              <div>
                <Image
                  src={profileImageUrl}
                  width={100}
                  height={100}
                  className="rounded-full w-28 h-28 object-cover"
                  alt="seeker"
                />
              </div>
              <div className="flex flex-col gap-[3px]">
                <div>
                  <h1 className="text-base-black">
                    {seeker?.first_name} {seeker?.last_name}
                  </h1>
                </div>
                <div>
                  <p className="text-initial-gray">{seeker?.email}</p>
                </div>
                <div>
                  <p className="font-bold">{seeker?.overview}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-10 flex-wrap">
              {SocialsArrays.map((socials) => (
                <Link href={socials.href} key={socials.id} target="_blank">
                  {socials.icon}
                </Link>
              ))}
              <div>
                <CreateDirectMessagesButton seekerId={seeker?._id} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="font-bold">Biography</h1>
            </div>
            {seeker?.biography ? (
              <div>
                <p className="text-initial-gray">{seeker?.biography}</p>
              </div>
            ) : (
              <div>
                <p className="text-initial-gray">No Biography Defined</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="font-bold">Education</h1>
            </div>
            <div>
              <EducationList educations={seeker?.education} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="font-bold">Skills</h1>
            </div>
            <div className="py-3 flex gap-6 flex-wrap">
              {Object.entries(categorizedSkills).map(
                ([category, skills]) =>
                  skills.length > 0 && (
                    <div key={category} className="flex flex-col gap-3">
                      <div>
                        <h1 className="font-bold">{category}</h1>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
                          <Button variant="outline" key={index}>
                            {skill}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
            <div className="text-center">
              {seeker?.skills.length === 0 && (
                <p className="text-initial-gray">No Skills Founded</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeekerDetailsInfo;
