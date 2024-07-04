import {ComputedCombatEntity} from "../src/types/combat";
import {combat, computeCombatEntity} from "../game/game";
import {
  Character,
  CharacterStat,
  Item,
  ItemType,
  StatType,
} from "@prisma/client";
import {
  generateRandomMockCharacter,
  generateRandomMockCharacterStats,
  generateRandomMockItem,
  generateRandomMockShield,
  generateRandomMockWeapon,
} from "../src/helpers/tests";

describe("computeCombatEntity", () => {
  it("Should compute combat entity correctly", () => {
    const mockCharacter1: Character = generateRandomMockCharacter();
    const mockCharacterStats1: CharacterStat[] =
      generateRandomMockCharacterStats(mockCharacter1.id);
    const mockItems1: Item[] = [
      generateRandomMockWeapon("AsQxAXRniK8DL82g61sBTcWzGuqW9ZsKHKS78b6fVgWo"),
      generateRandomMockShield("AsQxAXRniK8DL82g61sBTcWzGuqW9ZsKHKS78b6fVgWo"),
      generateRandomMockItem(
        ItemType.Boots,
        "AsQxAXRniK8DL82g61sBTcWzGuqW9ZsKHKS78b6fVgWo",
      ),
      generateRandomMockItem(
        ItemType.Helmet,
        "AsQxAXRniK8DL82g61sBTcWzGuqW9ZsKHKS78b6fVgWo",
      ),
    ];

    const combatEntity1: ComputedCombatEntity = computeCombatEntity(
      mockCharacter1,
      mockCharacterStats1,
      mockItems1,
    );

    const mockCharacter2: Character = generateRandomMockCharacter();
    const mockCharacterStats2: CharacterStat[] =
      generateRandomMockCharacterStats(mockCharacter1.id);
    const mockItems2: Item[] = [
      generateRandomMockWeapon("AsQxAXRniK8DL82g61sBTcWzGuqW9ZsKHKS78b6fVgWo"),
      generateRandomMockShield("AsQxAXRniK8DL82g61sBTcWzGuqW9ZsKHKS78b6fVgWo"),
      generateRandomMockItem(
        ItemType.Boots,
        "AsQxAXRniK8DL82g61sBTcWzGuqW9ZsKHKS78b6fVgWo",
      ),
      generateRandomMockItem(
        ItemType.Helmet,
        "AsQxAXRniK8DL82g61sBTcWzGuqW9ZsKHKS78b6fVgWo",
      ),
    ];

    const combatEntity2: ComputedCombatEntity = computeCombatEntity(
      mockCharacter2,
      mockCharacterStats2,
      mockItems2,
    );

    const combatResult = combat(combatEntity2, combatEntity1);

    expect(combatResult).toBeInstanceOf(Object);
    expect(combatResult).toHaveProperty("winner");
    expect(combatResult).toHaveProperty("loser");
    expect(combatResult).toHaveProperty("rounds");
    expect(typeof combatResult.winner).toBe("object");
    expect(typeof combatResult.loser).toBe("object");
    expect(Array.isArray(combatResult.rounds)).toBe(true);
  });
});
