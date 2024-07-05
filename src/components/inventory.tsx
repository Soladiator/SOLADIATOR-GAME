"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemType, ItemTypes } from '../types/itemtypes';
import Item from './item';
import Image from 'next/image';
import StoryModal from './story-modal'; 

interface InventoryProps {
  items: {
    helmet: ItemType | null;
    weapon: ItemType | null;
    hand: ItemType | null;
    ring: ItemType | null;
    necklace: ItemType | null;
    armor: ItemType | null;
    shield: ItemType | null;
    pants: ItemType | null;
    boots: ItemType | null;
  };
  onDrop: (item: ItemType) => void;
}

const Inventory: React.FC<InventoryProps> = ({ items, onDrop }) => {
  const [showModal, setShowModal] = useState(false);
  const [userLevel, setUserLevel] = useState(1); 

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

  const positions = {
    helmet: { top: '10%', left: '30%', transform: 'translate(-50%, -50%)' },
    weapon: { top: '45%', left: '75%', transform: 'translate(-50%, -50%)' },
    // hand: { top: '40%', left: '15%', transform: 'translate(-50%, -50%)' },
    ring: { top: '90%', left: '10%', transform: 'translate(-50%, -50%)' },
    necklace: { top: '90%', left: '90%', transform: 'translate(-50%, -50%)' },
    armor: { top: '40%', left: '40%', transform: 'translate(-50%, -50%)' },
    shield: { top: '50%', left: '15%', transform: 'translate(-50%, -50%)' },
    // pants: { top: '70%', left: '50%', transform: 'translate(-50%, -50%)' },
    boots: { top: '90%', left: '40%', transform: 'translate(-50%, -50%)' },
  };

  const handleBookClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div ref={ref} className="relative w-full h-full" style={{ aspectRatio: '1/1.01' }}>
      <div
        className="w-full h-full absolute"
        style={{
          backgroundImage: 'url(/character/man.png)',
          backgroundSize: 'cover',
          backgroundPosition: '40%',
          opacity: 0.5,
        }}
      ></div>
      {Object.keys(positions).map((type) => (
        <div
          key={type}
          style={{
            position: 'absolute',
            ...positions[type as keyof typeof positions],
          }}
          className="border bg-black rounded-xl h-16 w-16 md:h-24 md:w-24 flex items-center justify-center"
        >
          {items[type as keyof typeof items] ? (
            <Item item={items[type as keyof typeof items] as ItemType} />
          ) : (
            <span className="text-white shadow-lg uppercase">{type}</span>
          )}
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        <div className='rounded-full p-4 border bg-black bg-opacity-50 hover:bg-white hover:bg-opacity-15 hover:cursor-pointer' onClick={handleBookClick}>
          <Image src="/icons/book.png" alt="Book" width={60} height={60} />
        </div>
      </div>
      {showModal && <StoryModal userLevel={userLevel} onClose={handleCloseModal} />}
    </div>
  );
};

export default Inventory;
