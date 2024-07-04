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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNecklace = exports.getRing = exports.getGloves = exports.getHelmet = exports.getBoots = exports.getArmor = exports.getShield = exports.getWeapon = void 0;
var client_1 = require("@prisma/client");
// Function to ensure the item type matches the expected type
function ensureItemType(item, expectedType) {
    if (item.itemType !== expectedType) {
        throw new Error("Item is not a ".concat(client_1.ItemType[expectedType]));
    }
}
// Function to check if a type is a valid bonus type
function isBonusType(type) {
    var validTypes = __spreadArray(__spreadArray([], Object.values(client_1.StatType), true), [
        "damage",
        "damageReduction",
    ], false);
    return validTypes.includes(type);
}
// Function to compute the bonus attributes of an item
function computeBonusAttributes(item) {
    var bonusAttributes = item.attributes
        .filter(function (attribute) { return attribute.name === "bonus"; })
        .map(function (attribute) {
        var _a = attribute.value.split(":"), bonusType = _a[0], value = _a[1];
        if (!isBonusType(bonusType)) {
            throw new Error("Invalid bonus type: ".concat(bonusType));
        }
        return { type: bonusType, value: parseInt(value) };
    });
    return bonusAttributes;
}
// Function to get computed item with bonus attributes
function getComputedItem(item) {
    return __assign(__assign({}, item), { bonuses: computeBonusAttributes(item) });
}
// Higher order function to wrap a function with computed item
function withComputedItem(getItem) {
    return function (item) {
        var computedItem = getComputedItem(item);
        return getItem(computedItem);
    };
}
exports.getWeapon = withComputedItem(function (item) {
    ensureItemType(item, client_1.ItemType.Weapon);
    var damage = item.attributes.find(function (attribute) {
        return attribute.name === "damage";
    });
    if (!damage) {
        throw new Error("Weapon is missing damage attribute");
    }
    var _a = damage.value
        .split("-")
        .map(function (value) {
        return parseInt(value);
    })
        .sort(function (a, b) { return a - b; }), low = _a[0], high = _a[1];
    return __assign(__assign({}, item), { itemType: client_1.ItemType.Weapon, damageRange: [low, high] });
});
exports.getShield = withComputedItem(function (item) {
    ensureItemType(item, client_1.ItemType.Shield);
    var damageReduction = item.attributes.find(function (attribute) {
        return attribute.name === "damageReduction";
    });
    if (!damageReduction) {
        throw new Error("Shield is missing damage reduction attribute");
    }
    return __assign(__assign({}, item), { itemType: client_1.ItemType.Shield, damageReduction: parseInt(damageReduction.value) });
});
exports.getArmor = withComputedItem(function (item) {
    ensureItemType(item, client_1.ItemType.Armor);
    return __assign(__assign({}, item), { itemType: client_1.ItemType.Armor });
});
exports.getBoots = withComputedItem(function (item) {
    ensureItemType(item, client_1.ItemType.Boots);
    return __assign(__assign({}, item), { itemType: client_1.ItemType.Boots });
});
exports.getHelmet = withComputedItem(function (item) {
    ensureItemType(item, client_1.ItemType.Helmet);
    return __assign(__assign({}, item), { itemType: client_1.ItemType.Helmet });
});
exports.getGloves = withComputedItem(function (item) {
    ensureItemType(item, client_1.ItemType.Gloves);
    return __assign(__assign({}, item), { itemType: client_1.ItemType.Gloves });
});
exports.getRing = withComputedItem(function (item) {
    ensureItemType(item, client_1.ItemType.Ring);
    return __assign(__assign({}, item), { itemType: client_1.ItemType.Ring });
});
exports.getNecklace = withComputedItem(function (item) {
    ensureItemType(item, client_1.ItemType.Necklace);
    return __assign(__assign({}, item), { itemType: client_1.ItemType.Necklace });
});
