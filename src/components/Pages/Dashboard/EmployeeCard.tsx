import React from "react";

const EmployeeCard = ({card}:any):any => {
    return (
        <div className="flex flex-row flex-wrap  justify-center mt-5 items-center">
            <div className="p-5 rounded-full bg-AzureishWhite dashboardAnalylitics dark:bg-OuterSpace">
                <div className="w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center dark:bg-white ">
                    <div className=" cards-p">
                        <p className="font-semibold text-GunMetal">{card?.value}</p>
                    </div>
                </div>
                <p className="pt-4 pb-2 text-xs font-bold text-center text-Gunmetal dark:text-Gunmetal w-[40px] m-auto">
                   {card?.name}
                </p>
            </div>
        </div>
    );
};

export default EmployeeCard;
