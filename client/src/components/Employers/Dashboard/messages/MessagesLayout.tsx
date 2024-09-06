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
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="basis-[25%]">
        <MessagesNavbar
          messagesData={directMessagesData?.directMessages || []}
        />
      </div>
      <div className="basis-full overflow-hidden">{children}</div>
    </div>
  );
};

export default MessagesLayout;
