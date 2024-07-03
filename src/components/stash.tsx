import React from 'react';
import Item from './item';

interface StashProps {
  items: { id: number; name: string; itemType: string }[];
}

const Stash: React.FC<StashProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-8 gap-2 p-4 border border-gray-400">
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
