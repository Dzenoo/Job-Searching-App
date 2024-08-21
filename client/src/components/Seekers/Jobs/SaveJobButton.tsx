import React from "react";
import { Bookmark } from "lucide-react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import useAuthentication from "@/hooks/useAuthentication";
import { saveJob } from "@/lib/actions/jobs.actions";
import { queryClient } from "@/context/react-query-client";
import { Button } from "@/components/ui/button";
import useGetSeeker from "@/hooks/mutations/useGetSeeker";
import { JobTypes } from "@/types";

type SaveJobButtonProps = {
  jobId: string;
  token?: string;
};

const SaveJobButton: React.FC<SaveJobButtonProps> = ({ jobId }) => {
  const { data } = useGetSeeker();
  const { token } = useAuthentication().getCookieHandler();
  const { mutateAsync: saveJobMutate, isLoading } = useMutation({
    mutationFn: () => saveJob(jobId, token!),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const fetchedSeeker: any = data;

  const isJobSaved = fetchedSeeker?.seeker?.savedJobs.find(
    (job: JobTypes) => job._id === jobId
  );

  return (
    <div>
      <Button
        variant="outline"
        onClick={async () => await saveJobMutate()}
        disabled={isLoading}
      >
        <Bookmark
          color={isJobSaved ? "#0066FF" : "gray"}
          fill={isJobSaved ? "#0066FF" : "#ffffff"}
        />
      </Button>
    </div>
  );
};

export default SaveJobButton;
