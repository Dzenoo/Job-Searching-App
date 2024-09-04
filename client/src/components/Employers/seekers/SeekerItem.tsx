import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Github, Linkedin, LucideImage } from "lucide-react";

import { SeekerTypes } from "@/types";
import { getImageUrl, getSkillNames } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SeekerItemProps = {
  seeker: SeekerTypes;
};

const SeekerItem: React.FC<SeekerItemProps> = ({ seeker }) => {
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

  const profileImageUrl = getImageUrl(seeker?.image);

  const skillNames = getSkillNames(seeker?.skills || []);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex items-center justify-center">
        <Image
          src={profileImageUrl}
          width={130}
          height={130}
          className="rounded-full w-36 h-36 object-cover"
          alt="seeker"
        />
      </CardHeader>
      <CardContent className="text-center flex flex-col justify-center items-center gap-3">
        <div>
          <Link href={`/seekers/${seeker?._id}`}>
            <h1 className="font-bold">
              {seeker?.first_name} {seeker?.last_name}
            </h1>
          </Link>
        </div>
        <div>
          <p className="text-initial-gray">{seeker?.email}</p>
        </div>
        <div>
          <p>{seeker?.overview}</p>
        </div>
        <div className="flex items-center gap-10 pt-3">
          {SocialsArrays.map((socials) => (
            <Link href={socials.href} key={socials.id} target="_blank">
              {socials.icon}
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-3 whitespace-nowrap overflow-hidden items-center justify-center">
          {skillNames.map((skillName, index) => (
            <Button variant="outline" key={index}>
              {skillName}
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SeekerItem;
