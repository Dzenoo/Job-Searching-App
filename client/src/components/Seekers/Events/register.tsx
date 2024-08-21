import { Button } from "@/components/ui/button";
import { queryClient } from "@/contexts/react-query-client";
import useGetSeeker from "@/hooks/useGetSeeker";
import { registerForEvent } from "@/lib/actions/events.actions";
import React from "react";
import { useMutation } from "react-query";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

type RegisterEventsProps = {
  eventId: string;
  token: string;
  closeDialog: (dialogId: string) => void;
};

const RegisterEvents: React.FC<RegisterEventsProps> = ({
  eventId,
  token,
  closeDialog,
}) => {
  const { data: fetchedSeekerProfile } = useGetSeeker();
  const { mutateAsync: registerForEventMutate, isLoading } = useMutation({
    mutationFn: () => registerForEvent(eventId, token),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const isRegistered = fetchedSeekerProfile?.seeker?.events.includes(eventId);

  return (
    <div className="flex flex-col gap-6 items-center justify-center text-center">
      <div>
        <h1 className="text-base-black">
          {isRegistered ? "Unregister" : "Register"} Event
        </h1>
      </div>
      <div className="max-w-[27em]">
        <p className="text-initial-gray">
          Are you sure you want to {isRegistered ? "unregister" : "register"}{" "}
          for this event? Your data will be send to employer. Do you want to
          process?
        </p>
      </div>
      <div>
        <Button
          variant={isRegistered ? "outline" : "default"}
          type="submit"
          disabled={isLoading}
          className="w-full"
          onClick={() => {
            registerForEventMutate();
            closeDialog("registerForEvent");
          }}
        >
          {isLoading ? (
            <ClipLoader color="#fff" />
          ) : isRegistered ? (
            "Unregister"
          ) : (
            "Register"
          )}
        </Button>
      </div>
    </div>
  );
};

export default RegisterEvents;
