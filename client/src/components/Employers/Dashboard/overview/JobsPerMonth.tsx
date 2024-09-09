"use client";

import React from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { getMonthsLabels } from "@/lib/utils";

Chart.register(...registerables);

const JobsPerMonth: React.FC<{ data: any }> = ({ data }) => {
  const labels = getMonthsLabels();

  const chartData = {
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
  };

  const chartOptions = {
    maintainAspectRatio: false,
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
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Number of Jobs Posted Per Month</CardTitle>
      </CardHeader>
      {data ? (
        <CardContent className="flex-1 p-4">
          <div className="h-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      ) : (
        <CardFooter>
          <p>No Data Available</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default JobsPerMonth;
