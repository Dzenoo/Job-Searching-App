import React from "react";
import { ApplicationsProps } from "./types";
import { Table } from "@/components/Shared/Table";
import { formatDate } from "@/utils/date";
import { getImageUrl } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { Github, ImageIcon, Linkedin } from "lucide-react";
import { SeekerTypes } from "@/typings/seekers";

const NameWithImage = ({ seeker }: { seeker: SeekerTypes }) => (
  <div className="flex items-center gap-3">
    <Image
      width={30}
      height={30}
      className="rounded-full object-cover"
      src={getImageUrl(seeker.image)}
      alt={`${seeker.first_name} ${seeker.last_name}`}
    />
    <div>
      <h1>
        {seeker.first_name} {seeker.last_name}
      </h1>
    </div>
  </div>
);

const StatusBadge = ({
  status,
}: {
  status: "Pending" | "Interview" | "Accepted" | "Rejected";
}) => {
  const statusClasses = {
    Pending: "bg-blue-100 text-blue-600",
    Interview: "bg-yellow-100 text-yellow-600",
    Accepted: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
  };
  return (
    <div
      className={`rounded-full p-3 transition-colors ${
        statusClasses[status] || ""
      }`}
    >
      {status}
    </div>
  );
};

const SocialLinks = ({ seeker }: { seeker: SeekerTypes }) => (
  <div className="flex items-center gap-6">
    <Link aria-label="Github" target="_blank" href={seeker.github}>
      <Github />
    </Link>
    <Link aria-label="LinkedIn" target="_blank" href={seeker.linkedin}>
      <Linkedin />
    </Link>
    <Link aria-label="Portfolio" target="_blank" href={seeker.portfolio}>
      <ImageIcon />
    </Link>
  </div>
);

const Applications: React.FC<ApplicationsProps> = ({
  applications,
  currentPage,
  itemsPerPage,
}) => {
  const columns = [
    "Index",
    "Name",
    "Email",
    "Resume",
    "Cover Letter",
    "Applied",
    "Status",
    "Socials",
  ];

  const transformedApplications = applications.map((app, index) => ({
    Index: (currentPage - 1) * itemsPerPage + index + 1,
    Name: <NameWithImage seeker={app.seeker} />,
    Email: app.seeker.email,
    Resume: app.resume ? (
      <Link
        className="text-initial-blue"
        href={`https://job-searching-application.s3.amazonaws.com/${app.resume}`}
      >
        View Seeker Resume
      </Link>
    ) : (
      "Resume Is Undefined"
    ),
    "Cover Letter": app.cover_letter ? (
      <button className="text-initial-blue">Read</button>
    ) : (
      "Cover Letter Unassigned"
    ),
    Applied: formatDate(app.createdAt),
    Status: <StatusBadge status={app.status} />,
    Socials: <SocialLinks seeker={app.seeker} />,
  }));

  return <Table columns={columns} data={transformedApplications} />;
};

export { Applications };
