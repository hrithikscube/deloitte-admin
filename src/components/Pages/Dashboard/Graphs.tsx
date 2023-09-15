import React from "react";
import BarGraph from "../../graphs/BarGraph";
import ChartGraph from "../../graphs/ChartGraph";

const Graphs = () => {
    const barChartData = {
        labels: [
            ["Total", "Employees"],
            ["Cards Delivered"],
            ["Cards Dispatched"],
            ["Cards", "Inprogress"],
        ],
        datasetLabel: "Dataset", // Example dataset label
        backgroundColor: ["#F9AF2F", "#07283B", "##F9AF2F", "#07283B"],
        datasetData: [210, 150, 70, 100], // Example dataset data

        borderColor: "#fffff",
    };
    const chartData = {
        labels: ["Segment 1", "Segment 2", "Segment 3"],
        datasetData: [30, 20, 50],
    };
    return (
        <div className="grid  grid-cols-2 gap-3 p-4 rounded-lg">
            <div className="w-full">
            <BarGraph data={barChartData} />
            </div>
            <div className="border-l ">
                <div className="relative">
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <p className="text-[#141C4C] text-xl font-nunitoBold text-center">
                            Total Profiles
                        </p>
                        <p className="text-[#6DC4EA] font-nunitoBold text-3xl text-center">
                            45
                        </p>
                    </div>
                    <ChartGraph data={chartData} />
                </div>

                <div className="w-1/2 m-auto">
                    <div className="grid items-center justify-center grid-cols-3">
                        <span className="w-[55px] h-[17px] bg-[#EAEDF0] border flex justify-center"></span>
                        <p className="text-[#141C4C] text-[14px] font-nunitoRegular flex justify-center">
                        Active Profiles
                        </p>
                        <p className="text-[#141C4C] text-[20px] font-nunitoBold flex justify-end">
                            45
                        </p>
                    </div>
                    <div className="grid items-center justify-center grid-cols-3">
                        <span className="w-[55px] h-[17px] bg-[#FFC453] border flex justify-center"></span>
                        <p className="text-[#141C4C] text-[14px] font-nunitoRegular flex justify-center">
                        Inactive Profiles
                        </p>
                        <p className="text-[#141C4C] text-[20px] font-nunitoBold flex justify-end">
                            54
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Graphs;
