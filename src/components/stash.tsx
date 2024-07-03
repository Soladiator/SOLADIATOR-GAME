"use client"
import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../types/itemtypes';
import Item from './item';

interface StashProps {
  items: { id: number; name: string; itemType: string }[];
  onDrop: (item: { id: number; name: string; itemType: string }) => void;
}

const Stash: React.FC<StashProps> = ({ items, onDrop }) => {
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
    <div ref={ref} className="grid overflow-auto h-[25vh] grid-cols-8 gap-2 p-4 border border-gray-400">
      <div className="col-span-8 text-center">Stash</div>
      {items.map((item) => (
        <div key={item.id} className="border border-gray-300 h-20 flex items-center justify-center">
          <Item item={item} />
        </div>
      ))}
    </div>
  );
};

export default Stash;
