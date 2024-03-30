"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/Card";
Chart.register(...registerables);

const Followers: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="dark:text-white font-bold">Total Followers Over Time</h1>
      </CardHeader>
      {data && (
        <CardContent>
          <Line
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  label: "Followers",
                  data: data,
                  fill: false,
                  borderColor: "rgba(75,192,192,1)",
                  tension: 0.1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Number of Followers",
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

export default Followers;
