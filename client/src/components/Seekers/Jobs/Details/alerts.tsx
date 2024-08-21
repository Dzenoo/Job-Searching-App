import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/Card";
import React from "react";
import { JobAlertProps } from "./types";
import { ClipLoader } from "react-spinners";
import useJobAlert from "@/hooks/mutations/useJobAlert";
import { Button } from "@/components/ui/button";

const AddJobAlert: React.FC<JobAlertProps> = ({ level, type, title }) => {
  const jobAlertData = {
    level,
    type,
    title,
  };
  const { mutateAsync: addJobAlertMutate, isLoading } = useJobAlert();

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
          onClick={() => addJobAlertMutate(jobAlertData)}
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader color="#fff" /> : "Add Job Alert"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddJobAlert;
