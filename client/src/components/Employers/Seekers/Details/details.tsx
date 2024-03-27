import React from "react";
import { SeekerDetailsInfoProps } from "./types";
import { Card, CardContent, CardHeader } from "@/components/Shared/Card";
import Navigator from "@/components/Shared/Navigator";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl, getSkillsData } from "@/utils/helpers";
import { Github, Linkedin, LucideImage } from "lucide-react";
import { Button } from "@/components/Shared/Button";
import { EducationList } from "@/components/Seekers/Profile/Educations/list";

const SeekerDetailsInfo: React.FC<SeekerDetailsInfoProps> = ({ seeker }) => {
  const profileImageUrl = getImageUrl(seeker?.image);

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

  const categorizedSkills = getSkillsData(seeker?.skills);

  return (
    <div className="flex flex-col gap-6">
      <Navigator info="Seekers" href={"/seekers"} title={seeker?.first_name} />
      <Card>
        <CardHeader className="flex justify-between items-start gap-3">
          <div className="flex items-start gap-7">
            <div>
              <Image
                src={profileImageUrl}
                width={100}
                height={100}
                className="rounded-full w-28 h-28 object-cover"
                alt="seeker"
              ></Image>
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
            </div>
          </div>
          <div className="flex items-center gap-10">
            {SocialsArrays.map((socials) => (
              <Link href={socials.href} key={socials.id} target="_blank">
                {socials.icon}
              </Link>
            ))}
            <div>
              <Button variant="default">Message</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-initial-black">Biography</h1>
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
              <h1 className="text-initial-black">Education</h1>
            </div>
            <div>
              <EducationList educations={seeker?.education} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-initial-black">Skills</h1>
            </div>
            <div className="py-3 flex gap-6">
              {Object.entries(categorizedSkills).map(
                ([category, skills]) =>
                  skills.length > 0 && (
                    <div key={category} className="flex flex-col gap-3">
                      <div>
                        <h1 className="text-initial-black">{category}</h1>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
                          <div key={index} className="tag">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SeekerDetailsInfo };
