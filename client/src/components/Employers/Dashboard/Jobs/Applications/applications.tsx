import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ImageIcon, Linkedin } from "lucide-react";
import { useMutation } from "react-query";
import { updateApplicationStatus } from "@/lib/actions/jobs.actions";
import useAuthentication from "@/hooks/useAuthentication";
import { queryClient } from "@/contexts/react-query-client";
import { toast } from "react-toastify";
import { ApplicationsTypes, SeekerTypes } from "@/types";
import { formatDate, getImageUrl } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  applicationId,
  status,
  isOpen,
  toggleStatus,
}: {
  applicationId: string;
  status: "Pending" | "Interview" | "Accepted" | "Rejected";
  isOpen: boolean;
  toggleStatus: () => void;
}) => {
  const statusBarRef = useRef(null);

  const { token } = useAuthentication().getCookieHandler();

  const { mutateAsync: updateStatusMutate } = useMutation({
    mutationFn: (status: string) =>
      updateApplicationStatus(applicationId, token!, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const updateStatusApi = async (status: string) => {
    await updateStatusMutate(status);
  };

  const statusClasses = {
    Pending: "bg-blue-100 text-blue-600",
    Interview: "bg-yellow-100 text-yellow-600",
    Accepted: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
  };

  return (
    <>
      {isOpen && (
        <div
          ref={statusBarRef}
          className="bg-white rounded-lg p-3 absolute bottom-16 dark:bg-[#0d0d0d] border"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                updateStatusApi("Pending");
                toggleStatus();
              }}
              className={`p-1 rounded-lg overflow-x-auto ${statusClasses.Pending}`}
            >
              Pending
            </button>
            <button
              onClick={() => {
                updateStatusApi("Interview");
                toggleStatus();
              }}
              className={`p-1 rounded-lg overflow-x-auto ${statusClasses.Interview}`}
            >
              Interview
            </button>
            <button
              onClick={() => {
                updateStatusApi("Accepted");
                toggleStatus();
              }}
              className={`p-1 rounded-lg overflow-x-auto ${statusClasses.Accepted}`}
            >
              Accepted
            </button>
            <button
              onClick={() => {
                updateStatusApi("Rejected");
                toggleStatus();
              }}
              className={`p-1 rounded-lg overflow-x-auto ${statusClasses.Rejected}`}
            >
              Rejected
            </button>
          </div>
        </div>
      )}
      <div
        onClick={toggleStatus}
        className={`rounded-full p-3 transition-colors cursor-pointer ${
          statusClasses[status] || ""
        }`}
      >
        {status}
      </div>
    </>
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

type ApplicationsProps = {
  applications: ApplicationsTypes[];
  currentPage: number;
  itemsPerPage: number;
};

const Applications: React.FC<ApplicationsProps> = ({
  applications,
  currentPage,
  itemsPerPage,
}) => {
  if (applications?.length === 0)
    return (
      <div className="flex items-center justify-center h-screen">
        No Applications Found
      </div>
    );

  const [openedStatusId, setOpenedStatusId] = useState<string | null>(null);

  const toggleStatus = (applicationId: string) => {
    if (openedStatusId === applicationId) {
      setOpenedStatusId(null);
    } else {
      setOpenedStatusId(applicationId);
    }
  };

  return (
    <Table>
      <TableCaption>A list of applications</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Index</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Cover Letter</TableHead>
          <TableHead>Applied</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Socials</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app, index) => (
          <TableRow key={app._id}>
            <TableCell>
              {(currentPage - 1) * itemsPerPage + index + 1}
            </TableCell>
            <TableCell>
              <NameWithImage seeker={app.seeker} />
            </TableCell>
            <TableCell>{app.seeker.email}</TableCell>
            <TableCell>
              {app.resume ? (
                <Link
                  className="text-initial-blue"
                  href={`https://job-searching-application.s3.amazonaws.com/${app.resume}`}
                >
                  View Seeker Resume
                </Link>
              ) : (
                "Resume Is Undefined"
              )}
            </TableCell>
            <TableCell>
              {app.cover_letter ? (
                <button className="text-initial-blue">Read</button>
              ) : (
                "Cover Letter Unassigned"
              )}
            </TableCell>
            <TableCell>{formatDate(app.createdAt)}</TableCell>
            <TableCell>
              <StatusBadge
                applicationId={app._id}
                status={app.status}
                isOpen={openedStatusId === app._id}
                toggleStatus={() => toggleStatus(app._id)}
              />
            </TableCell>
            <TableCell>
              <SocialLinks seeker={app.seeker} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total Applications</TableCell>
          <TableCell className="text-right">{applications.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Applications;
