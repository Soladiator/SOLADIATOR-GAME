"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combat = exports.computeCombatEntity = void 0;
var stats_1 = require("../src/helpers/stats");
var items_1 = require("../src/helpers/items");
var client_1 = require("@prisma/client");
var combat_1 = require("../src/types/combat");
var computeCombatEntity = function (character, baseCharacterStats, items) {
    var _a;
    var characterStats = (0, stats_1.getCharacterStats)(baseCharacterStats);
    var equippedItems = (_a = {},
        _a[client_1.ItemType.Weapon] = null,
        _a[client_1.ItemType.Armor] = null,
        _a[client_1.ItemType.Shield] = null,
        _a[client_1.ItemType.Helmet] = null,
        _a[client_1.ItemType.Boots] = null,
        _a[client_1.ItemType.Gloves] = null,
        _a[client_1.ItemType.Ring] = null,
        _a[client_1.ItemType.Necklace] = null,
        _a);
    for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
        var item = items_2[_i];
        switch (item.itemType) {
            case client_1.ItemType.Weapon:
                var weapon = (0, items_1.getWeapon)(item);
                equippedItems[client_1.ItemType.Weapon] = weapon;
                break;
            case client_1.ItemType.Armor:
                var armor = (0, items_1.getArmor)(item);
                equippedItems[client_1.ItemType.Armor] = armor;
                break;
            case client_1.ItemType.Shield:
                var shield = (0, items_1.getShield)(item);
                equippedItems[client_1.ItemType.Shield] = shield;
                break;
            case client_1.ItemType.Helmet:
                var helmet = (0, items_1.getHelmet)(item);
                equippedItems[client_1.ItemType.Helmet] = helmet;
                break;
            case client_1.ItemType.Boots:
                var boots = (0, items_1.getBoots)(item);
                equippedItems[client_1.ItemType.Boots] = boots;
                break;
            case client_1.ItemType.Gloves:
                var gloves = (0, items_1.getGloves)(item);
                equippedItems[client_1.ItemType.Gloves] = gloves;
                break;
            case client_1.ItemType.Ring:
                var ring = (0, items_1.getRing)(item);
                equippedItems[client_1.ItemType.Ring] = ring;
                break;
            case client_1.ItemType.Necklace:
                var necklace = (0, items_1.getNecklace)(item);
                equippedItems[client_1.ItemType.Necklace] = necklace;
                break;
        }
    }
    var damageRange = [0, 0];
    var damageReduction = 0;
    //Go through each item and add the stats to the combat entity
    for (var itemType in equippedItems) {
        var item = equippedItems[itemType];
        //item is a type of ComputedItem and so has bonuses property. Go through each bonus and add it to the combat entity
        if (item) {
            if (item.itemType === client_1.ItemType.Weapon) {
                damageRange = item.damageRange;
            }
            for (var _b = 0, _c = item.bonuses; _b < _c.length; _b++) {
                var bonus = _c[_b];
                switch (bonus.type) {
                    case "damage":
                        damageRange = [
                            damageRange[0] + bonus.value,
                            damageRange[1] + bonus.value,
                        ];
                        break;
                    case "damageReduction":
                        damageReduction += bonus.value;
                        break;
                    default:
                        characterStats[bonus.type] += bonus.value;
                        break;
                }
            }
        }
    }
    var combatStats = (0, stats_1.getCombatStats)(characterStats, damageRange, damageReduction);
    var maxHealth = (0, stats_1.getStatCorrespondingValue)(client_1.StatType.VIT, characterStats.VIT);
    if (maxHealth < character.currentHealth) {
        throw new Error("Character's health can not be greater than max health. Current health: " +
            character.currentHealth +
            " Max Health " +
            maxHealth);
    }
    var combatEntity = __assign(__assign({}, character), { combatStats: combatStats, maxHealth: maxHealth, stats: characterStats });
    return combatEntity;
};
exports.computeCombatEntity = computeCombatEntity;
/**
 * This function represents an attack action in the game.
 * @param attacker The character who is making the attack.
 * @returns The result of the attack including the damage and if it was a critical hit.
 */
var attack = function (attacker) {
    var hitType = combat_1.HitType.Normal;
    var dexteritySuccess = Math.random() < attacker.combatStats.dodgeOrCritChance / 100;
    var damageRange = attacker.combatStats.damageRange;
    var damage = damageRange[0] +
        Math.floor(Math.random() * (damageRange[1] - damageRange[0]));
    if (dexteritySuccess) {
        hitType = combat_1.HitType.Critical;
        damage *= 2;
    }
    return { damage: damage, hitType: hitType };
};
/**
 * This function represents a defend action in the game.
 * @param defender The character who is defending against the attack.
 * @param attack The attack that the defender is trying to defend against.
 * @returns The result of the defend action, including the type of defense, the incoming damage, and the updated defender.
 */
var defend = function (defender, attack) {
    var dexteritySuccess = Math.random() < defender.combatStats.dodgeOrCritChance / 100;
    var defendType = combat_1.DefenseType.Normal;
    var incomingDamage = 0;
    if (dexteritySuccess) {
        defendType = combat_1.DefenseType.Dodge;
    }
    else {
        incomingDamage = Math.floor(attack.damage * (1 - defender.combatStats.damageReduction * 0.01));
    }
    defender.currentHealth -= incomingDamage;
    // Ensure currentHealth doesn't go below 0
    if (defender.currentHealth < 0) {
        defender.currentHealth = 0;
    }
    return {
        defendType: defendType,
        incomingDamage: incomingDamage,
        health: defender.currentHealth,
    };
};
var combatRound = function (attacker, defender) {
    var attackResult = attack(attacker);
    var defendResult = defend(defender, attackResult);
    return {
        attackResult: attackResult,
        defendResult: defendResult,
    };
};
var combat = function (entityOne, entityTwo) {
    var _a;
    var combatRounds = [];
    var round = 1;
    var attacker = entityOne;
    var defender = entityTwo;
    while (entityOne.currentHealth > 0 && entityTwo.currentHealth > 0) {
        var result = combatRound(attacker, defender);
        combatRounds.push(__assign(__assign({ round: round }, result), { attacker: attacker.id.toString(), defender: defender.id.toString() }));
        round++;
        // Swap attacker and defender for the next round
        _a = [defender, attacker], attacker = _a[0], defender = _a[1];
    }
    var winner = entityOne.currentHealth > 0 ? entityOne : entityTwo;
    var loser = winner === entityOne ? entityTwo : entityOne;
    return {
        rounds: combatRounds,
        winner: winner,
        loser: loser,
    };
};
exports.combat = combat;
