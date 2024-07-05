"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCombatStats = exports.getCharacterStats = exports.getStatCorrespondingValue = void 0;
var client_1 = require("@prisma/client");
var MODIFIERS = (_a = {},
    _a[client_1.StatType.STR] = 1,
    _a[client_1.StatType.DEF] = {
        base: 30, // Defense: Base value for calculating the character's defense.
        modifier: -0.05, // Modifier for calculating the character's defense.
    },
    _a[client_1.StatType.DEX] = {
        base: 40, // Dexterity: Base value for calculating the character's dexterity.
        modifier: -0.03, // Modifier for calculating the character's dexterity.
    },
    _a[client_1.StatType.LCK] = 0.1,
    _a[client_1.StatType.VIT] = 5,
    _a);
/**
 * @description This function calculates the effect of each stat type.
 *
 * @param statType The type of the stat.
 * @param value The value of the stat.
 *
 * @returns Depending on the stat type:
 * - If STR, it returns a damage value. This represents the additional damage the character can inflict.
 * - If DEF, it returns how much the damage will be reduced by. This represents the character's defense against incoming damage.
 * - If DEX, it returns the chance to dodge or land a critical hit, in percentage. A critical hit inflicts 2x the damage and cannot be dodged.
 * - If LCK, it returns an additional drop chance percentage. This represents the character's luck in finding more items.
 * - If VIT, it returns the max health amount. This represents the character's total health points.
 */
var getStatCorrespondingValue = function (type, value) {
    switch (type) {
        case client_1.StatType.STR:
            return value * MODIFIERS[client_1.StatType.STR];
        case client_1.StatType.DEF:
            return Math.round(MODIFIERS[client_1.StatType.DEF].base *
                (1 - Math.exp(MODIFIERS[client_1.StatType.DEF].modifier * value)));
        case client_1.StatType.DEX:
            return Math.round(MODIFIERS[client_1.StatType.DEX].base *
                (1 - Math.exp(MODIFIERS[client_1.StatType.DEX].modifier * value)));
        case client_1.StatType.LCK:
            return value * MODIFIERS[client_1.StatType.LCK];
        case client_1.StatType.VIT:
            return value * MODIFIERS[client_1.StatType.VIT];
    }
};
exports.getStatCorrespondingValue = getStatCorrespondingValue;
var getCharacterStats = function (baseCharacterStats) {
    var characterStatsObject = {
        STR: 0,
        VIT: 0,
        DEX: 0,
        DEF: 0,
        LCK: 0,
    };
    //Go through each character stat and add it to the object
    for (var _i = 0, baseCharacterStats_1 = baseCharacterStats; _i < baseCharacterStats_1.length; _i++) {
        var stat = baseCharacterStats_1[_i];
        characterStatsObject[stat.statType] = stat.value;
    }
    return characterStatsObject;
};
exports.getCharacterStats = getCharacterStats;
var getCombatStats = function (characterStats, damageRange, damageReduction) {
    return {
        damageRange: [
            (0, exports.getStatCorrespondingValue)(client_1.StatType.STR, characterStats.STR) +
                damageRange[0],
            (0, exports.getStatCorrespondingValue)(client_1.StatType.STR, characterStats.STR) +
                damageRange[1],
        ],
        damageReduction: (0, exports.getStatCorrespondingValue)(client_1.StatType.DEF, characterStats.DEF) +
            damageReduction,
        dodgeOrCritChance: (0, exports.getStatCorrespondingValue)(client_1.StatType.DEX, characterStats.DEX),
        bonusLuckPercentage: (0, exports.getStatCorrespondingValue)(client_1.StatType.LCK, characterStats.LCK),
    };
};
exports.getCombatStats = getCombatStats;
