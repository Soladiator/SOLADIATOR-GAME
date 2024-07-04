"use client"
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Inventory from '../inventory';
import Stash from '../stash';

interface ItemType {
  id: number;
  name: string;
  itemType: string;
}

const InventoryDrag = () => {
  const [inventory, setInventory] = useState<{
    helmet: ItemType | null;
    weapon: ItemType | null;
    armor: ItemType | null;
    shield: ItemType | null;
    pants: ItemType | null;
    boots: ItemType | null;
  }>({
    helmet: null,
    weapon: null,
    armor: null,
    shield: null,
    pants: null,
    boots: null,
  });

  const [stash, setStash] = useState<ItemType[]>([
    { id: 1, name: 'Sword', itemType: 'weapon' },
    { id: 2, name: 'Shield', itemType: 'shield' },
    { id: 3, name: 'Helmet', itemType: 'helmet' },
    { id: 4, name: 'Armor', itemType: 'armor' },
    { id: 5, name: 'Pants', itemType: 'pants' },
    { id: 6, name: 'Boots', itemType: 'boots' },
    { id: 7, name: 'Shield', itemType: 'shield' },
    { id: 8, name: 'Helmet', itemType: 'helmet' },
    { id: 9, name: 'Armor', itemType: 'armor' },
    { id: 10, name: 'Pants', itemType: 'pants' },
    { id: 11, name: 'Boots', itemType: 'boots' },
    { id: 12, name: 'Shield', itemType: 'shield' },
    { id: 13, name: 'Helmet', itemType: 'helmet' },
    { id: 14, name: 'Armor', itemType: 'armor' },
    { id: 15, name: 'Pants', itemType: 'pants' },
    { id: 16, name: 'Boots', itemType: 'boots' },
    { id: 17, name: 'Shield', itemType: 'shield' },
    { id: 18, name: 'Helmet', itemType: 'helmet' },
    { id: 19, name: 'Armor', itemType: 'armor' },
    { id: 20, name: 'Pants', itemType: 'pants' },
    { id: 21, name: 'Boots', itemType: 'boots' },
    { id: 22, name: 'Shield', itemType: 'shield' },
    { id: 23, name: 'Helmet', itemType: 'helmet' },
    { id: 24, name: 'Armor', itemType: 'armor' },
    { id: 25, name: 'Pants', itemType: 'pants' },
    { id: 26, name: 'Boots', itemType: 'boots' },
  ]);

  const handleDrop = (item: { id: number; name: string; itemType: string }, targetType: 'inventory' | 'stash') => {
    if (targetType === 'inventory') {
      // Check if the slot is already occupied by an item of the same type
      if (inventory[item.itemType as keyof typeof inventory]) {
        console.log(`${item.itemType} slot is already occupied.`);
        return; // Prevent the drop if the slot is occupied
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
  

  const handleInventoryDrop = (item: { id: number; name: string; itemType: string }) => handleDrop(item, 'inventory');
  const handleStashDrop = (item: { id: number; name: string; itemType: string }) => handleDrop(item, 'stash');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="gap-4 flex max-w-xl mx-auto flex-col p-4">
        <Inventory items={inventory} onDrop={handleInventoryDrop} />
        <Stash items={stash} onDrop={handleStashDrop} />
      </div>
    </DndProvider>
  );
};

export default InventoryDrag;
