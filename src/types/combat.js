"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefenseType = exports.HitType = void 0;
var HitType;
(function (HitType) {
    HitType["Normal"] = "Normal";
    HitType["Critical"] = "Critical";
})(HitType || (exports.HitType = HitType = {}));
var DefenseType;
(function (DefenseType) {
    DefenseType["Dodge"] = "Dodge";
    DefenseType["Block"] = "Block";
    DefenseType["Normal"] = "Normal";
})(DefenseType || (exports.DefenseType = DefenseType = {}));
