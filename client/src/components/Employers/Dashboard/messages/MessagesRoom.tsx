import React, { useEffect, useState } from "react";

import MessagesForm from "./MessagesForm";

import { MessageTypes, SeekerTypes } from "@/types";

import useAuthentication from "@/hooks/useAuthentication";

type MessagesRoomProps = {
  data: {
    seekerId: SeekerTypes;
    messages: MessageTypes[];
  };
};

const MessagesRoom: React.FC<MessagesRoomProps> = ({ data }) => {
  const { token, userId: employerId } = useAuthentication().getCookieHandler();
  const [messages, setMessages] = useState<MessageTypes[]>([]);

  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="text-base-black">
          {data?.seekerId.first_name} {data?.seekerId.last_name}
        </h1>
      </div>
      <div className="h-[80vh] border rounded-lg overflow-y-scroll relative">
        {messages?.length === 0 && (
          <div className="flex items-center justify-center">
            <p className="text-initial-gray">No Messages</p>
          </div>
        )}
        <div className="p-2 flex flex-col">
          {messages?.length !== 0 &&
            messages?.map((message, index) => (
              <div key={index} className="w-full">
                <p>{message.content}</p>
              </div>
            ))}
        </div>
      </div>
      <div>
        <MessagesForm
          token={token!}
          setMessages={setMessages}
          employerId={employerId!}
          seekerId={data?.seekerId._id}
        />
      </div>
    </div>
  );
};

export default MessagesRoom;
