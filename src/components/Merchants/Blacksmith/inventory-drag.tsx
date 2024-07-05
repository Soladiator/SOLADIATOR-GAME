"use client"
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Stash from '../stash-merchant';
import Blacksmith from './blacksmith';
import { ItemType } from '@/types/itemtypes';

const InventoryDrag = () => {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');

  const [blacksmithInventory, setBlacksmithInventory] = useState<ItemType[]>([
    { id: 1, name: 'Sword', itemType: 'weapon', minLevel: 1, attributes: [] },
    { id: 2, name: 'Shield', itemType: 'shield', minLevel: 1, attributes: [] },
    { id: 3, name: 'Helmet', itemType: 'helmet', minLevel: 1, attributes: [] },
    { id: 4, name: 'Armor', itemType: 'armor', minLevel: 1, attributes: [] },
    { id: 5, name: 'Pants', itemType: 'pants', minLevel: 1, attributes: [] },
    { id: 6, name: 'Boots', itemType: 'boots', minLevel: 1, attributes: [] },
    // Add more items as needed
  ]);

  const [stash, setStash] = useState<ItemType[]>([
    { id: 7, name: 'Shield', itemType: 'shield', minLevel: 1, attributes: [] },
    { id: 8, name: 'Helmet', itemType: 'helmet', minLevel: 1, attributes: [] },
    { id: 9, name: 'Armor', itemType: 'armor', minLevel: 1, attributes: [] },
    { id: 10, name: 'Pants', itemType: 'pants', minLevel: 1, attributes: [] },
    { id: 11, name: 'Boots', itemType: 'boots', minLevel: 1, attributes: [] },
    // Add more items as needed
  ]);

  const handleBlacksmithDrop = (item: ItemType) => {
    if (mode === 'sell') {
      setStash((prevStash) => prevStash.filter((i) => i.id !== item.id));
      setBlacksmithInventory((prevInventory) => [...prevInventory, item]);
    }
  };

  const handleStashDrop = (item: ItemType) => {
    if (mode === 'buy') {
      setBlacksmithInventory((prevInventory) => prevInventory.filter((i) => i.id !== item.id));
      setStash((prevStash) => [...prevStash, item]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="gap-4 flex w-2/3 mx-auto flex-col p-4">
        
        <div className="grid grid-cols-2 min-h-[200px] gap-4">
          <div className=''>
           
            <Blacksmith items={blacksmithInventory} onDrop={handleBlacksmithDrop} mode={mode} />
          </div>
          <Stash items={stash} onDrop={handleStashDrop} mode={mode} />
        </div>
        <div className="">
        <button className={`px-4 py-2 mr-2 ${mode === 'buy' ? 'bg-green-500' : 'bg-gray-700'} text-white`} onClick={() => setMode('buy')}>Buy</button>
          <button className={`px-4 py-2 ${mode === 'sell' ? 'bg-red-500' : 'bg-gray-700'} text-white`} onClick={() => setMode('sell')}>Sell</button>
        </div>
      </div>
    </DndProvider>
  );
};

export default InventoryDrag;
