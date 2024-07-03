"use client"
import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../types/itemtypes';
import Item from './item';

interface InventoryProps {
  items: {
    helmet: { id: number; name: string; itemType: string } | null;
    weapon: { id: number; name: string; itemType: string } | null;
    armor: { id: number; name: string; itemType: string } | null;
    shield: { id: number; name: string; itemType: string } | null;
    pants: { id: number; name: string; itemType: string } | null;
    boots: { id: number; name: string; itemType: string } | null;
  };
  onDrop: (item: { id: number; name: string; itemType: string }) => void;
}

const Inventory: React.FC<InventoryProps> = ({ items, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item: { id: number; name: string; itemType: string }) => {
      onDrop(item);
    },
  });

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-2 p-4 border border-gray-400">
      <div className="col-span-3 text-center">Inventory</div>
      {['helmet', 'weapon', 'armor', 'shield', 'pants', 'boots'].map((type) => (
        <div key={type} className="border border-gray-300 h-20 flex items-center justify-center">
          {items[type as keyof typeof items] ? (
            <Item item={items[type as keyof typeof items] as { id: number; name: string; itemType: string }} />
          ) : (
            <span>{type}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Inventory;
