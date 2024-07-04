"use client"
import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemType, ItemTypes } from '../types/itemtypes';
import Item from './item';

interface InventoryProps {
  items: {
    helmet: ItemType | null;
    weapon: ItemType | null;
    armor: ItemType | null;
    shield: ItemType | null;
    pants: ItemType | null;
    boots: ItemType | null;
  };
  onDrop: (item: ItemType) => void;
}

const Inventory: React.FC<InventoryProps> = ({ items, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item: ItemType) => {
      onDrop(item);
    },
  });

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-2 p-4 bg-black bg-opacity-50 border border-gray-400">
      <div className="col-span-3 text-center text-white text-3xl">Inventory</div>
      {['helmet', 'weapon', 'armor', 'shield', 'pants', 'boots'].map((type) => (
        <div key={type} className="border border-gray-300 h-20 flex items-center justify-center">
          {items[type as keyof typeof items] ? (
            <Item item={items[type as keyof typeof items] as ItemType} />
          ) : (
            <span className='text-white shadow-lg uppercase'>{type}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Inventory;
