class Player {
    constructor(id, name, x, y) {
        this.id = id;
        this.name = name;
        this.health = 100;
        this.weapon = Weapons.filter(weapon => weapon.name === 'Knife').shift()
        this.previousWeapon = null;
        this.damages = 0;
        this.image = `./assets/img/player${this.id}.jpg`;
        this.x = x;
        this.y = y;
        this.shield = 0;
    }

    attack(currentPlayer, otherPlayer) {
        let attackResult = currentPlayer * (1 - otherPlayer);
        return attackResult;
    }

}