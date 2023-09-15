import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const DoughnutChart = ({ data }: any) => {
    const chartRef = useRef(null) as any;

    useEffect(() => {
        const ctx = chartRef?.current?.getContext("2d");
        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Converted", "Not Converted"],
                datasets: [
                    {
                        data: [40, 100, 40],
                        backgroundColor: ["#FFC453", "#CDD4D8", "#07283B"],
                        hoverBackgroundColor: ["#FFC453", "#EAEDF0"],
                        borderWidth: [0, 5],
                        // spacing: 0,
                    },
                ],
            },
            options: {
                cutoutPercentage: 80,
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: true,
                },

                elements: {
                    arc: {
                        borderWidth: 0,
                    },
                },
            },
        });
    }, [data]);

    return (
        <div style={{ width: "400px", margin: "auto", height: "300px" }}>
            {" "}
            {/* Adjust the width and set height to 100% */}
            <canvas ref={chartRef} style={{ height: "100%" }} />{" "}
            {/* Set the height of the canvas to 100% */}
        </div>
    );
};

export default DoughnutChart;
