import MessagesNavbar from "@/components/employers/dashboard/messages/MessagesNavbar";
import React from "react";

const RoomsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="basis-[25%]">
        <MessagesNavbar />
      </div>
      <div className="basis-full overflow-hidden">{children}</div>
    </div>
  );
};

export default RoomsLayout;
