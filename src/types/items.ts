import { Item } from "@prisma/client";

interface Weapon extends Item {
  readonly itemType: "Weapon";
  damageRange: [number, number] /* [LOW, HIGH] */;
}

interface Shield extends Item {
  readonly itemType: "Shield";
  damageReduction: number /* Percentage */;
}

interface Boots extends Item {
  readonly itemType: "Boots";
}

interface Helmet extends Item {
  readonly itemType: "Helmet";
}

interface Armor extends Item {
  readonly itemType: "Armor";
}

interface Gloves extends Item {
  readonly itemType: "Gloves";
}

interface Ring extends Item {
  readonly itemType: "Ring";
}

interface Necklace extends Item {
  readonly itemType: "Necklace";
}
