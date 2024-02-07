'use client'
import { BackButton, EmptyPage } from '@/app/components'
import React, { useContext, useEffect } from 'react'
import { Chart } from "chart.js";
import { ProvidersContext } from '@/app/context/providers/ProvidersContext';
import { ISurvey } from '@/interfaces';

const ChartPage = () => {
  const {surveys} = useContext(ProvidersContext)
  useEffect(() => {
    crearGrafica(surveys);

  }, []);

  const crearGrafica = (surveys: ISurvey[]) => {
    const ctx = document.getElementById("myChart");
    //@ts-ignore
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: surveys.map((s) => s.provider),
        datasets: [
          {
            label: "Total",
            data: surveys.map((s) => s.total),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    });
  };


  return (
    <>
      <div><BackButton/></div>

      {
        surveys.length
          ?<canvas id="myChart"></canvas>
          :<EmptyPage/>
      }
    </>
  )
}

export default ChartPage