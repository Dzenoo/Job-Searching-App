import { MessageTypes, SeekerTypes } from "@/types";
import React from "react";

type MessagesRoomProps = {
  data: {
    seekerId: SeekerTypes;
    messages: MessageTypes[];
  };
};

const MessagesRoom: React.FC<MessagesRoomProps> = ({ data }) => {
  return (
    <div className="h-[95vh] border flex items-center justify-center gap-5 rounded-lg shadow-lg overflow-y-scroll">
      {data?.messages.length === 0 && (
        <div>
          <p className="text-initial-gray">No Messages</p>
        </div>
      )}
    </div>
  );
};

export default MessagesRoom;
