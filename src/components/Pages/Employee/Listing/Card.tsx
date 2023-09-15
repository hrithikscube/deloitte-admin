import React from 'react';

interface CardProps {
  image: any
  text: any
  value: any
}

const Card = ({ image, text, value }: CardProps) => (
  <div>
    <div className="flex items-center gap-6 p-4 bg-white border rounded-md  border-DreamyCloud">
      <div>
        <img src={image} alt="logo1" />
      </div>
      <div className="flex flex-col space-y-1">
        <p className="text-lg font-nunitoBold">{text.includes('Fuels') ? `${value} L` : value}</p>
        <p className="text-sm text-Comet">{text}</p>
      </div>
    </div>
  </div>
);

export default Card;
