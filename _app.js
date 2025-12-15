"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var _personagem_1 = require("./_personagem");
var _batalha_1 = require("./_batalha");
var exceptions_1 = require("./exceptions");
var _menu_1 = require("./_menu");
var fs = require("fs");
var prompt = require("prompt-sync")();
var App = /** @class */ (function () {
    function App() {
        this._batalhas = [];
        this._batalha_atual = null;
    }
    App.prototype.iniciarApp = function () {
        var opcao = -1;
        do {
            console.clear();
            _menu_1.InterfaceUsuario.MenuInicial();
            opcao = Number(prompt("ESCOLHA UMA OPÇÃO: "));
            console.clear();
            switch (opcao) {
                case 1:
                    this.novaBatalha();
                    break;
                case 2:
                    if (this._batalha_atual != null) {
                        this.continuarBatalha();
                    }
                    else {
                        console.log("NENHUMA BATALHA ATIVA!");
                    }
                    break;
                case 3:
                    console.clear();
                    this.menuConsultas();
                    break;
                case 0:
                    console.clear();
                    console.log("ENCERRANDO...");
                    break;
                default:
                    console.log("OPÇÃO INVÁLIDA!");
            }
            prompt("INSIRA <ENTER> PARA CONTINUAR...");
            console.clear();
        } while (opcao !== 0);
    };
    App.prototype.novaBatalha = function () {
        this._batalha_atual = new _batalha_1.Batalha();
        this._batalhas.push(this._batalha_atual);
        console.log("NOVA BATALHA CRIADA. ADICIONE OS PERSONAGENS ANTES DE INICIAR.");
        this.continuarBatalha();
    };
    App.prototype.continuarBatalha = function () {
        var _a, _b, _c, _d, _e, _f;
        var opcao = -1;
        do {
            console.clear();
            var nomeVez = undefined;
            if ((_a = this._batalha_atual) === null || _a === void 0 ? void 0 : _a.isIniciada()) {
                try {
                    nomeVez = this._batalha_atual.personagemDaVez().nome;
                }
                catch (e) {
                    nomeVez = undefined;
                }
            }
            _menu_1.InterfaceUsuario.MenuBatalha(nomeVez);
            opcao = Number(prompt("ESCOLHA UMA OPÇÃO: "));
            switch (opcao) {
                case 1:
                    if (!this._batalha_atual)
                        break;
                    if (!this._batalha_atual.isIniciada()) {
                        if (this._batalha_atual.listarPersonagens().length < 2) {
                            console.log("ADICIONE PELO MENOS 2 PERSONAGENS ANTES DE COMEÇAR.");
                            break;
                        }
                        this._batalha_atual.iniciar();
                    }
                    this.opcaoAtacar();
                    console.log("\nSITUAÇÃO APÓS O TURNO: ");
                    for (var _i = 0, _g = this._batalha_atual.listarPersonagens(); _i < _g.length; _i++) {
                        var personagem = _g[_i];
                        console.log("".concat(personagem.nome_pad, " : ").concat(personagem.vida, "/").concat(personagem.vida_maxima, " HP"));
                    }
                    try {
                        var vencedor = this._batalha_atual.verificarVencedor();
                        if (vencedor) {
                            console.log("\nPARABÉNS!");
                            console.log("GANHADOR: ".concat(vencedor.nome_pad));
                            console.log("VIDA: ".concat(vencedor.vida, "/").concat(vencedor.vida_maxima));
                            this._batalha_atual = null;
                            opcao = 0;
                        }
                    }
                    catch (err) {
                        if (err instanceof exceptions_1.NoManStanding) {
                            console.log(err.message);
                            this._batalha_atual = null;
                            opcao = 0;
                        }
                        if (err instanceof exceptions_1.GuardianCantAttack) {
                            (_b = this._batalha_atual) === null || _b === void 0 ? void 0 : _b.avancarVez();
                        }
                        else {
                            this.tratarErro(err);
                            (_c = this._batalha_atual) === null || _c === void 0 ? void 0 : _c.avancarVez();
                        }
                    }
                    break;
                case 2:
                    console.clear();
                    for (var _h = 0, _j = (_d = this._batalha_atual) === null || _d === void 0 ? void 0 : _d.listarPersonagens(); _h < _j.length; _h++) {
                        var personagem = _j[_h];
                        console.log("NOME :".concat(personagem.nome_pad, "\nVIDA: ").concat(personagem.vida, "/").concat(personagem.vida_maxima, "\nATAQUE: ").concat(personagem.ataque, "\nTIPO: ").concat(personagem.tipoPersonagem));
                        if (personagem instanceof _personagem_1.Guerreiro) {
                            console.log("DEFESA: ".concat(personagem.defesa));
                        }
                        else if (personagem instanceof _personagem_1.Arqueiro) {
                            console.log("ATAQUE MULTIPLO: ".concat(personagem.ataque_multiplo));
                        }
                        else if (personagem instanceof _personagem_1.Patrulheiro) {
                            console.log("VIDA DO COMPANHEIRO ANIMAL: ".concat(personagem.vida_companheiro_atual, "/").concat(personagem.vida_companheiro_max));
                        }
                    }
                    if (!((_e = this._batalha_atual) === null || _e === void 0 ? void 0 : _e.isIniciada())) {
                        var resp = prompt("\nDESEJA ADICIONAR PERSONAGEM? (s/n): ");
                        console.clear();
                        if (resp.toLowerCase() === "s")
                            this.menuAdicionarPersonagem();
                    }
                    else {
                        console.log("\nBATALHA JÁ INICIADA, NÃO É PERMITIDO ADICIONAR PERSONAGENS.");
                    }
                    break;
                case 3:
                    try {
                        console.clear();
                        if (this._batalha_atual) {
                            var v = this._batalha_atual.verificarVencedor();
                            if (v)
                                console.log("VENCEDOR:", v.nome_pad);
                        }
                        break;
                    }
                    catch (error) {
                        if (error instanceof exceptions_1.NoManStanding) {
                            console.log(error.message);
                        }
                        break;
                    }
                case 4:
                    console.clear();
                    if ((_f = this._batalha_atual) === null || _f === void 0 ? void 0 : _f.isIniciada()) {
                        this.consultarLinhaDoTempo();
                    }
                    break;
                case 0:
                    console.log("Saindo da batalha.");
                    break;
                default:
                    console.log("OPÇÃO INVÁLIDA!");
            }
            prompt("INSIRA <ENTER> PARA CONTINUAR...");
        } while (opcao !== 0);
    };
    App.prototype.menuAdicionarPersonagem = function () {
        if (!this._batalha_atual)
            return;
        _menu_1.InterfaceUsuario.MenuAdicionarPersonagem();
        var opcao = Number(prompt("ESCOLHA: "));
        console.clear();
        switch (opcao) {
            case 1:
                this.criarPersonagem();
                break;
            case 2:
                try {
                    var nomeArquivo = prompt("NOME DO ARQUIVO: ").toUpperCase();
                    var personagem = this.carregarPersonagem(nomeArquivo);
                    this._batalha_atual.adicionarPersonagem(personagem);
                    console.log("PERSONAGEM CARREGADO COM VIDA CHEIA!");
                }
                catch (e) {
                    if (e instanceof exceptions_1.CharacterNotFound) {
                        console.log("PERSONAGEM NÃO ENCONTRADO!.");
                    }
                    else if (e instanceof exceptions_1.CharacterNameIsEqual) {
                        console.log("JÁ EXISTE UM PERSONAGEM COM ESSE NOME NA BATALHA!.");
                    }
                    else {
                        this.tratarErro(e);
                    }
                }
                break;
        }
    };
    App.prototype.criarPersonagem = function () {
        if (!this._batalha_atual)
            return;
        _menu_1.InterfaceUsuario.MenuCriarPersonagem();
        var tipo = Number(prompt("Tipo: "));
        if (tipo === 0)
            return;
        var nome = String(prompt("Nome (1 a 9 chars): ")).toUpperCase();
        var vida = Number(prompt("Vida (1 a 100): "));
        var ataque = Number(prompt("Ataque: "));
        if (tipo === 5) {
            console.log("VIDA DO CIDADÃO IGNORADA!");
        }
        if (tipo === 5) {
            console.log("ATAQUE DO CIDADÃO IGNORADO!");
        }
        try {
            var personagem = void 0;
            if (tipo === 1) {
                var defesa = Number(prompt("Defesa: "));
                personagem = new _personagem_1.Guerreiro(this.gerarID(), nome, vida, ataque, defesa);
            }
            else if (tipo === 2) {
                personagem = new _personagem_1.Mago(this.gerarID(), nome, vida, ataque);
            }
            else if (tipo === 3) {
                var mult = Number(prompt("Multiplicador: "));
                personagem = new _personagem_1.Arqueiro(this.gerarID(), nome, vida, ataque, mult);
            }
            else if (tipo === 4) {
                personagem = new _personagem_1.Patrulheiro(this.gerarID(), nome, vida, ataque);
            }
            else if (tipo === 5) {
                personagem = new _personagem_1.Cidadao(this.gerarID(), nome, 1, 0);
            }
            else if (tipo === 6) {
                personagem = new _personagem_1.Guardiao(this.gerarID(), nome, ataque, vida);
            }
            else if (tipo === 7) {
                personagem = new _personagem_1.Exausto(this.gerarID(), nome, vida, ataque);
            }
            else {
                console.log("TIPO INVÁLIDO!");
                return;
            }
            this._batalha_atual.adicionarPersonagem(personagem);
            console.log("PERSONAGEM ADICIONADO!");
            var salvar_personagem = prompt("DESEJA SALVAR PERSONAGEM? (s/n) : ");
            if (salvar_personagem.toLowerCase() === "s")
                this.salvarPersonagem(personagem);
        }
        catch (error) {
            this.tratarErro(error);
        }
    };
    App.prototype.opcaoAtacar = function () {
        var _a, _b, _c;
        if (!this._batalha_atual)
            return;
        try {
            var atacante = this._batalha_atual.personagemDaVez();
            var inimigos = this._batalha_atual.listarInimigosVivosDo(atacante);
            if (inimigos.length === 0) {
                console.log("Nenhum inimigo disponível.");
                return;
            }
            console.log("Escolha o alvo:");
            for (var i = 0; i < inimigos.length; i++) {
                console.log("".concat(i + 1, " - ").concat((_a = inimigos[i]) === null || _a === void 0 ? void 0 : _a.nome_pad, " (ID: ").concat((_b = inimigos[i]) === null || _b === void 0 ? void 0 : _b.id, ")"));
            }
            var escolha = Number(prompt("Digite a opção: "));
            if (Number.isNaN(escolha) ||
                escolha < 1 ||
                escolha > inimigos.length) {
                console.log("Opção inválida.");
                return;
            }
            var defensorId = (_c = inimigos[escolha - 1]) === null || _c === void 0 ? void 0 : _c.id;
            var acoes = this._batalha_atual.executarAtaque(atacante.id, defensorId);
            for (var _i = 0, acoes_1 = acoes; _i < acoes_1.length; _i++) {
                var acao = acoes_1[_i];
                console.log(acao.descricao);
            }
        }
        catch (error) {
            this.tratarErro(error);
        }
    };
    App.prototype.menuConsultas = function () {
        var _a;
        var opcao = -1;
        do {
            _menu_1.InterfaceUsuario.MenuConsultas();
            opcao = Number(prompt("ESCOLHA: "));
            console.clear();
            switch (opcao) {
                case 1:
                    console.clear();
                    this.printarBatalhas();
                    prompt("PRESSIONE <ENTER> PARA CONTINUAR");
                    console.clear();
                    break;
                case 2:
                    if (!this._batalha_atual) {
                        console.log("NENHUMA BATALHA ATIVA.");
                        if (this._batalhas.length > 0) {
                            this.printarBatalhas();
                            var opcao_batalha = Number(prompt("ESCOLHA A BATALHA: "));
                            console.clear();
                            if (opcao_batalha >= 1 &&
                                opcao_batalha <= this._batalhas.length) {
                                var batalha_escolhida = this._batalhas[opcao_batalha - 1];
                                for (var _i = 0, _b = batalha_escolhida === null || batalha_escolhida === void 0 ? void 0 : batalha_escolhida.listarPersonagens(); _i < _b.length; _i++) {
                                    var personagem = _b[_i];
                                    console.log("NOME :".concat(personagem.nome_pad, "\nVIDA: ").concat(personagem.vida, "/").concat(personagem.vida_maxima, "\nATAQUE: ").concat(personagem.ataque));
                                    if (personagem instanceof _personagem_1.Guerreiro) {
                                        console.log("DEFESA: ".concat(personagem.defesa));
                                    }
                                    else if (personagem instanceof _personagem_1.Arqueiro) {
                                        console.log("ATAQUE MULTIPLO: ".concat(personagem.ataque_multiplo));
                                    }
                                    else if (personagem instanceof _personagem_1.Patrulheiro) {
                                        console.log("VIDA DO COMPANHEIRO ANIMAL: ".concat(personagem.vida_companheiro_atual, "/").concat(personagem.vida_companheiro_max));
                                    }
                                }
                            }
                        }
                    }
                    else {
                        for (var _c = 0, _d = (_a = this._batalha_atual) === null || _a === void 0 ? void 0 : _a.listarPersonagens(); _c < _d.length; _c++) {
                            var personagem = _d[_c];
                            console.log("NOME :".concat(personagem.nome_pad, "\nVIDA: ").concat(personagem.vida, "/").concat(personagem.vida_maxima, "\nATAQUE: ").concat(personagem.ataque));
                            if (personagem instanceof _personagem_1.Guerreiro) {
                                console.log("DEFESA: ".concat(personagem.defesa));
                            }
                            else if (personagem instanceof _personagem_1.Arqueiro) {
                                console.log("ATAQUE MULTIPLO: ".concat(personagem.ataque_multiplo));
                            }
                            else if (personagem instanceof _personagem_1.Patrulheiro) {
                                console.log("VIDA DO COMPANHEIRO ANIMAL: ".concat(personagem.vida_companheiro_atual, "/").concat(personagem.vida_companheiro_max));
                            }
                        }
                    }
                    prompt("PRESSIONE <ENTER> PARA CONTINUAR");
                    console.clear();
                    break;
                case 3:
                    console.clear();
                    this.consultarAcoesDePersonagem();
                    prompt("PRESSIONE <ENTER> PARA CONTINUAR");
                    break;
                case 0:
                    console.clear();
                    break;
                default:
                    console.log("OPÇÃO INVÁLIDA!");
            }
        } while (opcao !== 0);
    };
    App.prototype.printarBatalhas = function () {
        var _a, _b;
        for (var i = 0; i < this._batalhas.length; i++) {
            console.log("\nBATALHA ".concat(i + 1, ":"));
            console.log("NUMERO DE JOGADORES: ".concat((_a = this._batalhas[i]) === null || _a === void 0 ? void 0 : _a.listarPersonagens().length));
            console.log("NUMERO DE A\u00C7\u00D5ES: ".concat((_b = this._batalhas[i]) === null || _b === void 0 ? void 0 : _b.listarAcoes().length));
        }
    };
    App.prototype.consultarLinhaDoTempo = function () {
        var _a, _b, _c;
        for (var i = 0; i < ((_a = this._batalha_atual) === null || _a === void 0 ? void 0 : _a.listarAcoes().length); i++) {
            console.log("A\u00E7\u00E3o ".concat(i + 1, ": ").concat((_c = (_b = this._batalha_atual) === null || _b === void 0 ? void 0 : _b.listarAcoes()[i]) === null || _c === void 0 ? void 0 : _c.descricao));
        }
    };
    App.prototype.consultarAcoesDePersonagem = function () {
        if (!this._batalha_atual)
            return;
        try {
            var nome = prompt("Nome do personagem: ").toUpperCase();
            var personagem = this._batalha_atual.consultarPersonagem(nome);
            for (var _i = 0, _a = personagem.acoes; _i < _a.length; _i++) {
                var acao = _a[_i];
                console.log(acao.descricao);
            }
        }
        catch (e) {
            this.tratarErro(e);
        }
    };
    App.prototype.tratarErro = function (error) {
        if (error instanceof exceptions_1.AplicacaoException) {
            console.log("ERRO:", error.message);
        }
        else {
            console.log("ERRO DESCONHECIDO:", error);
        }
    };
    App.prototype.gerarID = function () {
        return Math.floor(Math.random() * 1000000) + 1;
    };
    App.prototype.salvarPersonagem = function (personagem) {
        var caminho = "./personagens/".concat(personagem.nome, ".json");
        if (fs.existsSync(caminho)) {
            console.log("O PERSONAGEM ".concat(personagem.nome, " J\u00C1 EXISTE. SOBRESCREVENDO..."));
        }
        if (!fs.existsSync("./personagens")) {
            fs.mkdirSync("./personagens");
        }
        var json = JSON.stringify(personagem.toJSON(), null, 2);
        fs.writeFileSync(caminho, json);
        console.log("PERSONAGEM SALVO COM SUCESSO!");
    };
    App.prototype.carregarPersonagem = function (nomeArquivo) {
        if (!this._batalha_atual) {
            throw new exceptions_1.AplicacaoException("NENHUMA BATALHA ATIVA");
        }
        var nome = nomeArquivo.toUpperCase();
        var caminho = "./personagens/".concat(nome, ".json");
        if (!fs.existsSync(caminho)) {
            throw new exceptions_1.CharacterNotFound("PERSONAGEM NÃO ENCONTRADO NO ARQUIVO");
        }
        if (this._batalha_atual.existePersonagemComNome(nome)) {
            throw new exceptions_1.CharacterNameIsEqual("JÁ EXISTE UM PERSONAGEM COM ESSE NOME NA BATALHA");
        }
        var conteudo = fs.readFileSync(caminho, "utf-8");
        var data = JSON.parse(conteudo);
        switch (data.tipo) {
            case "Guerreiro":
                return new _personagem_1.Guerreiro(this.gerarID(), data.nome, data.vida, data.ataque, data.extras.defesa);
            case "Mago":
                return new _personagem_1.Mago(this.gerarID(), data.nome, data.vida, data.ataque);
            case "Arqueiro":
                return new _personagem_1.Arqueiro(this.gerarID(), data.nome, data.vida, data.ataque, data.extras.ataque_multiplo);
            case "Patrulheiro":
                return new _personagem_1.Patrulheiro(this.gerarID(), data.nome, data.vida, data.ataque);
            case "Cidadao":
                return new _personagem_1.Cidadao(this.gerarID(), data.nome, data.vida, data.ataque);
            case "Guardiao":
                return new _personagem_1.Guardiao(this.gerarID(), data.nome, data.vida, data.ataque);
            case "Exausto":
                return new _personagem_1.Exausto(this.gerarID(), data.nome, data.vida, data.ataque);
            default:
                throw new exceptions_1.AplicacaoException("TIPO DE PERSONAGEM INVÁLIDO!");
        }
    };
    return App;
}());
exports.App = App;
function main() {
    var app = new App();
    app.iniciarApp();
}
main();
