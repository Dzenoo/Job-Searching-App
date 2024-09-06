import React, { useState } from "react";

import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { typeMessage } from "@/lib/actions/shared.actions";
import { MessageTypes } from "@/types";

type MessagesFormProps = {
  setMessages: React.Dispatch<React.SetStateAction<MessageTypes[]>>;
  token: string;
  employerId: string;
  seekerId: string;
};

const MessagesForm: React.FC<MessagesFormProps> = ({
  setMessages,
  token,
  employerId,
  seekerId,
}) => {
  const [message, setMessage] = useState<MessageTypes>({
    content: "",
    sender: employerId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.content.trim()) {
      await typeMessage(
        { sender: employerId, content: message.content },
        token,
        employerId,
        seekerId
      ).then((data) => console.log(data));

      setMessages((prevMessages) => [...prevMessages, { ...message }]);

      setMessage({ content: "", sender: employerId });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <Input
          type="text"
          value={message.content}
          onChange={(e) =>
            setMessage((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="Type a message..."
        />
        <Button type="submit">
          <Send />
        </Button>
      </div>
    </form>
  );
};

export default MessagesForm;
