import React from "react";
import { useMutation } from "react-query";
import { ClipLoader } from "react-spinners";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { queryClient } from "@/context/react-query-client";

import useGetSeeker from "@/hooks/mutations/useGetSeeker";
import { registerForEvent } from "@/lib/actions/events.actions";

type RegisterEventsProps = {
  eventId: string;
  token: string;
  closeDialog: () => void;
};

const RegisterEvents: React.FC<RegisterEventsProps> = ({
  eventId,
  token,
  closeDialog,
}) => {
  const { toast } = useToast();
  const { data: fetchedSeekerProfile } = useGetSeeker();
  const { mutateAsync: registerForEventMutate, isLoading } = useMutation({
    mutationFn: () => registerForEvent(eventId, token),
    onSuccess: (response) => {
      toast({ title: "Success", description: response.message });
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.response.data.message });
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
          onClick={async () => {
            await registerForEventMutate();
            closeDialog();
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
