import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/context/react-query-client";
import useGetEmployer from "@/hooks/mutations/useGetEmployer";
import useAuthentication from "@/hooks/useAuthentication";
import { createDirectMessages } from "@/lib/actions/messages.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useMutation } from "react-query";
import { ClipLoader } from "react-spinners";

type CreateDirectMessagesButtonProps = {
  seekerId: string;
};

const CreateDirectMessagesButton: React.FC<CreateDirectMessagesButtonProps> = ({
  seekerId,
}) => {
  const { data } = useGetEmployer();
  const router = useRouter();
  const { token } = useAuthentication().getCookieHandler();
  const { mutateAsync: createDirectMessagesMutate, isLoading } = useMutation({
    mutationFn: () => createDirectMessages(seekerId, token!),
    onSuccess: () => {
      router.push(`/dashboard/messages/rooms/${seekerId}`);
      queryClient.invalidateQueries(["profile, seeker"]);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.response.data.message });
    },
  });

  const isExistingDirectMessages = data?.employer.directMessages.find(
    (direct) => direct.seekerId === seekerId
  );

  return (
    <>
      {isExistingDirectMessages ? (
        <Link
          href={`/dashboard/messages/rooms/${isExistingDirectMessages.seekerId}`}
        >
          <Button variant="default">Message</Button>
        </Link>
      ) : (
        <Button
          disabled={isLoading}
          onClick={async () => await createDirectMessagesMutate()}
          variant="default"
        >
          {isLoading ? <ClipLoader /> : "Start"}
        </Button>
      )}
    </>
  );
};

export default CreateDirectMessagesButton;
