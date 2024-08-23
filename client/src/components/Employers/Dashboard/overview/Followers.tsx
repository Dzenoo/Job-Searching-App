"use client";

import React from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { getMonthsLabels } from "@/lib/utils";

Chart.register(...registerables);

const Followers: React.FC<{ data: any }> = ({ data }) => {
  const labels = getMonthsLabels();

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Followers",
        data: data,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Followers",
        },
        ticks: {
          stepSize: 1,
          precision: 0,
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Total Followers Over Time</CardTitle>
      </CardHeader>
      {data ? (
        <CardContent className="p-4">
          <Line data={chartData} options={chartOptions} />
        </CardContent>
      ) : (
        <CardFooter>
          <p>No Data Available</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default Followers;
