import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterLinks } from "@/constants";

const Footer: React.FC = () => {
  return (
    <footer className="py-10 px-16 shadow-lg border-t bg-[#0d0d0d] flex flex-col gap-6 max-lg:px-6 border-[#1b1b1b]">
      <div className="flex justify-between gap-10 items-start border-b pb-6 border-[#1b1b1b] max-xl:flex-wrap">
        <div className="flex flex-col gap-3 basis-[36em] max-xl:basis-full">
          <div>
            <Image
              src="/images/logo/logo-dark.png"
              alt="light-talentify-logo"
              width={300}
              height={300}
              loading="lazy"
              style={{ objectFit: "cover", width: "auto", height: "auto" }}
            />
          </div>
          <div>
            <p className="text-initial-white">
              Founded with a passion for connecting job seekers with their dream
              careers, our mission is to simplify the job search process and
              empower individuals to find fulfilling employment opportunities.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-16 max-lg:flex-wrap">
          {FooterLinks.map((footer) => renderFooterLinks(footer))}
        </div>
      </div>
      <div>
        <div>
          <p className="text-initial-white">
            &copy; 2024 Copyright, JobTalentify
          </p>
        </div>
      </div>
    </footer>
  );
};

type FooterLinkDivProps = {
  title: string;
  links: {
    id: string;
    href: string;
    name: string;
  }[];
  id: string;
};

function renderFooterLinks<T extends FooterLinkDivProps>({
  title,
  links,
  id,
}: T) {
  return (
    <div key={id} className="flex flex-col gap-3">
      <div>
        <h1 className="text-[--blue-base-color]">{title}</h1>
      </div>
      <div>
        <ul className="flex flex-col gap-4">
          {links.map((link) => (
            <li key={link.id}>
              <Link href={link.href} className="text-initial-white">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Footer;
