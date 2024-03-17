import { Button } from "@/components/Shared/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/Card";
import React from "react";
import { JobAlertProps } from "./types";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { addJobAlert } from "@/utils/actions/jobs";

const AddJobAlert: React.FC<JobAlertProps> = ({
  level,
  type,
  title,
  token,
}) => {
  const jobAlertData = {
    level,
    type,
    title,
  };
  const { mutate: addJobAlertMutate, isLoading } = useMutation({
    mutationFn: () => addJobAlert(token!, jobAlertData),
    mutationKey: ["job"],
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <Card>
      <CardHeader className="py-0">
        <h1 className="text-initial-black">Generate Job Alert</h1>
      </CardHeader>
      <CardContent>
        <p className="text-initial-gray">
          Get notified when job like this show. Set up alerts now and never miss
          a matching opportunity.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="default"
          className="w-full"
          onClick={() => addJobAlertMutate()}
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader color="#fff" /> : "Add Job Alert"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddJobAlert;
