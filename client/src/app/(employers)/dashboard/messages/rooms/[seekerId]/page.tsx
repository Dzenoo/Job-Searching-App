"use client";

import React from "react";

import MessagesRoom from "@/components/employers/dashboard/messages/MessagesRoom";
import Protected from "@/components/hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import useOverflow from "@/hooks/useOverflow";
import { getMessagesRoom } from "@/lib/actions/employers.actions";
import { useQuery } from "react-query";

const RoomPage = ({ params }: { params: { seekerId: string } }) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: messageRoomData } = useQuery({
    queryFn: () => getMessagesRoom(token!, params.seekerId),
  });

  useOverflow("rooms");

  return (
    <div>
      <MessagesRoom data={messageRoomData?.messageRoom!} />
    </div>
  );
};

export default Protected(RoomPage, ["employer"]);
