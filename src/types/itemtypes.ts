export const ItemTypes = {
    ITEM: 'item',
  };
  

  export interface AttributeType {
    name: string;
    value: string;
  }
  
  export interface ItemType {
    id: number;
    name: string;
    itemType: string;
    minLevel: number;
    attributes: AttributeType[];
  }
  