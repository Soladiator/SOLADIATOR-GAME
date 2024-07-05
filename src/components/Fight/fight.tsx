import React from 'react';
import Image from 'next/image';

const Fight = ({ monster, onClose }: { monster: any; onClose: any }) => {
  const heroStats = {
    name: "Hero",
    src: "/hero.png",
    stats: {
      STR: 10,
      DEF: 8,
      DEX: 7,
      VIT: 12
    }
  };

  const gameData = [
    "Hero attacks with 10 damage.",
    "Monster defends and loses 8 health.",
    "Monster attacks with 5 damage.",
    "Hero defends and loses 3 health.",
    "Monster defends and loses 8 health.",
    "Monster attacks with 5 damage.",
    "Hero defends and loses 3 health."
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-black p-8 rounded-lg shadow-lg max-w-3xl w-full" style={{contain: "content"}}>
        <h1 className='uppercase text-5xl mb-4'>fight won</h1>
        <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
            <Image src={"/character/man.png"} alt='' width={200} height={280} />
            <p>{heroStats.name}</p>
            <p>STR: {heroStats.stats.STR}</p>
            <p>DEF: {heroStats.stats.DEF}</p>
            <p>DEX: {heroStats.stats.DEX}</p>
            <p>VIT: {heroStats.stats.VIT}</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={monster.src} alt='' width={200} height={280} />

            <p>DEF: {monster.stats.DEF}</p>
            <p>VIT: {monster.stats.VIT}</p>
          </div>
         
        </div>
        <div className="mt-6 h-[200px] border-t overflow-auto">
          {gameData.map((data, index) => (
            <div className='flex justify-between overflow-auto w-2/3 border-b my-2 p-1 mx-auto' key={index}>
                <p>Round {index}:</p>
                <p key={index}>{data}</p>
            </div>
          ))}
        </div>
        <div className=' my-4 border-t p-4'>
            <h2 className='uppercase text-xl border-b w-min flex mx-auto p-1 mb-4'>Earnings</h2>
            <p className='text-green-500'>wet pussy</p>
        </div>
        <button onClick={onClose} className="fixed top-4 right-4">
        <Image
              src="/icons/cross.svg"
              alt="round"
              width={40}
              height={40}
              className="cursor-pointer"
            />
        </button>
      </div>
    </div>
  );
};

export default Fight;
