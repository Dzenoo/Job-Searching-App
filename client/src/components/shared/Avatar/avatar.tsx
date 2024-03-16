import React from "react";
import { AvatarProps } from "./types";
import Image from "next/image";

const Avatar: React.FC<AvatarProps> = ({ image, name }) => {
  const profileImageUrl = image?.includes("https:")
    ? image
    : `https://job-searching-application.s3.amazonaws.com/${image}`;

  return (
    <div className="flex items-center gap-3">
      <div>
        <h1 className="text-initial-black">{name}</h1>
      </div>
      <div className="relative w-[3rem] h-[3rem] rounded-full">
        <Image
          src={profileImageUrl}
          alt="profile_navbar_picture"
          className="w-28 h-28 object-cover rounded-full"
          fill
        />
      </div>
    </div>
  );
};

export { Avatar };
