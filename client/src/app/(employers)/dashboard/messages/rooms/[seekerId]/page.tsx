"use client";
import MessagesRoom from "@/components/employers/dashboard/messages/MessagesRoom";
import Protected from "@/components/hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import { getMessagesRoom } from "@/lib/actions/employers.actions";
import React from "react";
import { useQuery } from "react-query";

const RoomPage = ({ params }: { params: { seekerId: string } }) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: messageRoomData } = useQuery({
    queryFn: () => getMessagesRoom(token!, params.seekerId),
  });

  return (
    <div>
      <MessagesRoom data={messageRoomData?.messageRoom!} />
    </div>
  );
};

export default Protected(RoomPage, ["employer"]);
