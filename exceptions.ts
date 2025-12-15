class AplicacaoException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AplicacaoException";
        Object.setPrototypeOf(this, AplicacaoException.prototype);
    }
}

class CharacterNotFound extends AplicacaoException {
    constructor(message: string) {
        super(message);
        this.name = "CharacterNotFound";
        Object.setPrototypeOf(this, CharacterNotFound.prototype);
    }
}

class CharacterNameIsEqual extends AplicacaoException {
    constructor(message: string) {
        super(message);
        this.name = "CharacterNameIsEqual";
        Object.setPrototypeOf(this, CharacterNameIsEqual.prototype);
    }
}

class ValueIsNotValid extends AplicacaoException {
    constructor(message: string) {
        super(message);
        this.name = "ValueIsNotValid";
        Object.setPrototypeOf(this, ValueIsNotValid.prototype);
    }
}

class UnsuccessfulAttack extends AplicacaoException {
    constructor(message: string) {
        super(message);
        this.name = "UnsuccessfulAttack";
        Object.setPrototypeOf(this, UnsuccessfulAttack.prototype);
    }
}

class DeadCantAttack extends UnsuccessfulAttack {
    constructor(message: string) {
        super(message);
        this.name = "DeadCantAttack";
        Object.setPrototypeOf(this, DeadCantAttack.prototype);
    }
}

class DeadCantBeAttacked extends UnsuccessfulAttack {
    constructor(message: string) {
        super(message);
        this.name = "DeadCantBeAttacked";
        Object.setPrototypeOf(this, DeadCantBeAttacked.prototype);
    }
}

class CantAttackItself extends UnsuccessfulAttack {
    constructor(message: string) {
        super(message);
        this.name = "CantAttackItself";
        Object.setPrototypeOf(this, CantAttackItself.prototype);
    }
}

class NoManStanding extends AplicacaoException {
    constructor(message: string) {
        super(message);
        this.name = "NoManStanding";
        Object.setPrototypeOf(this, NoManStanding.prototype);
    }
}

class GuardianCantAttack extends UnsuccessfulAttack {
    constructor(message: string) {
        super(message);
        this.name = "GuardianCantAttack";
        Object.setPrototypeOf(this, GuardianCantAttack.prototype);
    }
}

export {
    UnsuccessfulAttack,
    CharacterNotFound,
    AplicacaoException,
    CharacterNameIsEqual,
    CantAttackItself,
    DeadCantAttack,
    DeadCantBeAttacked,
    ValueIsNotValid,
    NoManStanding,
    GuardianCantAttack,
};
