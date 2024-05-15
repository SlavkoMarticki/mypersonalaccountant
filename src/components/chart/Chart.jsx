import React from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";

const Chart = ({chartData}) => {
   
    const data = {
        labels:chartData?.map(data => data.date),
        datasets:[
            {
                label: "My money",
                data: chartData?.map(data => data.amount),
                borderWidth: 1,
                pointBackgroundColor: "#0F5A64",
            }
        ]
    }

    return (
        <Line data={data}/> 
    );
}

export default Chart;