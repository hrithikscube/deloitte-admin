import React, { useState, useMemo } from "react";
import { DateFiter } from "../../Common/Input/DateFiter";
import Card from "./Card";
import EmployeeCard from "./EmployeeCard";
import ChartGraphs from "./Graphs";
import { SelectInput } from "../../../components/Common/Input/Select";
import { dummyOptions } from "../../../utils/helpers";
const options = [
    { name: "Finance" },
    { name: "Operations management" },
    { name: "Risk management" },
    { name: "Financial accounting" },
    { name: "Accounting" },
    { name: "Monetary policy" },
]
const list = [
    {
        value:'5655',
        name:'Total Employees'
    },
    {
        value:'2658',
        name:`Branch Manager`
    },
    {
        value:'502',
        name:`Chief Investment`
    },
    {
        value:'458',
        name:`Chief Risk Off`
    },
    {
        value:'220',
        name:`Operations Manager`
    },
    {
        value:'21',
        name:`Treasury Analyst`
    },
    {
        value:'154',
        name:`Relationship Manager`
    },
    {
        value:'154',
        name:`Risk Analyst`
    }
    
]
const Dashboard = () => {
    const [date, setDate] = useState({
        start_date: new Date(),
        end_date: new Date(),
    });
    const onDateSelect = (date: any) => {
        setDate(date);
    };
    return (
        <div className="">
            <div className="flex flex-col justify-between w-full gap-4 pt-4 lg:pt-0 lg:flex-row">
                <p className="text-2xl text-[#141C4C] font-nunitoBold">
                    Welcome Back, Sanket
                </p>
                <p>
                    <DateFiter
                        onDateRangeSelect={onDateSelect}
                        id="1"
                        defaultValue={"0"}
                    />
                </p>
            </div>

            {/*cards */}
            <div className="flex flex-col w-full gap-6 mt-6 lg:mt-9 lg:flex-row">
                <Card
                    text="Total Number of Employees"
                    value={254}
                    style="rounded-md"
                    loading={false}
                />
                <Card
                    text="Total Active Profiles"
                    value={142}
                    style="rounded-md"
                    loading={false}
                />
                <Card
                    text="Total Inactive Profiles"
                    value={112}
                    style="rounded-md"
                    loading={false}
                />
            </div>

            <br />
            {/* Graphs */}

            <div className="bg-white ">
                <div className="grid grid-cols-3 gap-4 p-4 border-b ">
                    <div>
                        {" "}
                        <p className="text-xl text-[#141C4C] font-nunitoBold">
                            Cards Status Analytics
                        </p>
                        <p>Department wise Card Status Analytics</p>
                    </div>

                    <SelectInput
                        width="100%"
                        options={options}
                        label="Select Designation "
                        name="type"
                        // value={x.type}
                    />
                    <SelectInput
                        width="100%"
                        options={list}
                        label="Select Department"
                        name="type"
                        // value={x.type}
                    />
                </div>

                <br />

                <ChartGraphs />
            </div>

            <br />
            {/* Emplyoees Cards */}
            <div className="bg-white rounded-lg ">
                <div className="grid grid-cols-3 gap-4 p-4 border-b ">
                    <div>
                        {" "}
                        <p className="text-xl text-[#141C4C] font-nunitoBold">
                            Cards Status Analytics
                        </p>
                        <p>Department wise Card Status Analytics</p>
                    </div>
                    <div></div>
                    <SelectInput
                        width="100%"
                        options={dummyOptions}
                        label="Select Department"
                        name="type"
                        // value={x.type}
                    />
                </div>
                <div className="flex justify-between gap-4 p-4 ">
                    {list?.map((card) => {
                        return <EmployeeCard card={card} />;
                    })}
                </div>
            </div>

            {/**Bargraph */}
        </div>
    );
};

export default Dashboard;
