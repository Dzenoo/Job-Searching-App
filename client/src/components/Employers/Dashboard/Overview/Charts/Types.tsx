"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/Card";
Chart.register(...registerables);

const Types: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="dark:text-white font-bold">Distribution of Job Types</h1>
      </CardHeader>
      {data && (
        <CardContent>
          <Pie
            height={300}
            width={300}
            data={{
              labels: data?.map((item: any) => item.label),
              datasets: [
                {
                  data: data?.map((item: any) => item.value),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 133, 86, 0.2)",
                    "rgba(255, 206, 36, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 133, 86, 1)",
                    "rgba(255, 206, 36, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </CardContent>
      )}
      {!data && (
        <CardFooter>
          <p>No Data Available</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default Types;
