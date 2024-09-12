import React from "react";
import { ClipLoader } from "react-spinners";

import useJobAlert from "@/hooks/mutations/useJobAlert";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type JobAlertProps = {
  level: string;
  type: string;
  title: string;
};

const AddJobAlert: React.FC<JobAlertProps> = ({ level, type, title }) => {
  const jobAlertData = {
    level,
    type,
    title,
  };
  const { mutateAsync: addJobAlertMutate, isLoading } = useJobAlert();

  return (
    <Card>
      <CardHeader>
        <h1 className="text-base-black">Generate Job Alert</h1>
      </CardHeader>
      <CardContent className="pt-0">
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
