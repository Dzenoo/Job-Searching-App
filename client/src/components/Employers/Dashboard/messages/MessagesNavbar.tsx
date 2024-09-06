import React from "react";

import { MessageTypes, SeekerTypes } from "@/types";
import { getImageUrl } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type MessagesNavbarProps = {
  messagesData: { seekerId: SeekerTypes; messages: MessageTypes }[];
};

const MessagesNavbar: React.FC<MessagesNavbarProps> = ({ messagesData }) => {
  const pathname = usePathname();

  const isActiveChatSeeker = pathname.split("/rooms/")[1];

  return (
    <Card>
      <CardHeader>
        <div>
          <h1 className="text-base-black">Messages</h1>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {messagesData === undefined ? (
          <div>
            <p className="text-initial-gray">Messages will appear here</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 overflow-auto">
            {messagesData.map((messages) => (
              <Link
                key={messages.seekerId._id}
                href={`/dashboard/messages/rooms/${messages.seekerId._id}`}
              >
                <div
                  className={`p-2 flex gap-5 items-center transition-all hover:bg-gray-100 dark:hover:bg-[#1b1b1b] rounded-lg cursor-pointer ${
                    isActiveChatSeeker === messages.seekerId._id &&
                    "bg-blue-100 dark:bg-blue-700"
                  }`}
                >
                  <div>
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={getImageUrl(messages.seekerId.image)} />
                    </Avatar>
                  </div>
                  <div>
                    <div>
                      <h1 className="text-initial-black">
                        {messages.seekerId.first_name}{" "}
                        {messages.seekerId.last_name}
                      </h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessagesNavbar;
