import Image from "next/image";
import React from "react";

const SeekersNavbarAvatar: React.FC = () => {
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

export { SeekersNavbarAvatar };
