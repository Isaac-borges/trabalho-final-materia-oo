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
exports.Guardiao = exports.Exausto = exports.Cidadao = exports.Patrulheiro = exports.Arqueiro = exports.Mago = exports.Guerreiro = exports.Personagem = void 0;
var _acao_1 = require("./_acao");
var exceptions_1 = require("./exceptions");
var validate_1 = require("./validate");
var Personagem = /** @class */ (function (_super) {
    __extends(Personagem, _super);
    function Personagem(id, nome, vida, ataque) {
        var _this = _super.call(this) || this;
        _this._historico = [];
        _this._id_acao = 0;
        _this._id = id;
        _this.validarTamanhoNome(nome, 1, 9);
        _this._nome = nome;
        _this.validarValor(vida, 1, 100);
        _this._vida = vida;
        _this._vida_maxima = vida;
        if (_this instanceof Cidadao)
            _this.validarValor(ataque, 0, 100);
        else
            _this.validarValor(ataque, 1, 100);
        _this._ataque = ataque;
        return _this;
    }
    Personagem.prototype.atacar = function (alvo) {
        var acao_ataque;
        var dano_base = this.calcularDano();
        var descricao_ataque;
        var dano_final = this.causarDano(alvo, dano_base);
        if (!alvo.estaVivo()) {
            throw new exceptions_1.DeadCantBeAttacked("O ALVO ESTÁ MORTO!");
        }
        if (!this.estaVivo()) {
            throw new exceptions_1.DeadCantAttack("ATACANTE JÁ ESTÁ MORTO!");
        }
        if (this.nome == alvo.nome) {
            throw new exceptions_1.CantAttackItself("NÃO PODE ATACAR A SI MESMO!");
        }
        if (this instanceof Guardiao) {
            throw new exceptions_1.GuardianCantAttack("GUARDIÃO NÃO PODE ATACAR");
        }
        if (dano_final === 0) {
            if (this instanceof Guardiao)
                descricao_ataque = "".concat(this.nome, " \u00C9 UM GUARDI\u00C3O E N\u00C3O P\u00D4DE ATACAR");
            else
                descricao_ataque = "\nO ATAQUE DE ".concat(this.nome_pad, " FOI APARADO POR ").concat(alvo.nome_pad, "!\n");
            alvo.registrarAcao(new _acao_1.Acao(++alvo.id_acao, alvo, this, "\n".concat(alvo.nome_pad, " DEFENDEU UM ATAQUE DE ").concat(this.nome_pad, "!"), 0, new Date()));
        }
        descricao_ataque = this.gerarDescricaoAtaque(alvo, dano_final);
        acao_ataque = new _acao_1.Acao(++this._id_acao, this, alvo, descricao_ataque, dano_final, new Date());
        this.registrarAcao(acao_ataque);
        return acao_ataque;
    };
    Personagem.prototype.causarDano = function (alvo, dano) {
        return alvo.receberDano(dano);
    };
    Personagem.prototype.calcularDano = function () {
        return this._ataque;
    };
    Personagem.prototype.receberDano = function (valor) {
        this._vida -= valor;
        if (this._vida < 0)
            this._vida = 0;
        return valor;
    };
    Personagem.prototype.receberDanoVerdadeiro = function (valor) {
        this._vida = this._vida - valor;
        if (this._vida < 0)
            this._vida = 0;
    };
    Personagem.prototype.estaVivo = function () {
        return this.vida > 0;
    };
    Personagem.prototype.registrarAcao = function (acao) {
        this._historico.push(acao);
    };
    Personagem.prototype.historicoLength = function () {
        return this._historico.length;
    };
    Personagem.prototype.getAcoesDesde = function (inicio) {
        return this._historico.slice(inicio);
    };
    Personagem.prototype.gerarDescricaoAtaque = function (alvo, dano) {
        var descricao_ataque = "".concat(this.nome_pad, " ATACOU ").concat(alvo.nome_pad, " E TIROU ").concat(dano, " DE VIDA!");
        return descricao_ataque;
    };
    Personagem.prototype.toJSON = function () {
        return {
            nome: this.nome,
            vida: this.vida,
            ataque: this.ataque,
            tipo: this.constructor.name,
            extras: this.coletarAtributoExtra(),
        };
    };
    Personagem.prototype.coletarAtributoExtra = function () {
        if (this instanceof Guerreiro) {
            return { defesa: this.defesa };
        }
        if (this instanceof Arqueiro) {
            return { ataque_multiplo: this.ataque_multiplo };
        }
        if (this instanceof Patrulheiro) {
            return {};
        }
        return {};
    };
    Object.defineProperty(Personagem.prototype, "nome", {
        get: function () {
            return this._nome.toUpperCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "nome_pad", {
        get: function () {
            var nome = this._nome;
            nome = nome.toUpperCase();
            while (nome.length < 9) {
                nome = nome + " ";
            }
            return nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "id_acao", {
        get: function () {
            return this._id_acao;
        },
        set: function (id_acao) {
            this._id_acao = id_acao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "ataque", {
        get: function () {
            return this._ataque;
        },
        set: function (valor) {
            this._ataque = valor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "vida", {
        get: function () {
            return this._vida;
        },
        set: function (valor_novo) {
            this._vida = valor_novo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "vida_maxima", {
        get: function () {
            return this._vida_maxima;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "acoes", {
        get: function () {
            return this._historico;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "tipoPersonagem", {
        get: function () {
            return this.constructor.name;
        },
        enumerable: false,
        configurable: true
    });
    return Personagem;
}(validate_1.Validate));
exports.Personagem = Personagem;
var Guerreiro = /** @class */ (function (_super) {
    __extends(Guerreiro, _super);
    function Guerreiro(id, nome, vida, ataque, defesa) {
        var _this = _super.call(this, id, nome, vida, ataque) || this;
        _this.validarValor(defesa, 1, 100);
        _this._defesa = defesa;
        return _this;
    }
    Guerreiro.prototype.receberDano = function (valor) {
        if (valor <= this._defesa) {
            return 0;
        }
        var dano_real = valor - this._defesa;
        _super.prototype.receberDano.call(this, dano_real);
        return dano_real;
    };
    Guerreiro.prototype.calcularDano = function () {
        var dano = this.ataque;
        if (this.vida <= Math.floor(this.vida_maxima * 0.3)) {
            dano = Math.floor(dano * 1.3);
        }
        return dano;
    };
    Guerreiro.prototype.gerarDescricaoAtaque = function (alvo, dano) {
        if (this.vida <= Math.floor(this.vida_maxima * 0.3)) {
            return "".concat(this.nome_pad, " FEZ UM ATAQUE FURIOSO EM ").concat(alvo.nome_pad, " E CAUSOU ").concat(dano, " DE DANO!");
        }
        return "".concat(this.nome_pad, " ATACOU ").concat(alvo.nome_pad, " E TIROU ").concat(dano, " DE VIDA!");
    };
    Object.defineProperty(Guerreiro.prototype, "defesa", {
        get: function () {
            return this._defesa;
        },
        enumerable: false,
        configurable: true
    });
    return Guerreiro;
}(Personagem));
exports.Guerreiro = Guerreiro;
var Mago = /** @class */ (function (_super) {
    __extends(Mago, _super);
    function Mago() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mago.prototype.causarDano = function (alvo, dano_base) {
        var dano_final = dano_base;
        if (alvo instanceof Arqueiro) {
            dano_final = dano_final * 2;
        }
        alvo.receberDanoVerdadeiro(dano_final);
        this.receberDanoVerdadeiro(10);
        this.registrarAcao(new _acao_1.Acao(++this.id_acao, this, this, "".concat(this.nome_pad, " GASTOU 10 DE VIDA PARA USAR MAGIA!"), 10, new Date()));
        this.estaVivo();
        return dano_final;
    };
    Mago.prototype.gerarDescricaoAtaque = function (alvo, dano) {
        var texto = "".concat(this.nome_pad, " LAN\u00C7OU UMA MAGIA EM ").concat(alvo.nome_pad, "!\n");
        if (alvo instanceof Guerreiro) {
            texto += "A DEFESA DO ALVO FOI IGNORADA!\n";
        }
        if (alvo instanceof Arqueiro) {
            texto += "E O ALVO SOFREU DANO DOBRADO!\n";
        }
        texto += "CAUSOU ".concat(dano, " DE DANO!\n");
        return texto;
    };
    return Mago;
}(Personagem));
exports.Mago = Mago;
var Arqueiro = /** @class */ (function (_super) {
    __extends(Arqueiro, _super);
    function Arqueiro(id, nome, vida, ataque, ataque_multiplo) {
        var _this = _super.call(this, id, nome, vida, ataque) || this;
        _this._sorteio_multiplo = false;
        _this._ataque_multiplo = ataque_multiplo;
        return _this;
    }
    Arqueiro.prototype.causarDano = function (alvo, dano_base) {
        this._sorteio_multiplo = false;
        var chance_critico = Math.random();
        var dano_ataque_multiplo = dano_base;
        if (chance_critico >= 0.5) {
            dano_ataque_multiplo = dano_ataque_multiplo * this._ataque_multiplo;
            this._sorteio_multiplo = true;
        }
        alvo.receberDano(dano_ataque_multiplo);
        return dano_ataque_multiplo;
    };
    Object.defineProperty(Arqueiro.prototype, "ataque_multiplo", {
        get: function () {
            return this._ataque_multiplo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Arqueiro.prototype, "sorteio_multiplo", {
        get: function () {
            return this._sorteio_multiplo;
        },
        enumerable: false,
        configurable: true
    });
    Arqueiro.prototype.gerarDescricaoAtaque = function (alvo, dano) {
        if (this.sorteio_multiplo) {
            return "".concat(this.nome_pad, " ATIROU ").concat(this.ataque_multiplo, " FLECHAS EM ").concat(alvo.nome_pad, " E CAUSOU ").concat(dano, " DE DANO!");
        }
        return "".concat(this.nome_pad, " ATIROU UMA FLECHA EM ").concat(alvo.nome_pad, " E CAUSOU ").concat(dano, " DE DANO!");
    };
    return Arqueiro;
}(Personagem));
exports.Arqueiro = Arqueiro;
var Patrulheiro = /** @class */ (function (_super) {
    __extends(Patrulheiro, _super);
    function Patrulheiro(id, nome, vida, ataque) {
        var _this = _super.call(this, id, nome, vida, ataque) || this;
        _this._companheiro_animal_vida_max = Math.floor(_this.vida_maxima * 0.25);
        _this._companheiro_animal_vida_atual = _this._companheiro_animal_vida_max;
        return _this;
    }
    Patrulheiro.prototype.companheiroAnimalEstaVivo = function () {
        return this._companheiro_animal_vida_atual > 0;
    };
    Patrulheiro.prototype.causarDano = function (alvo, dano_base) {
        var dano_final = dano_base;
        if (this.companheiroAnimalEstaVivo()) {
            dano_final = Math.floor(dano_final * 1.75);
        }
        alvo.receberDano(dano_final);
        return dano_final;
    };
    Patrulheiro.prototype.receberDano = function (valor) {
        var resto = valor;
        if (this.companheiroAnimalEstaVivo()) {
            var absorvido = Math.min(resto, this._companheiro_animal_vida_atual);
            this._companheiro_animal_vida_atual =
                this._companheiro_animal_vida_atual - absorvido;
            resto -= absorvido;
        }
        if (resto > 0) {
            this.vida -= resto;
            if (this.vida < 0)
                this.vida = 0;
        }
        return valor;
    };
    Patrulheiro.prototype.gerarDescricaoAtaque = function (alvo, dano) {
        if (this.companheiroAnimalEstaVivo()) {
            return "".concat(this.nome_pad, " E SEU COMPANHEIRO ANIMAL ATACARAM ").concat(alvo.nome_pad, "! ").concat(alvo.nome_pad, " SOFREU ").concat(dano, " DE DANO!");
        }
        return "".concat(this.nome_pad, " ATACOU ").concat(alvo.nome_pad, "! ").concat(alvo.nome_pad, " SOFREU ").concat(dano, " DE DANO!");
    };
    Object.defineProperty(Patrulheiro.prototype, "vida_companheiro_max", {
        get: function () {
            return this._companheiro_animal_vida_max;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Patrulheiro.prototype, "vida_companheiro_atual", {
        get: function () {
            return this._companheiro_animal_vida_atual;
        },
        enumerable: false,
        configurable: true
    });
    return Patrulheiro;
}(Personagem));
exports.Patrulheiro = Patrulheiro;
var Cidadao = /** @class */ (function (_super) {
    __extends(Cidadao, _super);
    function Cidadao(id, nome, vida, ataque) {
        if (vida === void 0) { vida = 1; }
        if (ataque === void 0) { ataque = 0; }
        return _super.call(this, id, nome, vida, ataque) || this;
    }
    Cidadao.prototype.gerarDescricaoAtaque = function (alvo, dano) {
        var descricao_ataque = "".concat(this.nome_pad, " ATACOU ").concat(alvo.nome_pad, "!\nE FOI INUTIL....");
        return descricao_ataque;
    };
    return Cidadao;
}(Personagem));
exports.Cidadao = Cidadao;
var Guardiao = /** @class */ (function (_super) {
    __extends(Guardiao, _super);
    function Guardiao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Guardiao.prototype.causarDano = function (alvo, dano) {
        throw new exceptions_1.GuardianCantAttack("GUARDIÃO NÃO PODE ATACAR");
    };
    return Guardiao;
}(Personagem));
exports.Guardiao = Guardiao;
var Exausto = /** @class */ (function (_super) {
    __extends(Exausto, _super);
    function Exausto(id, nome, vida, ataque) {
        return _super.call(this, id, nome, vida, ataque) || this;
    }
    Exausto.prototype.causarDano = function (alvo, dano_base) {
        var dano_final = dano_base;
        this.ataque = Math.floor(this.ataque / 2);
        return alvo.receberDano(dano_final);
    };
    Exausto.prototype.gerarDescricaoAtaque = function (alvo, dano) {
        var descricao_ataque = "".concat(this.nome_pad, " ATACOU ").concat(alvo.nome_pad, " E TIROU ").concat(dano, " DE VIDA!\n").concat(this.nome_pad, " SE CANSOU\nATAQUE DIMINUIDO PELA METADE.");
        return descricao_ataque;
    };
    return Exausto;
}(Personagem));
exports.Exausto = Exausto;
