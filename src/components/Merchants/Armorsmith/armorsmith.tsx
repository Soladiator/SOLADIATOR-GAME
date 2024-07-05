"use client"
import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/types/itemtypes';
import Item from '../../item';
import { ItemType } from '@/types/itemtypes';
import Image from 'next/image';

interface ArmorsmithProps {
  items: ItemType[];
  onDrop: (item: ItemType) => void;
  mode: 'buy' | 'sell';
}

const Armorsmith: React.FC<ArmorsmithProps> = ({ items, onDrop, mode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item: ItemType) => {
      if (mode === 'sell') {
        onDrop(item);
      }
    },
  });

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);

  return (
    <div className='border rounded-xl p-4 bg-black bg-opacity-70'>
      <div className="text-center text-white text-3xl">Armorsmith</div>
      <Image className='w-1/2 flex mx-auto my-10' src={"/merchants/armorsmith.png"} alt='' width={1000} height={1100}></Image>
      <div ref={ref} className="grid overflow-auto grid-cols-6 gap-2 p-4 border min-h-[200px]  bg-black bg-opacity-50 border-gray-400">
        {items.map((item) => (
          <div key={item.id} className="border border-gray-300 h-16 w-16 flex items-center justify-center">
            <Item item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Armorsmith;
