"use client"
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Inventory from '../inventory';
import Stash from '../stash';

const InventoryDrag = () => {
  const [inventory, setInventory] = useState({
    helmet: null,
    weapon: null,
    armor: null,
    shield: null,
    pants: null,
    boots: null,
  });

  const [stash, setStash] = useState([
    { id: 1, name: 'Sword', itemType: 'weapon' },
    { id: 2, name: 'Shield', itemType: 'shield' },
    { id: 3, name: 'Helmet', itemType: 'helmet' },
    { id: 4, name: 'Armor', itemType: 'armor' },
    { id: 5, name: 'Pants', itemType: 'pants' },
    { id: 6, name: 'Boots', itemType: 'boots' },
    // Add more dummy items as needed
  ]);

  const handleDrop = (item:any) => {
    setInventory((prev) => ({
      ...prev,
      [item.itemType]: stash.find((i) => i.id === item.id),
    }));
    setStash((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 p-4">
        <Stash items={stash} />
        <Inventory items={inventory} onDrop={handleDrop} />
      </div>
    </DndProvider>
  );
};

export default InventoryDrag;
