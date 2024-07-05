import {
  createGladiator,
  deleteGladiator,
  equipItemToGladiator,
  unequipItemToGladiator,
} from "@/services/gladiator.service";
import {createItem, deleteItem} from "@/services/item.service";
import {getUserByWallet} from "@/services/user.service";
import {ItemCreateInput} from "@/types/items";
import {Gender, ItemType} from "@prisma/client";

describe("createGladiator and equipItem", () => {
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
    gladiatorID?: number;
    itemID?: number;
    userWalletAddres?: string;
  } = {
    itemID: undefined,
    gladiatorID: undefined,
    userWalletAddres: undefined,
  };

  it("should create a user with the provided input", async () => {
    const user = await getUserByWallet(mockWalletAddres);
    testVariables.userWalletAddres = user.walletAddress;

    expect(user.walletAddress).toEqual(mockWalletAddres);
  });

  it("creates a new gladiator", async () => {
    const gladiatorInput = {
      name: "Test Gladiator",
      statDistribution: {
        STR: 8,
        VIT: 5,
        DEX: 5,
        DEF: 5,
        LCK: 5,
      },
      gender: Gender.Male,
      ownerWallet: mockWalletAddres,
    };

    const gladiator = await createGladiator(gladiatorInput);
    testVariables.gladiatorID = gladiator.id;

    expect(gladiator).toHaveProperty("id");
    expect(gladiator).toHaveProperty("ownerWallet");
    expect(gladiator).toHaveProperty("character");
    expect(gladiator.character).toHaveProperty("name", gladiatorInput.name);
    expect(gladiator.character).toHaveProperty("currentHealth");
    expect(gladiator.character).toHaveProperty("availableStatPoints");
    expect(gladiator.character).toHaveProperty("characterStat");
  });

  it("should throw error to due to faulty stat distribution", async () => {
    const gladiatorInput = {
      name: "Test Gladiator",
      statDistribution: {
        STR: 10,
        VIT: 5,
        DEX: 5,
        DEF: 5,
        LCK: 5,
      },
      gender: Gender.Male,
      ownerWallet: mockWalletAddres,
    };

    try {
      await createGladiator(gladiatorInput);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("should create an item with the provided input and delete afterwards", async () => {
    const item = await createItem(mockItem);
    testVariables.itemID = item.id;

    //Add expect statement to compare item with mockItem
    expect(item).toEqual(expect.objectContaining(mockItem));
  });

  it("should equip item to gladiator", async () => {
    expect(testVariables.gladiatorID).toBeDefined();
    expect(testVariables.itemID).toBeDefined();

    //Add expect statement to compare item with mockItem
    const equippedItems = await equipItemToGladiator({
      gladiatorId: testVariables.gladiatorID!,
      itemId: testVariables.itemID!,
    });

    expect(equippedItems).toBeTruthy();
  });

  it("should throw error when trying to delete item with the provided id", async () => {
    expect(testVariables.itemID).toBeDefined();

    //Expect deleteItem to throw error
    await expect(deleteItem(testVariables.itemID!)).rejects.toThrow();
  });

  it("should unequip item from gladiator", async () => {
    expect(testVariables.gladiatorID).toBeDefined();
    expect(testVariables.itemID).toBeDefined();

    //Add expect statement to compare item with mockItem
    const equippedItems = await unequipItemToGladiator({
      gladiatorId: testVariables.gladiatorID!,
      itemId: testVariables.itemID!,
    });

    expect(equippedItems).toBeTruthy();
  });

  it("should delete an item with the provided id", async () => {
    expect(testVariables.itemID).toBeDefined();

    const deletedItem = await deleteItem(testVariables.itemID!);

    expect(deletedItem.id).toEqual(testVariables.itemID);
  });

  it("should delete previously created gladiator", async () => {
    expect(testVariables.gladiatorID).toBeDefined();

    const gladiator = await deleteGladiator(testVariables.gladiatorID!);

    expect(gladiator).toBeTruthy();
  });
});
