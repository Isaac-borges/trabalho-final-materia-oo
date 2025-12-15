"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batalha = void 0;
var exceptions_1 = require("./exceptions");
var Batalha = /** @class */ (function () {
    function Batalha() {
        this._personagens = [];
        this._acoes = [];
        this._iniciada = false;
        this._indexVez = 0;
    }
    Batalha.prototype.adicionarPersonagem = function (novo_personagem) {
        if (this._iniciada) {
            throw new Error("\nNÃO É POSSIVEL ADICIONAR PERSONAGENS DEPOIS DO INÍCIO DA BATALHA.");
        }
        for (var _i = 0, _a = this._personagens; _i < _a.length; _i++) {
            var personagem = _a[_i];
            if (personagem.nome === novo_personagem.nome) {
                throw new exceptions_1.CharacterNameIsEqual("PERSONAGEM TEM NOME IGUAL À OUTRO");
            }
        }
        this._personagens.push(novo_personagem);
        novo_personagem.id_acao = this._personagens.length * 1000;
    };
    Batalha.prototype.consultarPersonagem = function (nome) {
        for (var _i = 0, _a = this._personagens; _i < _a.length; _i++) {
            var personagem = _a[_i];
            if (personagem.nome === nome.toUpperCase())
                return personagem;
        }
        throw new exceptions_1.CharacterNotFound("PERSONAGEM NÃO ENCONTRADO!");
    };
    Batalha.prototype.consultarPersonagemPorID = function (id) {
        for (var _i = 0, _a = this._personagens; _i < _a.length; _i++) {
            var personagem = _a[_i];
            if (personagem.id === id)
                return personagem;
        }
        throw new exceptions_1.CharacterNotFound("PERSONAGEM NÃO ENCONTRADO!");
    };
    Batalha.prototype.existePersonagemComNome = function (nome) {
        return this._personagens.some(function (p) { return p.nome === nome.toUpperCase(); });
    };
    Batalha.prototype.listarPersonagens = function () {
        return this._personagens;
    };
    Batalha.prototype.listarAcoes = function () {
        return this._acoes;
    };
    Batalha.prototype.iniciar = function () {
        this._iniciada = true;
        this._indexVez = this.encontrarProximoVivoIndex(-1);
    };
    Batalha.prototype.personagemDaVez = function () {
        var index = this._indexVez;
        if (this._personagens.length === 0)
            throw new exceptions_1.NoManStanding("NENHUM PERSONAGEM NA BATALHA!");
        var personagem = this._personagens[index];
        if (!personagem || !personagem.estaVivo()) {
            var prox = this.encontrarProximoVivoIndex(index);
            if (prox === -1)
                throw new exceptions_1.NoManStanding("NENHUM PERSONAGEM VIVO!");
            this._indexVez = prox;
            return this._personagens[this._indexVez];
        }
        return personagem;
    };
    Batalha.prototype.listarInimigosVivosDo = function (atacante) {
        return this._personagens
            .filter(function (p) { return p.estaVivo() && p.id !== atacante.id; })
            .map(function (p) { return ({ id: p.id, nome_pad: p.nome_pad }); });
    };
    Batalha.prototype.executarAtaque = function (atacanteId, defensorId) {
        if (!this._iniciada)
            this.iniciar();
        var atacante = this.consultarPersonagemPorID(atacanteId);
        var defensor = this.consultarPersonagemPorID(defensorId);
        var personagem_da_vez = this.personagemDaVez();
        if (atacante.id !== personagem_da_vez.id) {
            throw new exceptions_1.AplicacaoException("NÃO É A VEZ DESSE PERSONAGEM!");
        }
        var tamanho_historico_antes = atacante.historicoLength();
        var acaoPrincipal = atacante.atacar(defensor);
        var novas = atacante.getAcoesDesde(tamanho_historico_antes);
        for (var _i = 0, novas_1 = novas; _i < novas_1.length; _i++) {
            var acao = novas_1[_i];
            this._acoes.push(acao);
        }
        this.avancarVez();
        var vivos = this._personagens.filter(function (p) {
            return p.estaVivo();
        });
        if (vivos.length === 1) {
            return novas;
        }
        else if (vivos.length === 0) {
            throw new exceptions_1.NoManStanding("NENHUM JOGADOR VIVO!");
        }
        return novas;
    };
    Batalha.prototype.encontrarProximoVivoIndex = function (index_inicial) {
        var n = this._personagens.length;
        if (n === 0)
            return -1;
        for (var i = 1; i <= n; i++) {
            var index = (index_inicial + i + n) % n;
            var personagem = this._personagens[index];
            if (personagem && personagem.estaVivo())
                return index;
        }
        return -1;
    };
    Batalha.prototype.avancarVez = function () {
        var prox = this.encontrarProximoVivoIndex(this._indexVez);
        if (prox === -1) {
            this._indexVez = 0;
        }
        else {
            this._indexVez = prox;
        }
    };
    Batalha.prototype.isIniciada = function () {
        return this._iniciada;
    };
    Batalha.prototype.verificarVencedor = function () {
        var vivos = this._personagens.filter(function (p) {
            return p.estaVivo();
        });
        if (vivos.length === 1)
            return vivos[0];
        if (vivos.length === 0)
            throw new exceptions_1.NoManStanding("NENHUM JOGADOR VIVO!");
        return null;
    };
    return Batalha;
}());
exports.Batalha = Batalha;
