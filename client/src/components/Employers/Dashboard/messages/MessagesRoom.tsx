import React, { useEffect, useState } from "react";
import MessagesForm from "./MessagesForm";
import { MessageTypes, SeekerTypes } from "@/types";
import useAuthentication from "@/hooks/useAuthentication";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatDate, getImageUrl } from "@/lib/utils";
import { getMessagesRoom } from "@/lib/actions/employers.actions";

type MessagesRoomProps = {
  data: {
    seekerId: SeekerTypes;
    messages: MessageTypes[];
  };
};

const MessagesRoom: React.FC<MessagesRoomProps> = ({ data }) => {
  const { token, userId: employerId } = useAuthentication().getCookieHandler();
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  const refetchMessages = async () => {
    setLoading(true);
    try {
      const updatedData = await getMessagesRoom(token!, data.seekerId._id);
      setMessages(updatedData?.messageRoom.messages || []);
    } catch (error) {
      console.error("Error refetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSenderName = (sender: MessageTypes["sender"]) => {
    if ("name" in sender) {
      return sender.name;
    } else {
      return `${sender.first_name} ${sender.last_name}`;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="text-base-black">
          {data?.seekerId.first_name} {data?.seekerId.last_name}
        </h1>
      </div>
      <div className="h-[80vh] border rounded-lg overflow-y-scroll relative">
        {loading && <p className="text-initial-gray">Loading...</p>}
        {messages?.length === 0 && !loading && (
          <div className="flex items-center justify-center">
            <p className="text-initial-gray">No Messages</p>
          </div>
        )}
        <div className="p-2 flex flex-col gap-1">
          {messages?.length !== 0 &&
            messages?.map((message, index) => {
              const isCurrentUser = message.sender._id === employerId;
              return (
                <div
                  key={index}
                  className={`relative p-4 rounded-lg flex gap-2 w-full items-center ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isCurrentUser && (
                    <div>
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={getImageUrl(message?.sender.image)} />
                      </Avatar>
                    </div>
                  )}
                  <div
                    className={`pt-5 flex flex-col ${
                      isCurrentUser ? "items-end" : "items-start"
                    }`}
                  >
                    {!isCurrentUser && (
                      <div>
                        <h1 className="font-semibold">
                          {getSenderName(message.sender)}
                        </h1>
                      </div>
                    )}
                    <div>
                      <p className="bg-gray-100 p-2 rounded-lg shadow-md text-initial-gray">
                        {message.content}
                      </p>
                      <span className="text-xs text-gray-500 block mt-1">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                  </div>
                  {isCurrentUser && (
                    <div>
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={getImageUrl(message?.sender.image)} />
                      </Avatar>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <MessagesForm
          refetchMessages={refetchMessages}
          token={token!}
          employerId={employerId!}
          seekerId={data?.seekerId._id}
        />
      </div>
    </div>
  );
};

export default MessagesRoom;
