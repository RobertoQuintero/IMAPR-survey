'use client'
import { BackButton, EmptyPage } from '@/app/components'
import React, { useContext, useEffect } from 'react'
import { Chart } from "chart.js";
import { ProvidersContext } from '@/app/context/providers/ProvidersContext';
import { ISurvey } from '@/interfaces';
import { colors, lineColors } from './colors';

const ChartPage = () => {
  const {surveys,surveyEntry} = useContext(ProvidersContext)
  useEffect(() => {
  
    crearGrafica(surveys.sort((a,b)=>b.total!-a.total!));

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
            backgroundColor: colors,
            borderColor: lineColors,
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
      <h4 style={{textAlign:'center',padding:'0 0 1rem'}}>{surveyEntry?.description}</h4>
      {
        surveys.length
          ?<canvas id="myChart"></canvas>
          :<EmptyPage/>
      }
    </>
  )
}

export default ChartPage