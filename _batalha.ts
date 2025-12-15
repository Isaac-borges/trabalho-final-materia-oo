import { Acao } from "./_acao";
import { Personagem } from "./_personagem";
import {
    CharacterNotFound,
    CharacterNameIsEqual,
    NoManStanding,
    AplicacaoException,
} from "./exceptions";

class Batalha {
    private _personagens: Personagem[] = [];
    private _acoes: Acao[] = [];
    private _iniciada: boolean = false;
    private _indexVez: number = 0;

    adicionarPersonagem(novo_personagem: Personagem): void {
        if (this._iniciada) {
            throw new Error(
                "\nNÃO É POSSIVEL ADICIONAR PERSONAGENS DEPOIS DO INÍCIO DA BATALHA.",
            );
        }

        for (let personagem of this._personagens) {
            if (personagem.nome === novo_personagem.nome) {
                throw new CharacterNameIsEqual(
                    "PERSONAGEM TEM NOME IGUAL À OUTRO",
                );
            }
        }

        this._personagens.push(novo_personagem);
        novo_personagem.id_acao = this._personagens.length * 1000;
    }

    consultarPersonagem(nome: string): Personagem {
        for (let personagem of this._personagens) {
            if (personagem.nome === nome.toUpperCase()) return personagem;
        }
        throw new CharacterNotFound("PERSONAGEM NÃO ENCONTRADO!");
    }

    consultarPersonagemPorID(id: number): Personagem {
        for (let personagem of this._personagens) {
            if (personagem.id === id) return personagem;
        }
        throw new CharacterNotFound("PERSONAGEM NÃO ENCONTRADO!");
    }

    existePersonagemComNome(nome: string): boolean {
        return this._personagens.some((p) => p.nome === nome.toUpperCase());
    }

    listarPersonagens(): Personagem[] {
        return this._personagens;
    }

    listarAcoes(): Acao[] {
        return this._acoes;
    }

    iniciar(): void {
        this._iniciada = true;
        this._indexVez = this.encontrarProximoVivoIndex(-1);
    }

    personagemDaVez(): Personagem {
        const index = this._indexVez;
        if (this._personagens.length === 0)
            throw new NoManStanding("NENHUM PERSONAGEM NA BATALHA!");

        const personagem: Personagem = this._personagens[index]!;

        if (!personagem || !personagem.estaVivo()) {
            const prox: number = this.encontrarProximoVivoIndex(index);
            if (prox === -1) throw new NoManStanding("NENHUM PERSONAGEM VIVO!");

            this._indexVez = prox;
            return this._personagens[this._indexVez]!;
        }

        return personagem;
    }

    listarInimigosVivosDo(
        atacante: Personagem,
    ): { id: number; nome_pad: string }[] {
        return this._personagens
            .filter((p) => p.estaVivo() && p.id !== atacante.id)
            .map((p) => ({ id: p.id, nome_pad: p.nome_pad }));
    }

    executarAtaque(atacanteId: number, defensorId?: number): Acao[] {
        if (!this._iniciada) this.iniciar();

        const atacante: Personagem = this.consultarPersonagemPorID(atacanteId);
        const defensor: Personagem = this.consultarPersonagemPorID(defensorId!);

        const personagem_da_vez: Personagem = this.personagemDaVez();
        if (atacante.id !== personagem_da_vez.id) {
            throw new AplicacaoException("NÃO É A VEZ DESSE PERSONAGEM!");
        }

        const tamanho_historico_antes: number = atacante.historicoLength();

        const acaoPrincipal: Acao = atacante.atacar(defensor);

        const novas: Acao[] = atacante.getAcoesDesde(tamanho_historico_antes);

        for (let acao of novas) {
            this._acoes.push(acao);
        }

        this.avancarVez();

        const vivos: Personagem[] = this._personagens.filter((p) =>
            p.estaVivo(),
        );
        if (vivos.length === 1) {
            return novas;
        } else if (vivos.length === 0) {
            throw new NoManStanding("NENHUM JOGADOR VIVO!");
        }

        return novas;
    }

    encontrarProximoVivoIndex(index_inicial: number): number {
        const n: number = this._personagens.length;
        if (n === 0) return -1;
        for (let i = 1; i <= n; i++) {
            const index = (index_inicial + i + n) % n;
            const personagem: Personagem = this._personagens[index]!;
            if (personagem && personagem.estaVivo()) return index;
        }
        return -1;
    }

    avancarVez(): void {
        const prox = this.encontrarProximoVivoIndex(this._indexVez);
        if (prox === -1) {
            this._indexVez = 0;
        } else {
            this._indexVez = prox;
        }
    }

    isIniciada(): boolean {
        return this._iniciada;
    }

    verificarVencedor(): Personagem | null {
        const vivos: Personagem[] = this._personagens.filter((p) =>
            p.estaVivo(),
        );
        if (vivos.length === 1) return vivos[0]!;
        if (vivos.length === 0) throw new NoManStanding("NENHUM JOGADOR VIVO!");
        return null;
    }
}

export { Batalha };
