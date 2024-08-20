import React, { FormEvent, useState } from "react";
import { DashboardEmployerJobsProps } from "./types";
import { Table } from "@/components/Shared/Table";
import { formatDate } from "@/lib/date";
import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { Dialog } from "@/components/Shared/Dialog";
import useDialogs from "@/hooks/useDialogs";
import { Form } from "@/components/Shared/Forms";
import { Button } from "@/components/Shared/Button";
import { useMutation } from "react-query";
import { deleteJob } from "@/lib/actions/jobs";
import useAuthentication from "@/hooks/useAuthentication";
import { toast } from "react-toastify";
import { queryClient } from "@/contexts/react-query-client";
import { ClipLoader } from "react-spinners";
import { findLocationData } from "@/lib/helpers";

const DeleteJobDialog: React.FC<{
  onCloseDialog: (dialogIds: string) => void;
  ids: string;
}> = ({ onCloseDialog, ids }) => {
  const { token } = useAuthentication().getCookieHandler();
  const { mutateAsync: deleteJobMutate, isLoading } = useMutation({
    mutationFn: () => deleteJob(token as string, ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onDeleteJob = async (e: FormEvent) => {
    e.preventDefault();

    await deleteJobMutate();

    onCloseDialog("delete");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-lg">
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <h1 className="text-base-black">Delete Job</h1>
          </div>
          <div>
            <p className="text-initial-gray text-center">
              Deleting this job will remove it from the platform, including all
              associated applications and information. Seekers will no longer be
              able to apply. Are you sure you want to proceed?
            </p>
          </div>
        </div>
      </div>
      <Form onSubmit={onDeleteJob}>
        <Button variant="danger" type="submit" className="w-full">
          {isLoading ? <ClipLoader /> : "Delete"}
        </Button>
      </Form>
    </div>
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

  const { openDialog, closeDialog, dialogs } = useDialogs({
    delete: {
      isOpen: false,
    },
  });

  const openDialogDelete = (jobIds: string): void => {
    setOpenedJobIds(jobIds);
    openDialog("delete");
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

  const transformedJobs = jobs.map((job, ind) => ({
    Index: (currentPage - 1) * itemsPerPage + ind + 1,
    Title: job.title,
    Type: job.type,
    Level: job.level,
    Position: job.position,
    Location: findLocationData(job.location),
    Salary: `${job.salary}$`,
    "Expiration Date": formatDate(job.expiration_date),
    Applications: job.applications?.length ?? 0,
    Options: (
      <JobTableOptions jobIds={job._id} onDeleteButton={openDialogDelete} />
    ),
  }));

  return (
    <>
      <Dialog
        onCloseDialog={() => closeDialog("delete")}
        isOpen={dialogs.delete.isOpen}
        render={() => (
          <DeleteJobDialog onCloseDialog={closeDialog} ids={openedJobIds} />
        )}
      />
      <Table
        columns={columns}
        data={transformedJobs}
        specialStyles={{
          Salary: "bg-green-100 dark:text-green-600 text-green-600 p-3",
          "Expiration Date": "bg-red-100 dark:text-red-600 text-red-600 p-3",
          Applications: "bg-blue-100 dark:text-blue-600 text-blue-600 p-3",
        }}
      />
    </>
  );
};

export { DashboardEmployerJobs };
