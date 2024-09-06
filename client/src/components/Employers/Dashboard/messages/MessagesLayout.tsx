"use client";

import React from "react";
import MessagesNavbar from "./MessagesNavbar";

import { useQuery } from "react-query";
import { getDirectMessages } from "@/lib/actions/employers.actions";

import useAuthentication from "@/hooks/useAuthentication";

const MessagesLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: directMessagesData } = useQuery({
    queryFn: () => getDirectMessages(token!),
    queryKey: ["directMessages"],
  });

  return (
    <div className="flex h-screen gap-5">
      <div className="basis-[25%] flex flex-col h-full overflow-y-auto hide-scrollbar">
        <MessagesNavbar
          messagesData={directMessagesData?.directMessages || []}
        />
      </div>
      <div className="flex-grow flex flex-col h-full min-h-0 overflow-hidden">
        <div className="flex-grow overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default MessagesLayout;
