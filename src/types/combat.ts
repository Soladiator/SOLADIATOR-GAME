import {Character} from "@prisma/client";

enum HitType {
  Normal = "Normal",
  Critical = "Critical",
  Miss = "Miss",
}

interface CombatEntity extends Character {
  damage?: number;
  damageReduction?: number;
}
