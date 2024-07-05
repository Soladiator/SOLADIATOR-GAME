import Image from 'next/image';
import React, { useState } from 'react';
import Fight from './fight';

const MonstersModal = () => {
  const [showFightModal, setShowFightModal] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState({ id: '', src: '', levelRange: '', stats: {} });

  const showFight = (id:any, src:any, levelRange:any, stats:any) => {
    setSelectedMonster({ id, src, levelRange, stats });
    //send request to backend with selected monster, also we need to have a 
    setShowFightModal(true);
  };

  return (
    <div className='w-full h-full bg-black bg-opacity-30 p-10 rounded-xl'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        <div className='flex flex-col border rounded-lg' id='1-1'>
          <Image className='rounded-lg' src={"/monsters/haydut1.png"} alt='' width={1000} height={1400} />
          <p className='text-neutral-300'>Recommended level: <span className='text-green-500'>1-5</span></p>
          <button onClick={() => showFight('1-1', '/monsters/haydut1.png', '1-5', { DEF: 1, VIT: 1 })} className="mt-2 px-4 mb-4 w-2/3 text-center mx-auto py-2 bg-green-500 text-white rounded">Fight</button>
        </div>
        <div className='flex flex-col border rounded-lg' id='1-2'>
          <Image className='rounded-lg' src={"/monsters/korkuluk2.png"} alt='' width={1000} height={1400} />
          <p className='text-neutral-300'>Recommended level: <span className='text-yellow-500'>5-10</span></p>
          <button onClick={() => showFight('1-2', '/monsters/korkuluk2.png', '5-10', { DEF: 2, VIT: 2 })} className="mt-2 px-4 mb-4 w-2/3 text-center mx-auto py-2 bg-yellow-500 text-white rounded">Fight</button>
        </div>
        <div className='flex flex-col border rounded-lg' id='1-3'>
          <Image className='rounded-lg' src={"/monsters/goblin3.png"} alt='' width={1000} height={1400} />
          <p className='text-neutral-300'>Recommended level: <span className='text-orange-500'>10-15</span></p>
          <button onClick={() => showFight('1-3', '/monsters/goblin3.png', '10-15', { DEF: 3, VIT: 3 })} className="mt-2 px-4 mb-4 w-2/3 text-center mx-auto py-2 bg-orange-500 text-white rounded">Fight</button>
        </div>
        <div className='flex flex-col border rounded-lg' id='1-4'>
          <Image src={"/monsters/ogreBOSS.png"} className='rounded-lg' alt='' width={1000} height={1400} />
          <p className='text-neutral-300'>Recommended level: <span className='text-red-500'>15-20</span></p>
          <button onClick={() => showFight('1-4', '/monsters/ogreBOSS.png', '15-20', { DEF: 4, VIT: 4 })} className="mt-2 px-4 mb-4 w-2/3 text-center mx-auto py-2 bg-red-500 text-white rounded">Fight</button>
        </div>
      </div>

      {showFightModal && <Fight monster={selectedMonster} onClose={() => setShowFightModal(false)} />}
    </div>
  );
};

export default MonstersModal;
