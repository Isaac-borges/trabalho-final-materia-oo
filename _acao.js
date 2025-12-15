"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acao = void 0;
var Acao = /** @class */ (function () {
    function Acao(id, origem, alvo, descricao, valor_dano, data_hora) {
        this._id = id;
        this._origem = origem;
        this._alvo = alvo;
        this._descricao = descricao;
        this._valor_dano = valor_dano;
        this._data_hora = data_hora;
    }
    Object.defineProperty(Acao.prototype, "descricao", {
        get: function () {
            return this._descricao;
        },
        enumerable: false,
        configurable: true
    });
    return Acao;
}());
exports.Acao = Acao;
