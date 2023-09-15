import React from 'react';

interface Props {
  title: string
}

const HeadingTab: React.FC<Props> = ({ title }) => (
  <div className="h-[54px] bg-CalmWaters flex items-center pl-[20px] rounded-lg mb-[24px]">
    <p className="text-[18px] font-bold font-nunitoRegular text-SpaceCadet">{title}</p>
  </div>
);

export default HeadingTab;
