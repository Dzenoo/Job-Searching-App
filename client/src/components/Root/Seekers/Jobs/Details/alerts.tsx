import { Button } from "@/components/shared/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/shared/Card";
import React from "react";

const AddJobAlert: React.FC = () => {
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
        <Button variant="default" className="w-full">
          Add Job Alert
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddJobAlert;
