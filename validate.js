"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
var exceptions_1 = require("./exceptions");
var Validate = /** @class */ (function () {
    function Validate() {
    }
    Validate.prototype.validarValor = function (valor, min, max) {
        if (valor < min || valor > max) {
            throw new exceptions_1.ValueIsNotValid("VALOR INVÁLIDO!");
        }
    };
    Validate.prototype.validarTamanhoNome = function (nome, tamanho_min, tamanho_max) {
        if (nome.length < tamanho_min || nome.length > tamanho_max) {
            throw new exceptions_1.ValueIsNotValid("TAMANHO DO NOME INVÁLIDO");
        }
    };
    return Validate;
}());
exports.Validate = Validate;
