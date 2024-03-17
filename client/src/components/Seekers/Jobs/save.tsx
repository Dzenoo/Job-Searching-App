import React from "react";
import { Button } from "@/components/Shared/Button";
import { Bookmark } from "lucide-react";
import { SaveJobButtonProps } from "./types";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import useAuthentication from "@/hooks/useAuthentication";
import { saveJob } from "@/utils/actions/jobs";
import useGetSeeker from "@/hooks/useGetSeeker";
import { JobTypes } from "@/typings/jobs";
import { queryClient } from "@/contexts/react-query-client";

const SaveJobButton: React.FC<SaveJobButtonProps> = ({ jobId }) => {
  const { data } = useGetSeeker();
  const { token } = useAuthentication().getCookieHandler();
  const { mutateAsync: saveJobMutate, isLoading } = useMutation({
    mutationFn: () => saveJob(jobId, token!),
    onSuccess: (response: any) => {
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
        variant="outlined"
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
