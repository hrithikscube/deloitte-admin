interface CardProps {
    style?: any;
    text?: any;
    value?: any;
    loading?: any;
    previousValue?: any;
    currentValue?: any;
}

const Card = ({
    text,
    value,
    style,
    loading,
    previousValue,
    currentValue,
}: CardProps) => (
    <div>
        <div
            className={`${style} bg-white  p-6 flex justify-between lg:gap-20  items-center  border border-DreamyCloud`}
        >
            <div className="flex flex-col space-y-1">
                <p className="text-sm text-Comet">{text}</p>
                <p className="text-lg font-nunitoBold">
                    {loading ? (
                        <p className="font-nunitoBold">loading..</p>
                    ) : (
                        <> {value || 0}</>
                    )}
                </p>
            </div>

            <div className="flex flex-col mt-6">
                {text === "Total Number of Customer" ? (
                    <p className="w-16 text-transparent"></p>
                ) : (
                    <span
                        className={`${
                            previousValue > currentValue
                                ? "bg-red-100 text-[#F14D4D]"
                                : "bg-green-100 text-[#38AE5E]"
                        } rounded-[18px]  gap-2 justify-center items-center px-2 py-1 hidden`}
                    >
                        <p className="text-[14px] ">
                            {previousValue != 0 && currentValue ? (
                                <>
                                    {(
                                        (Number(currentValue - previousValue) /
                                            previousValue) *
                                        100
                                    ).toFixed(2)}
                                </>
                            ) : (
                                "0"
                            )}
                            %
                        </p>

                        <span className="w-[16px] h-[16px]">
                            {previousValue > currentValue ? (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.1849 13.1641L8.1849 3.16406"
                                        stroke="#F14D4D"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M12.2006 9.13281L8.18464 13.1661L4.16797 9.13281"
                                        stroke="#F14D4D"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.8151 2.83594L7.8151 12.8359"
                                        stroke="#38AE5E"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M3.79936 6.86719L7.81536 2.83385L11.832 6.86719"
                                        stroke="#38AE5E"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            )}
                        </span>
                    </span>
                )}
            </div>
        </div>
    </div>
);

export default Card;
