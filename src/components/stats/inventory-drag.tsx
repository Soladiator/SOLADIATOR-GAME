"use client"
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Inventory from '../inventory';
import Stash from '../stash';
import { ItemType } from '@/types/itemtypes';

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
    { id: 1, name: 'Sword', itemType: 'weapon', minLevel: 1, attributes: [] },
    { id: 2, name: 'Shield', itemType: 'shield', minLevel: 1, attributes: [] },
    { id: 3, name: 'Helmet', itemType: 'helmet', minLevel: 1, attributes: [] },
    { id: 4, name: 'Armor', itemType: 'armor', minLevel: 1, attributes: [] },
    { id: 5, name: 'Pants', itemType: 'pants', minLevel: 1, attributes: [] },
    { id: 6, name: 'Boots', itemType: 'boots', minLevel: 1, attributes: [] },
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
      <div className="gap-4 flex max-w-xl z-50 mx-auto flex-col p-4">
        <Inventory items={inventory} onDrop={handleInventoryDrop} />
        <Stash items={stash} onDrop={handleStashDrop} />
      </div>
    </DndProvider>
  );
};

export default InventoryDrag;
