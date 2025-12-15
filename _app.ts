import { Acao } from "./_acao";
import {
    Personagem,
    Guerreiro,
    Mago,
    Arqueiro,
    Patrulheiro,
    Cidadao,
    Guardiao,
    Exausto,
} from "./_personagem";
import { Batalha } from "./_batalha";
import {
    AplicacaoException,
    NoManStanding,
    CharacterNotFound,
    CharacterNameIsEqual,
    GuardianCantAttack,
} from "./exceptions";
import { InterfaceUsuario } from "./_menu";

import * as fs from "fs";

const prompt = require("prompt-sync")();

class App {
    private _batalhas: Batalha[] = [];
    private _batalha_atual: Batalha | null = null;

    iniciarApp(): void {
        let opcao: number = -1;
        do {
            console.clear();
            InterfaceUsuario.MenuInicial();
            opcao = Number(prompt("ESCOLHA UMA OPÇÃO: "));

            console.clear();
            switch (opcao) {
                case 1:
                    this.novaBatalha();
                    break;
                case 2:
                    if (this._batalha_atual != null) {
                        this.continuarBatalha();
                    } else {
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
    }

    novaBatalha(): void {
        this._batalha_atual = new Batalha();
        this._batalhas.push(this._batalha_atual);
        console.log(
            "NOVA BATALHA CRIADA. ADICIONE OS PERSONAGENS ANTES DE INICIAR.",
        );

        this.continuarBatalha();
    }

    continuarBatalha(): void {
        let opcao: number = -1;
        do {
            console.clear();
            let nomeVez: string | undefined = undefined;
            if (this._batalha_atual?.isIniciada()) {
                try {
                    nomeVez = this._batalha_atual.personagemDaVez().nome;
                } catch (e) {
                    nomeVez = undefined;
                }
            }

            InterfaceUsuario.MenuBatalha(nomeVez);
            opcao = Number(prompt("ESCOLHA UMA OPÇÃO: "));

            switch (opcao) {
                case 1:
                    if (!this._batalha_atual) break;
                    if (!this._batalha_atual.isIniciada()) {
                        if (
                            this._batalha_atual.listarPersonagens().length < 2
                        ) {
                            console.log(
                                "ADICIONE PELO MENOS 2 PERSONAGENS ANTES DE COMEÇAR.",
                            );
                            break;
                        }

                        this._batalha_atual.iniciar();
                    }
                    this.opcaoAtacar();
                    console.log("\nSITUAÇÃO APÓS O TURNO: ");
                    for (let personagem of this._batalha_atual.listarPersonagens()) {
                        console.log(
                            `${personagem.nome_pad} : ${personagem.vida}/${personagem.vida_maxima} HP`,
                        );
                    }

                    try {
                        const vencedor =
                            this._batalha_atual.verificarVencedor();
                        if (vencedor) {
                            console.log("\nPARABÉNS!");
                            console.log(`GANHADOR: ${vencedor.nome_pad}`);
                            console.log(
                                `VIDA: ${vencedor.vida}/${vencedor.vida_maxima}`,
                            );

                            this._batalha_atual = null;
                            opcao = 0;
                        }
                    } catch (err: any) {
                        if (err instanceof NoManStanding) {
                            console.log(err.message);
                            this._batalha_atual = null;
                            opcao = 0;
                        }
                        if (err instanceof GuardianCantAttack) {
                            this._batalha_atual?.avancarVez();
                        } else {
                            this.tratarErro(err);
                            this._batalha_atual?.avancarVez();
                        } //GUARDA NÃO PASSA A VEZ;
                    }
                    break;

                case 2:
                    console.clear();
                    for (let personagem of this._batalha_atual?.listarPersonagens()!) {
                        console.log(
                            `NOME :${personagem.nome_pad}\nVIDA: ${personagem.vida}/${personagem.vida_maxima}\nATAQUE: ${personagem.ataque}\nTIPO: ${personagem.tipoPersonagem}`,
                        );
                        if (personagem instanceof Guerreiro) {
                            console.log(`DEFESA: ${personagem.defesa}`);
                        } else if (personagem instanceof Arqueiro) {
                            console.log(
                                `ATAQUE MULTIPLO: ${personagem.ataque_multiplo}`,
                            );
                        } else if (personagem instanceof Patrulheiro) {
                            console.log(
                                `VIDA DO COMPANHEIRO ANIMAL: ${personagem.vida_companheiro_atual}/${personagem.vida_companheiro_max}`,
                            );
                        }
                    }

                    if (!this._batalha_atual?.isIniciada()) {
                        const resp = prompt(
                            "\nDESEJA ADICIONAR PERSONAGEM? (s/n): ",
                        );
                        console.clear();
                        if (resp.toLowerCase() === "s")
                            this.menuAdicionarPersonagem();
                    } else {
                        console.log(
                            "\nBATALHA JÁ INICIADA, NÃO É PERMITIDO ADICIONAR PERSONAGENS.",
                        );
                    }
                    break;

                case 3:
                    try {
                        console.clear();
                        if (this._batalha_atual) {
                            const v = this._batalha_atual.verificarVencedor();
                            if (v) console.log("VENCEDOR:", v.nome_pad);
                        }
                        break;
                    } catch (error: any) {
                        if (error instanceof NoManStanding) {
                            console.log(error.message);
                        }
                        break;
                    }

                case 4:
                    console.clear();
                    if (this._batalha_atual?.isIniciada()) {
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
    }

    menuAdicionarPersonagem(): void {
        if (!this._batalha_atual) return;

        InterfaceUsuario.MenuAdicionarPersonagem();

        const opcao = Number(prompt("ESCOLHA: "));
        console.clear();

        switch (opcao) {
            case 1:
                this.criarPersonagem();
                break;

            case 2:
                try {
                    const nomeArquivo =
                        prompt("NOME DO ARQUIVO: ").toUpperCase();

                    const personagem = this.carregarPersonagem(nomeArquivo);
                    this._batalha_atual.adicionarPersonagem(personagem);

                    console.log("PERSONAGEM CARREGADO COM VIDA CHEIA!");
                } catch (e: any) {
                    if (e instanceof CharacterNotFound) {
                        console.log("PERSONAGEM NÃO ENCONTRADO!.");
                    } else if (e instanceof CharacterNameIsEqual) {
                        console.log(
                            "JÁ EXISTE UM PERSONAGEM COM ESSE NOME NA BATALHA!.",
                        );
                    } else {
                        this.tratarErro(e);
                    }
                }
                break;
        }
    }

    criarPersonagem(): void {
        if (!this._batalha_atual) return;

        InterfaceUsuario.MenuCriarPersonagem();
        const tipo = Number(prompt("Tipo: "));
        if (tipo === 0) return;

        const nome = String(prompt("Nome (1 a 9 chars): ")).toUpperCase();
        const vida = Number(prompt("Vida (1 a 100): "));
        const ataque = Number(prompt("Ataque: "));
        if (tipo === 5) {
            console.log("VIDA DO CIDADÃO IGNORADA!");
        }
        if (tipo === 5) {
            console.log("ATAQUE DO CIDADÃO IGNORADO!");
        }

        try {
            let personagem: Personagem;
            if (tipo === 1) {
                const defesa = Number(prompt("Defesa: "));
                personagem = new Guerreiro(
                    this.gerarID(),
                    nome,
                    vida,
                    ataque,
                    defesa,
                );
            } else if (tipo === 2) {
                personagem = new Mago(this.gerarID(), nome, vida, ataque);
            } else if (tipo === 3) {
                const mult = Number(prompt("Multiplicador: "));
                personagem = new Arqueiro(
                    this.gerarID(),
                    nome,
                    vida,
                    ataque,
                    mult,
                );
            } else if (tipo === 4) {
                personagem = new Patrulheiro(
                    this.gerarID(),
                    nome,
                    vida,
                    ataque,
                );
            } else if (tipo === 5) {
                personagem = new Cidadao(this.gerarID(), nome, 1, 0);
            } else if (tipo === 6) {
                personagem = new Guardiao(this.gerarID(), nome, ataque, vida);
            } else if (tipo === 7) {
                personagem = new Exausto(this.gerarID(), nome, vida, ataque);
            } else {
                console.log("TIPO INVÁLIDO!");
                return;
            }

            this._batalha_atual.adicionarPersonagem(personagem);
            console.log("PERSONAGEM ADICIONADO!");
            let salvar_personagem = prompt(
                "DESEJA SALVAR PERSONAGEM? (s/n) : ",
            );
            if (salvar_personagem.toLowerCase() === "s")
                this.salvarPersonagem(personagem);
        } catch (error: any) {
            this.tratarErro(error);
        }
    }

    opcaoAtacar(): void {
        if (!this._batalha_atual) return;

        try {
            const atacante: Personagem = this._batalha_atual.personagemDaVez();
            const inimigos =
                this._batalha_atual.listarInimigosVivosDo(atacante);

            if (inimigos.length === 0) {
                console.log("Nenhum inimigo disponível.");
                return;
            }

            console.log("Escolha o alvo:");
            for (let i = 0; i < inimigos.length; i++) {
                console.log(
                    `${i + 1} - ${inimigos[i]?.nome_pad} (ID: ${inimigos[i]?.id})`,
                );
            }

            let escolha = Number(prompt("Digite a opção: "));
            if (
                Number.isNaN(escolha) ||
                escolha < 1 ||
                escolha > inimigos.length
            ) {
                console.log("Opção inválida.");
                return;
            }

            const defensorId: number = inimigos[escolha - 1]?.id!;
            const acoes: Acao[] = this._batalha_atual.executarAtaque(
                atacante.id,
                defensorId,
            );

            for (let acao of acoes) {
                console.log(acao.descricao);
            }
        } catch (error: any) {
            this.tratarErro(error);
        }
    }

    menuConsultas(): void {
        let opcao: number = -1;
        do {
            InterfaceUsuario.MenuConsultas();
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
                            let opcao_batalha = Number(
                                prompt("ESCOLHA A BATALHA: "),
                            );
                            console.clear();
                            if (
                                opcao_batalha >= 1 &&
                                opcao_batalha <= this._batalhas.length
                            ) {
                                let batalha_escolhida =
                                    this._batalhas[opcao_batalha - 1]!;
                                for (let personagem of batalha_escolhida?.listarPersonagens()!) {
                                    console.log(
                                        `NOME :${personagem.nome_pad}\nVIDA: ${personagem.vida}/${personagem.vida_maxima}\nATAQUE: ${personagem.ataque}`,
                                    );
                                    if (personagem instanceof Guerreiro) {
                                        console.log(
                                            `DEFESA: ${personagem.defesa}`,
                                        );
                                    } else if (personagem instanceof Arqueiro) {
                                        console.log(
                                            `ATAQUE MULTIPLO: ${personagem.ataque_multiplo}`,
                                        );
                                    } else if (
                                        personagem instanceof Patrulheiro
                                    ) {
                                        console.log(
                                            `VIDA DO COMPANHEIRO ANIMAL: ${personagem.vida_companheiro_atual}/${personagem.vida_companheiro_max}`,
                                        );
                                    }
                                }
                            }
                        }
                    } else {
                        for (let personagem of this._batalha_atual?.listarPersonagens()!) {
                            console.log(
                                `NOME :${personagem.nome_pad}\nVIDA: ${personagem.vida}/${personagem.vida_maxima}\nATAQUE: ${personagem.ataque}`,
                            );
                            if (personagem instanceof Guerreiro) {
                                console.log(`DEFESA: ${personagem.defesa}`);
                            } else if (personagem instanceof Arqueiro) {
                                console.log(
                                    `ATAQUE MULTIPLO: ${personagem.ataque_multiplo}`,
                                );
                            } else if (personagem instanceof Patrulheiro) {
                                console.log(
                                    `VIDA DO COMPANHEIRO ANIMAL: ${personagem.vida_companheiro_atual}/${personagem.vida_companheiro_max}`,
                                );
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
    }

    printarBatalhas(): void {
        for (let i: number = 0; i < this._batalhas.length; i++) {
            console.log(`\nBATALHA ${i + 1}:`);
            console.log(
                `NUMERO DE JOGADORES: ${this._batalhas[i]?.listarPersonagens().length}`,
            );
            console.log(
                `NUMERO DE AÇÕES: ${this._batalhas[i]?.listarAcoes().length}`,
            );
        }
    }

    consultarLinhaDoTempo(): void {
        for (
            let i: number = 0;
            i < this._batalha_atual?.listarAcoes().length!;
            i++
        ) {
            console.log(
                `Ação ${i + 1}: ${this._batalha_atual?.listarAcoes()[i]?.descricao}`,
            );
        }
    }

    consultarAcoesDePersonagem(): void {
        if (!this._batalha_atual) return;
        try {
            const nome: string = prompt("Nome do personagem: ").toUpperCase();
            const personagem: Personagem =
                this._batalha_atual.consultarPersonagem(nome);
            for (let acao of personagem.acoes) console.log(acao.descricao);
        } catch (e: any) {
            this.tratarErro(e);
        }
    }

    tratarErro(error: any): void {
        if (error instanceof AplicacaoException) {
            console.log("ERRO:", error.message);
        } else {
            console.log("ERRO DESCONHECIDO:", error);
        }
    }

    gerarID(): number {
        return Math.floor(Math.random() * 1000000) + 1;
    }

    salvarPersonagem(personagem: Personagem): void {
        const caminho = `./personagens/${personagem.nome}.json`;

        if (fs.existsSync(caminho)) {
            console.log(
                `O PERSONAGEM ${personagem.nome} JÁ EXISTE. SOBRESCREVENDO...`,
            );
        }

        if (!fs.existsSync("./personagens")) {
            fs.mkdirSync("./personagens");
        }

        const json = JSON.stringify(personagem.toJSON(), null, 2);
        fs.writeFileSync(caminho, json);
        console.log("PERSONAGEM SALVO COM SUCESSO!");
    }

    carregarPersonagem(nomeArquivo: string): Personagem {
        if (!this._batalha_atual) {
            throw new AplicacaoException("NENHUMA BATALHA ATIVA");
        }

        const nome = nomeArquivo.toUpperCase();
        const caminho = `./personagens/${nome}.json`;

        if (!fs.existsSync(caminho)) {
            throw new CharacterNotFound("PERSONAGEM NÃO ENCONTRADO NO ARQUIVO");
        }

        if (this._batalha_atual.existePersonagemComNome(nome)) {
            throw new CharacterNameIsEqual(
                "JÁ EXISTE UM PERSONAGEM COM ESSE NOME NA BATALHA",
            );
        }

        const conteudo = fs.readFileSync(caminho, "utf-8");
        const data = JSON.parse(conteudo);

        switch (data.tipo) {
            case "Guerreiro":
                return new Guerreiro(
                    this.gerarID(),
                    data.nome,
                    data.vida,
                    data.ataque,
                    data.extras.defesa,
                );

            case "Mago":
                return new Mago(
                    this.gerarID(),
                    data.nome,
                    data.vida,
                    data.ataque,
                );

            case "Arqueiro":
                return new Arqueiro(
                    this.gerarID(),
                    data.nome,
                    data.vida,
                    data.ataque,
                    data.extras.ataque_multiplo,
                );

            case "Patrulheiro":
                return new Patrulheiro(
                    this.gerarID(),
                    data.nome,
                    data.vida,
                    data.ataque,
                );

            case "Cidadao":
                return new Cidadao(
                    this.gerarID(),
                    data.nome,
                    data.vida,
                    data.ataque,
                );

            case "Guardiao":
                return new Guardiao(
                    this.gerarID(),
                    data.nome,
                    data.vida,
                    data.ataque,
                );

            case "Exausto":
                return new Exausto(
                    this.gerarID(),
                    data.nome,
                    data.vida,
                    data.ataque,
                );
            default:
                throw new AplicacaoException("TIPO DE PERSONAGEM INVÁLIDO!");
        }
    }
}

function main(): void {
    let app: App = new App();
    app.iniciarApp();
}

main();

export { App };
