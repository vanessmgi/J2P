class Weapon {
    constructor(id, name, url, damages) {
        this.id = id;
        this.name = name;
        this.damages = damages;
        this.url = `./assets/img/${url}.png`;
    }
}

// Création des instances des 5 armes (dont l'arme par défaut du joueur)
const Weapons = [
    new Weapon(0, 'Knife', 'weapon0', 20),
    new Weapon(1, 'Pistol', 'weapon1', 25),
    new Weapon(2, 'Grenade', 'weapon2', 30),
    new Weapon(3, 'Fusil', 'weapon3', 35),
    new Weapon(4, 'Bombe', 'weapon4', 40),
]