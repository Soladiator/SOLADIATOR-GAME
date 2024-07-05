"use client"
import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemType, ItemTypes } from '../types/itemtypes';

interface ItemProps {
  item: ItemType;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <div
      ref={ref}
      className="h-full w-[10vw] flex items-center justify-center bg-neutral-800"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {item.name}
    </div>
  );
};

export default Item;
