"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Herbalist = () => {
  const [maxHealth, setMaxHealth] = useState(50);
  const [currentHealth, setCurrentHealth] = useState(20);
  const [selectedHealth, setSelectedHealth] = useState(20);
  const [cost, setCost] = useState(0);

  const handleHealthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHealth = parseInt(event.target.value, 10);
    setSelectedHealth(newHealth);
    setCost((newHealth - currentHealth) * 2);
  };

  return (
    <div className='border rounded-xl h-[80vh] w-1/2 mx-auto p-4 bg-black bg-opacity-70'>
      <div className="text-center text-white text-3xl">Herbalist</div>
      <Image className='w-1/2 flex mx-auto my-10' src={"/merchants/herbalist.png"} alt='Herbalist' width={1000} height={1100} />
      
      <div className="text-center text-white text-xl mt-4">Player Health</div>
      <div className="flex justify-between w-2/3 mx-auto text-white text-lg mt-2">
        <span>Current: {currentHealth}</span>
        <span>Max: {maxHealth}</span>
      </div>
      
      <input
        type="range"
        min={currentHealth}
        max={maxHealth}
        value={selectedHealth}
        onChange={handleHealthChange}
        className="w-2/3 mx-auto mt-4 text-green-500"
      />
      
      <div className="text-center text-white text-xl mt-4">Cost:<span className=' text-yellow-500 ml-2 text-3xl'>{cost} </span> coins</div>
    </div>
  );
};

export default Herbalist;
