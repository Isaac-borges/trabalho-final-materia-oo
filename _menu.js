"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceUsuario = void 0;
var InterfaceUsuario = /** @class */ (function () {
    function InterfaceUsuario() {
    }
    InterfaceUsuario.MenuInicial = function () {
        console.log("-------------------------------------");
        console.log("1 - NOVA BATALHA");
        console.log("2 - CONTINUAR BATALHA");
        console.log("3 - CONSULTAS");
        console.log("0 - SAIR");
        console.log("-------------------------------------");
    };
    InterfaceUsuario.MenuBatalha = function (nomeVez) {
        console.log("-------------------------------------");
        if (nomeVez)
            console.log("VEZ DE: ".concat(nomeVez));
        console.log("1 - ATACAR (obrigatório)");
        console.log("2 - LISTAR PERSONAGENS");
        console.log("3 - VER VENCEDOR");
        console.log("4 - LISTAR HISTÓRICO DE AÇÕES");
        console.log("0 - SAIR DA BATALHA");
        console.log("-------------------------------------");
    };
    InterfaceUsuario.MenuConsultas = function () {
        console.log("-------------------------------------");
        console.log("1 - LISTAR TODAS AS BATALHAS");
        console.log("2 - LISTAR PERSONAGENS DA BATALHA ATUAL");
        console.log("3 - MOSTRAR HISTÓRICO DE UM PERSONAGEM");
        console.log("0 - VOLTAR");
        console.log("-------------------------------------");
    };
    InterfaceUsuario.MenuCriarPersonagem = function () {
        console.log("-------------------------------------");
        console.log("TIPO DE PERSONAGEM");
        console.log("1 - GUERREIRO");
        console.log("2 - MAGO");
        console.log("3 - ARQUEIRO");
        console.log("4 - PATRULHEIRO");
        console.log("0 - CANCELAR");
        console.log("-------------------------------------");
    };
    InterfaceUsuario.MenuAdicionarPersonagem = function () {
        console.log("-------------------------------------");
        console.log("1 - CRIAR NOVO PERSONAGEM");
        console.log("2 - CARREGAR PERSONAGEM SALVO");
        console.log("0 - VOLTAR");
        console.log("-------------------------------------");
    };
    return InterfaceUsuario;
}());
exports.InterfaceUsuario = InterfaceUsuario;
