"use client"
import React, { useState } from 'react';

type StatKeys = 'STR' | 'VIT' | 'DEX' | 'DEF' | 'LCK';

interface Stats {
  STR: number;
  VIT: number;
  DEX: number;
  DEF: number;
  LCK: number;
}

const initialStats: Stats = {
  STR: 5,
  VIT: 5,
  DEX: 5,
  DEF: 5,
  LCK: 5,
};

const StatsForm: React.FC = () => {
  const [stats, setStats] = useState<Stats>(initialStats);
  const totalPoints = 35;
  const usedPoints = Object.values(stats).reduce((acc, stat) => acc + stat, 0);

  const handleIncrement = (stat: StatKeys) => {
    if (usedPoints < totalPoints) {
      setStats((prevStats) => ({
        ...prevStats,
        [stat]: prevStats[stat] + 1,
      }));
    }
  };

  const handleDecrement = (stat: StatKeys) => {
    if (stats[stat] > 5) {
      setStats((prevStats) => ({
        ...prevStats,
        [stat]: prevStats[stat] - 1,
      }));
    }
  };

  return (
    <div className='mx-auto text-2xl w-[60%] bg-black text-white border-yellow-950 border  p-3 bg-opacity-20'>
       {totalPoints - usedPoints > 0 ? (
            <p className='text-center text-xl'>Points available: {totalPoints - usedPoints}</p>
       ): (<div className='h-8'></div>)}

      <div>
        {Object.keys(stats).map((stat) => (
          <div className='grid grid-cols-5 my-1' key={stat}>
            <label>{stat} </label>
            <div className='text-start'>:</div>
            <div className=' col-span-3 justify-end grid grid-cols-3 gap-12 text-center'>
                <button className='bg-white  hover:bg-opacity-20 text-yellow-950 w-[40px] py-0 rounded-full' onClick={() => handleDecrement(stat as StatKeys)}>-</button>
                <span className='text-center'>{stats[stat as StatKeys]}</span>
                <button className=' bg-white hover:bg-opacity-20 text-yellow-950 w-[40px] text-center items-center py-0 rounded-full' onClick={() => handleIncrement(stat as StatKeys)}>+</button>
            </div>
          </div>
        ))}
            
      </div>
    </div>
  );
};

export default StatsForm;
