"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoManStanding = exports.ValueIsNotValid = exports.DeadCantBeAttacked = exports.DeadCantAttack = exports.CantAttackItself = exports.CharacterNameIsEqual = exports.AplicacaoException = exports.CharacterNotFound = exports.UnsuccessfulAttack = void 0;
var AplicacaoException = /** @class */ (function (_super) {
    __extends(AplicacaoException, _super);
    function AplicacaoException(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "AplicacaoException";
        Object.setPrototypeOf(_this, AplicacaoException.prototype);
        return _this;
    }
    return AplicacaoException;
}(Error));
exports.AplicacaoException = AplicacaoException;
var CharacterNotFound = /** @class */ (function (_super) {
    __extends(CharacterNotFound, _super);
    function CharacterNotFound(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "CharacterNotFound";
        Object.setPrototypeOf(_this, CharacterNotFound.prototype);
        return _this;
    }
    return CharacterNotFound;
}(AplicacaoException));
exports.CharacterNotFound = CharacterNotFound;
var CharacterNameIsEqual = /** @class */ (function (_super) {
    __extends(CharacterNameIsEqual, _super);
    function CharacterNameIsEqual(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "CharacterNameIsEqual";
        Object.setPrototypeOf(_this, CharacterNameIsEqual.prototype);
        return _this;
    }
    return CharacterNameIsEqual;
}(AplicacaoException));
exports.CharacterNameIsEqual = CharacterNameIsEqual;
var ValueIsNotValid = /** @class */ (function (_super) {
    __extends(ValueIsNotValid, _super);
    function ValueIsNotValid(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "ValueIsNotValid";
        Object.setPrototypeOf(_this, ValueIsNotValid.prototype);
        return _this;
    }
    return ValueIsNotValid;
}(AplicacaoException));
exports.ValueIsNotValid = ValueIsNotValid;
var UnsuccessfulAttack = /** @class */ (function (_super) {
    __extends(UnsuccessfulAttack, _super);
    function UnsuccessfulAttack(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "UnsuccessfulAttack";
        Object.setPrototypeOf(_this, UnsuccessfulAttack.prototype);
        return _this;
    }
    return UnsuccessfulAttack;
}(AplicacaoException));
exports.UnsuccessfulAttack = UnsuccessfulAttack;
var DeadCantAttack = /** @class */ (function (_super) {
    __extends(DeadCantAttack, _super);
    function DeadCantAttack(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "DeadCantAttack";
        Object.setPrototypeOf(_this, DeadCantAttack.prototype);
        return _this;
    }
    return DeadCantAttack;
}(UnsuccessfulAttack));
exports.DeadCantAttack = DeadCantAttack;
var DeadCantBeAttacked = /** @class */ (function (_super) {
    __extends(DeadCantBeAttacked, _super);
    function DeadCantBeAttacked(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "DeadCantBeAttacked";
        Object.setPrototypeOf(_this, DeadCantBeAttacked.prototype);
        return _this;
    }
    return DeadCantBeAttacked;
}(UnsuccessfulAttack));
exports.DeadCantBeAttacked = DeadCantBeAttacked;
var CantAttackItself = /** @class */ (function (_super) {
    __extends(CantAttackItself, _super);
    function CantAttackItself(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "CantAttackItself";
        Object.setPrototypeOf(_this, CantAttackItself.prototype);
        return _this;
    }
    return CantAttackItself;
}(UnsuccessfulAttack));
exports.CantAttackItself = CantAttackItself;
var NoManStanding = /** @class */ (function (_super) {
    __extends(NoManStanding, _super);
    function NoManStanding(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "NoManStanding";
        Object.setPrototypeOf(_this, NoManStanding.prototype);
        return _this;
    }
    return NoManStanding;
}(AplicacaoException));
exports.NoManStanding = NoManStanding;
