import { Button } from "@/components/Shared/Button";
import useFollowEmployer from "@/hooks/mutations/useFollowEmployer";
import React from "react";
import { FollowEmployerProps } from "./types";
import useGetSeeker from "@/hooks/useGetSeeker";

const FollowEmployerButton: React.FC<FollowEmployerProps> = ({
  employerId,
}) => {
  const { data: fetchedSeekerProfile, refetch } = useGetSeeker();
  const { mutateAsync: followEmployerMutate, isLoading } =
    useFollowEmployer(employerId);

  const isEmployerFollowed =
    fetchedSeekerProfile?.seeker?.following.includes(employerId);

  const handleFollowToggle = async () => {
    await followEmployerMutate();
    refetch();
  };

  return (
    <div>
      <Button
        variant={isEmployerFollowed ? "outlined" : "default"}
        className="px-10"
        onClick={handleFollowToggle}
        disabled={isLoading}
      >
        {isEmployerFollowed ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export { FollowEmployerButton };
