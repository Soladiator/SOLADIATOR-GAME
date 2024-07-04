import {getWeapon} from "../src/helpers/items";
import {Item, ItemType} from "@prisma/client";

describe("getWeapon", () => {
  it("Should return a weapon with computed attributes", () => {
    const mockItem: Item = {
      id: 1,
      name: "Test Weapon",
      itemType: ItemType.Weapon,
      minLevel: 1,
      ownerWallet: "testWallet",
      createdAt: new Date(),
      attributes: [
        {name: "damage", value: "10-20"},
        {name: "bonus", value: "damage:5"},
      ],
    };

    const result = getWeapon(mockItem);

    expect(result).toEqual({
      ...mockItem,
      itemType: ItemType.Weapon,
      damageRange: [10, 20],
      bonuses: [{type: "damage", value: 5}],
    });
  });

  it("Should throw an error if item is not a weapon", () => {
    const mockItem: Item = {
      id: 2,
      name: "Test Armor",
      itemType: ItemType.Armor,
      minLevel: 1,
      ownerWallet: "testWallet",
      createdAt: new Date(),
      attributes: [],
    };

    expect(() => getWeapon(mockItem)).toThrowError("Item is not a Weapon");
  });

  it("Should throw an error if weapon is missing damage attribute", () => {
    const mockItem: Item = {
      id: 3,
      name: "Test Weapon",
      itemType: ItemType.Weapon,
      minLevel: 1,
      ownerWallet: "testWallet",
      createdAt: new Date(),
      attributes: [],
    };

    expect(() => getWeapon(mockItem)).toThrowError(
      "Weapon is missing damage attribute",
    );
  });
});
