import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const MessagesNavbar: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div>
          <h1 className="text-base-black">Messages</h1>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div>
          <p className="text-initial-gray">Messages will appear here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesNavbar;
