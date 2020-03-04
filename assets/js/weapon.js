class Weapon {
    constructor(id, name, url, damages) {
        this.id = id;
        this.name = name;
        this.damages = damages;
        this.url = url;
    }
}

const Weapons = [
    new Weapon(0, 'Knife', './assets/img/weapon0.png', 20),
    new Weapon(1, 'Pistol', './assets/img/weapon1.png', 25),
    new Weapon(2, 'Grenade', './assets/img/weapon2.png', 30),
    new Weapon(3, 'Fusil', './assets/img/weapon3.png', 35),
    new Weapon(4, 'Bombe', './assets/img/weapon4.png', 40),
]