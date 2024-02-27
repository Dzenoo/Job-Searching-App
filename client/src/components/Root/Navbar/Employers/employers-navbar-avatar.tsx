import Image from "next/image";
import React from "react";

const EmployersNavbarAvatar: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <h1 className="text-initial-black">Tech</h1>
      </div>
      <div className="relative w-[3rem] h-[3rem] rounded-full">
        <Image
          src="/images/company.png"
          alt="profile_navbar_picture"
          className="w-auto h-auto object-cover"
          fill
        />
      </div>
    </div>
  );
};

export { EmployersNavbarAvatar };
