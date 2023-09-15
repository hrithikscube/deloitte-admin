import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const BarGraph = ({ data }: any) => {
    const chartRef = useRef<any>(null);

    useEffect(() => {
        const ctx = chartRef?.current?.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: data?.labels,
                datasets: [
                    {
                        label: data.datasetLabel,
                        data: data.datasetData,
                        backgroundColor: data.backgroundColor, // Adjust as needed
                        borderColor: "rgba(75, 192, 192, 1)", // Adjust as needed
                        barThickness: 50,
                        barPercentage: 0.8,
                    },
                ],
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    datalabels: {
                        // Configure the plugin options
                        anchor: "end",
                        align: "-90",
                        color: ["#F9AF2F", "#07283B", "##F9AF2F", "#07283B"],
                        font: {
                            weight: "bold",
                            size: 14,
                        },
                    },
                },

                scales: {
                    yAxes: [
                        {
                            ticks: {
                                autoSkip: false,
                                padding: 2,
                            },
                            gridLines: {
                                display: false, // Remove the border in the x-axis scale
                                drawBorder: false, // Remove the border around the chart area
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                autoSkip: false,
                                padding: 2,
                            },
                            gridLines: {
                                display: false, // Remove the border in the x-axis scale
                                drawBorder: false, // Remove the border around the chart area
                            },
                        },
                    ],
                },
            },
        });
    }, [data]);

    return (
        <div style={{ width: "550px", height: "400px" }}>
            {" "}
            {/* Adjust the width and set height to 100% */}
            <canvas ref={chartRef} style={{ width:"100%", height: "100%" }} />{" "}
            {/* Set the height of the canvas to 100% */}
        </div>
    );
};

export default BarGraph;
