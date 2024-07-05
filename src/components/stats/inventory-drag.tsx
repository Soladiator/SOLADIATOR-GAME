"use client";
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Inventory from '../inventory';
import Stash from '../stash';
import { ItemType } from '@/types/itemtypes';
import StatsForm from './stats-form';
import Image from 'next/image';

const InventoryDrag = () => {
  const [inventory, setInventory] = useState<{
    helmet: ItemType | null;
    weapon: ItemType | null;
    hand: ItemType | null;
    ring: ItemType | null;
    necklace: ItemType | null;
    armor: ItemType | null;
    shield: ItemType | null;
    pants: ItemType | null;
    boots: ItemType | null;
  }>({
    helmet: null,
    weapon: null,
    hand: null,
    ring: null,
    necklace: null,
    armor: null,
    shield: null,
    pants: null,
    boots: null,
  });

  const [stash, setStash] = useState<ItemType[]>([
    { id: 1, name: 'Sword', itemType: 'weapon', minLevel: 1, attributes: [] },
    { id: 2, name: 'Shield', itemType: 'shield', minLevel: 1, attributes: [] },
    { id: 3, name: 'Helmet', itemType: 'helmet', minLevel: 1, attributes: [] },
    { id: 4, name: 'Armor', itemType: 'armor', minLevel: 1, attributes: [] },
    { id: 5, name: 'Pants', itemType: 'pants', minLevel: 1, attributes: [] },
    { id: 6, name: 'Boots', itemType: 'boots', minLevel: 1, attributes: [] },
    { id: 7, name: 'Hand', itemType: 'hand', minLevel: 1, attributes: [] },
    { id: 8, name: 'Ring', itemType: 'ring', minLevel: 1, attributes: [] },
    { id: 9, name: 'Necklace', itemType: 'necklace', minLevel: 1, attributes: [] },
    { id: 11, name: 'Sword', itemType: 'weapon', minLevel: 1, attributes: [] },
    { id: 12, name: 'Shield', itemType: 'shield', minLevel: 1, attributes: [] },
    { id: 13, name: 'Helmet', itemType: 'helmet', minLevel: 1, attributes: [] },
    { id: 14, name: 'Armor', itemType: 'armor', minLevel: 1, attributes: [] },
    { id: 15, name: 'Pants', itemType: 'pants', minLevel: 1, attributes: [] },
    { id: 16, name: 'Boots', itemType: 'boots', minLevel: 1, attributes: [] },
  ]);

  const handleDrop = (item: ItemType, targetType: 'inventory' | 'stash') => {
    if (targetType === 'inventory') {
      if (inventory[item.itemType as keyof typeof inventory]) {
        console.log(`${item.itemType} slot is already occupied.`);
        return;
      }
      setStash((prevStash) => prevStash.filter((i) => i.id !== item.id));
      setInventory((prevInventory) => ({
        ...prevInventory,
        [item.itemType]: item,
      }));
    } else if (targetType === 'stash') {
      const selectedItem = inventory[item.itemType as keyof typeof inventory];
      if (selectedItem) {
        setStash((prevStash) => [...prevStash, selectedItem]);
        setInventory((prevInventory) => ({
          ...prevInventory,
          [item.itemType]: null,
        }));
      }
    }
  };

  const handleInventoryDrop = (item: ItemType) => handleDrop(item, 'inventory');
  const handleStashDrop = (item: ItemType) => handleDrop(item, 'stash');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='bg-black bg-opacity-50'>
        <div className="gap-4 flex md:grid mx-auto md:flex-row grid-cols-2 p-4">
        <Inventory items={inventory} onDrop={handleInventoryDrop} />
          <div className='col-span-1 gap-4 grid'>

           <StatsForm />
            <Stash items={stash} onDrop={handleStashDrop} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default InventoryDrag;
