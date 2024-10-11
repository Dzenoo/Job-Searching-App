import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ExploreSeekers: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-initial-black font-bold">Explore Seekers</h1>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-initial-gray">
          Discover and connect with seekers who possess the skills you're
          looking for through their social media profiles
        </p>
      </CardContent>
    </Card>
  );
};

export default ExploreSeekers;
