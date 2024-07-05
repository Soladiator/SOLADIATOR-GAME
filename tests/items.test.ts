import {getWeapon} from "../src/helpers/items";
import {Gender, Item, ItemType} from "@prisma/client";
import {createItem, deleteItem} from "@/services/item.service";
import {ItemCreateInput} from "@/types/items";
import {deleteUser, getUserByWallet} from "@/services/user.service";
import {createGladiator} from "@/services/gladiator.service";

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
      imgURL: null,
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
      imgURL: null,
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
      imgURL: null,
    };

    expect(() => getWeapon(mockItem)).toThrowError(
      "Weapon is missing damage attribute",
    );
  });
});

describe("createItem", () => {
  const mockWalletAddres = "testWallet";
  const mockItem = {
    name: "Test Item",
    itemType: ItemType.Weapon,
    minLevel: 1,
    ownerWallet: "testWallet",
    attributes: [
      {name: "damage", value: "10-12"},
      {
        name: "bonus",
        value: "DEX:5",
      },
    ],
  } as ItemCreateInput;

  const testVariables: {
    itemID?: number;
    userWalletAddres?: string;
  } = {
    itemID: undefined,
    userWalletAddres: undefined,
  };

  it("should create a user with the provided input", async () => {
    const user = await getUserByWallet(mockWalletAddres);
    testVariables.userWalletAddres = user.walletAddress;

    expect(user.walletAddress).toEqual(mockWalletAddres);
  });

  it("should create an item with the provided input and delete afterwards", async () => {
    const item = await createItem(mockItem);
    testVariables.itemID = item.id;

    //Add expect statement to compare item with mockItem
    expect(item).toEqual(expect.objectContaining(mockItem));
  });

  it("should delete an item with the provided id", async () => {
    expect(testVariables.itemID).toBeDefined();

    const deletedItem = await deleteItem(testVariables.itemID!);

    expect(deletedItem.id).toEqual(testVariables.itemID);
  });

  it("should delete user with the provided wallet address", async () => {
    expect(testVariables.userWalletAddres).toBeDefined();

    const deletedUser = await deleteUser(mockItem.ownerWallet);

    expect(deletedUser.walletAddress).toEqual(testVariables.userWalletAddres);
  });
});
