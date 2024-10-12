import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { ClipLoader } from "react-spinners";

import { Edit, Eye, Trash } from "lucide-react";

import { deleteJob } from "@/lib/actions/jobs.actions";
import useAuthentication from "@/hooks/defaults/useAuthentication";
import { queryClient } from "@/context/react-query-client";
import { JobTypes } from "@/types";
import { findLocationData, formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const DeleteJobDialog: React.FC<{
  onCloseDialog: (dialogIds: string) => void;
  ids: string;
}> = ({ onCloseDialog, ids }) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();
  const { mutateAsync: deleteJobMutate, isLoading } = useMutation({
    mutationFn: () => deleteJob(token as string, ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const onDeleteJob = async (e: FormEvent) => {
    e.preventDefault();

    await deleteJobMutate();

    onCloseDialog("delete");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogDescription>
          Deleting this job will remove it from the platform, including all
          associated applications and information. Seekers will no longer be
          able to apply. Are you sure you want to proceed?
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onDeleteJob}>
        <DialogFooter>
          <Button variant="destructive" type="submit" className="w-full">
            {isLoading ? <ClipLoader /> : "Delete"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

const JobTableOptions: React.FC<{
  jobIds: string;
  onDeleteButton: (jobIds: string) => void;
}> = ({ jobIds, onDeleteButton }) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <Link href={`/dashboard/jobs/${jobIds}`}>
        <Eye />
      </Link>
      <Link href={`/dashboard/jobs/${jobIds}/edit`}>
        <Edit />
      </Link>
      <button onClick={() => onDeleteButton(jobIds)}>
        <Trash color="red" />
      </button>
    </div>
  );
};

type DashboardEmployerJobsProps = {
  jobs: JobTypes[];
  currentPage: number;
  itemsPerPage: number;
};

const DashboardEmployerJobs: React.FC<DashboardEmployerJobsProps> = ({
  jobs,
  currentPage,
  itemsPerPage,
}) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center flex items-center justify-center h-screen overflow-hidden">
        <p className="text-initial-gray">You haven't created any jobs yet.</p>
      </div>
    );
  }

  const [openedJobIds, setOpenedJobIds] = useState<string>("");

  const openDialog = (jobIds: string) => {
    setOpenedJobIds(jobIds);
  };

  const closeDialog = () => {
    setOpenedJobIds("");
  };

  const columns = [
    "Index",
    "Title",
    "Type",
    "Level",
    "Position",
    "Location",
    "Salary",
    "Expiration Date",
    "Applications",
    "Options",
  ];

  return (
    <>
      <Dialog open={!!openedJobIds} onOpenChange={closeDialog}>
        <DeleteJobDialog onCloseDialog={closeDialog} ids={openedJobIds} />
      </Dialog>
      <Table>
        <TableCaption>A list of your jobs</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, ind) => (
            <TableRow className="whitespace-nowrap" key={job._id}>
              <TableCell>
                {(currentPage - 1) * itemsPerPage + ind + 1}
              </TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.type}</TableCell>
              <TableCell>{job.level}</TableCell>
              <TableCell>{job.position}</TableCell>
              <TableCell>{findLocationData(job.location)}</TableCell>
              <TableCell className="bg-green-100 dark:text-green-600 text-green-600 p-3">
                {job.salary}$
              </TableCell>
              <TableCell className="bg-red-100 dark:text-red-600 text-red-600 p-3">
                {formatDate(job.expiration_date)}
              </TableCell>
              <TableCell className="bg-blue-100 dark:text-blue-600 text-blue-600 p-3">
                {job.applications?.length ?? 0}
              </TableCell>
              <TableCell>
                <JobTableOptions jobIds={job._id} onDeleteButton={openDialog} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DashboardEmployerJobs;
