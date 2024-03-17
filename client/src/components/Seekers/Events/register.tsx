import { Button } from "@/components/Shared/Button";
import { registerForEvent } from "@/utils/actions/events";
import React from "react";
import { useMutation } from "react-query";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

type RegisterEventsProps = {
  eventId: string;
  token: string;
};

const RegisterEvents: React.FC<RegisterEventsProps> = ({ eventId, token }) => {
  const { mutateAsync: registerForEventMutate, isLoading } = useMutation({
    mutationFn: () => registerForEvent(eventId, token),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <div className="flex flex-col gap-6 items-center justify-center text-center">
      <div>
        <h1 className="text-base-black">Register Event</h1>
      </div>
      <div className="max-w-[27em]">
        <p className="text-initial-gray">
          Are you sure you want to register for this event? Your data will be
          send to employer. Do you want to process?
        </p>
      </div>
      <div>
        <Button
          variant="default"
          type="submit"
          disabled={isLoading}
          className="w-full"
          onClick={() => registerForEventMutate()}
        >
          {isLoading ? <ClipLoader color="#fff" /> : "Register"}
        </Button>
      </div>
    </div>
  );
};

export default RegisterEvents;
