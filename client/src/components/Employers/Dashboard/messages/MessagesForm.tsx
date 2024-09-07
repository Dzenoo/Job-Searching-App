import React from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { typeMessage } from "@/lib/actions/shared.actions";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSchema } from "@/lib/zod/messages";

type MessagesFormProps = {
  refetchMessages: () => void;
  token: string;
  employerId: string;
  seekerId: string;
};

type FormValues = z.infer<typeof MessageSchema>;

const MessagesForm: React.FC<MessagesFormProps> = ({
  refetchMessages,
  token,
  employerId,
  seekerId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(MessageSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await typeMessage(
        { content: data.content, sender: employerId },
        token,
        employerId,
        seekerId
      );

      refetchMessages();
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Type a message..."
          {...register("content")}
        />
        <Button disabled={!isValid} type="submit">
          <Send />
        </Button>
      </div>
      {errors.content && (
        <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
      )}
    </form>
  );
};

export default MessagesForm;
