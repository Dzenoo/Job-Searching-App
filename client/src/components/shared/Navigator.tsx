import Image from "next/image";
import Link from "next/link";
import React from "react";

type NavigatorProps = {
  href: string;
  title: string;
};

const Navigator: React.FC<NavigatorProps> = ({ href, title }) => {
  return (
    <div className="flex items-center gap-6">
      <div>
        <Image
          src={"/images/logo/logo-icon.png"}
          alt="logo_light_talentify"
          width={40}
          height={40}
          loading="lazy"
        />
      </div>
      <div>
        <Link href={href} className="text-[--blue-base-color]">
          Jobs
        </Link>
      </div>
      <div>
        <p className="text-initial-gray">{title}</p>
      </div>
    </div>
  );
};

export default Navigator;
