"use client";
import Protected from "@/components/hoc/Protected";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RoomsPage = () => {
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
