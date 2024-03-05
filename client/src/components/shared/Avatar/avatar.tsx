import React from "react";
import { AvatarProps } from "./types";
import Image from "next/image";

const Avatar: React.FC<AvatarProps> = () => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <h1 className="text-initial-black">John Doe</h1>
      </div>
      <div className="relative w-[3rem] h-[3rem] rounded-full">
        <Image
          src="/images/profile.png"
          alt="profile_navbar_picture"
          className="w-auto h-auto object-cover"
          fill
        />
      </div>
    </div>
  );
};

export { Avatar };
