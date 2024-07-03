"use client"
import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../types/itemtypes';

interface ItemProps {
  item: {
    id: number;
    name: string;
    itemType: string;
  };
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { id: item.id, name: item.name, itemType: item.itemType },
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
      className="h-full w-[10vw] flex items-center justify-center bg-gray-200"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {item.name}
    </div>
  );
};

export default Item;
