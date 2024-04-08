"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/Card";
import { getMonthsLabels } from "@/utils/helpers";
Chart.register(...registerables);

const JobsPerMonth: React.FC<{ data: any }> = ({ data }) => {
  const labels = getMonthsLabels();

  return (
    <Card className="h-full">
      <CardHeader>
        <h1 className="dark:text-white font-bold">
          Number of Jobs Posted Per Month
        </h1>
      </CardHeader>
      {data && (
        <CardContent>
          <Bar
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Jobs",
                  data: data,
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Number of Jobs",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Month",
                  },
                },
              },
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

export default JobsPerMonth;
