"use client"
import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemType, ItemTypes } from '../types/itemtypes';
import Item from './item';

interface StashProps {
  items: ItemType[];
  onDrop: (item: ItemType) => void;
}

const Stash: React.FC<StashProps> = ({ items, onDrop }) => {
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
    <div ref={ref} className="grid overflow-auto min-h-[25vh] grid-cols-8 gap-2 p-4 border bg-black bg-opacity-50 border-gray-400">
      <div className="col-span-8 text-center text-white text-3xl">Stash</div>
      {items.map((item) => (
        <div key={item.id} className="border border-gray-300 h-24 flex items-center justify-center">
          <Item item={item} />
        </div>
      ))}
    </div>
  );
};

export default Stash;
