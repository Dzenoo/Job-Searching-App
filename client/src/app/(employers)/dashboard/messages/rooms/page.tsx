"use client";

import React, { useEffect } from "react";
import Protected from "@/components/hoc/Protected";
import useOverflow from "@/hooks/useOverflow";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import { useQuery } from "react-query";
import { getDirectMessages } from "@/lib/actions/employers.actions";
import { useRouter } from "next/navigation";

const RoomsPage = () => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: directMessagesData } = useQuery({
    queryFn: () => getDirectMessages(token!),
    queryKey: ["directMessages"],
  });
  const router = useRouter();

  useEffect(() => {
    if (directMessagesData && directMessagesData?.directMessages.length > 0) {
      router.push(
        `/dashboard/messages/rooms/${directMessagesData?.directMessages[0].seekerId._id}`
      );
    }
  }, [directMessagesData]);

  useOverflow("rooms");

  return (
    <div className="flex justify-center items-center gap-5 flex-col">
      <div>
        <Image
          src="/images/messages.png"
          alt="messages"
          width={500}
          height={500}
        />
      </div>
      <div>
        <h1 className="text-base-black">Welcome To Messages</h1>
      </div>
      <div>
        <p className="text-initial-gray">
          Once you create chat with seeker it will appear here{" "}
        </p>
      </div>
      <div>
        <Link href="/seekers">
          <Button variant="default">Search Seekers</Button>
        </Link>
      </div>
    </div>
  );
};

export default Protected(RoomsPage, ["employer"]);
