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
    <div className='mx-auto text-2xl w-full bg-black text-white  border  p-3 bg-opacity-20'>
       {totalPoints - usedPoints > 0 ? (
            <p className='text-center text-xl'>Points available: {totalPoints - usedPoints}</p>
       ): (<div className='h-8'></div>)}

      <div>
        {Object.keys(stats).map((stat) => (
          <div className='flex justify-between md:px-16 md:py-1 w-full my-1' key={stat}>
            <label>{stat} </label>
            <div className='text-start'>:</div>
            <div className=' col-span-3  flex justify-between gap-12 text-center'>
                <button style={{backgroundImage: 'url("/icons/decrement.png")', backgroundSize: 'cover'}} className='  hover:bg-opacity-20 text-yellow-950 w-[35px] h-[32px] hover:opacity-70 py-0 rounded-full' onClick={() => handleDecrement(stat as StatKeys)}></button>
                <span className='text-center'>{stats[stat as StatKeys]}</span>
                <button style={{backgroundImage: 'url("/icons/increment.png")', backgroundSize: 'cover'}} className='  hover:bg-opacity-20 text-yellow-950 w-[35px] h-[32px] hover:opacity-70 py-0 rounded-full' onClick={() => handleIncrement(stat as StatKeys)}>+</button>
            </div>
          </div>
        ))}
            
      </div>
    </div>
  );
};

export default StatsForm;
