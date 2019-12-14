class Game {
    constructor(col, row, nbGreyCell, nbWeapon, nbPlayer) {
        this.nbPlayer = nbPlayer;
        this.board = new Board(col, row, nbGreyCell, nbWeapon, nbPlayer);
        this.players = [];
    };

    start() {
        this.board.generateBoard();
        this.board.generateGreyCells();
        this.board.generateWeapons();
        this.board.generatePlayerPosition();
        this.initPlayers();
        this.resetGame();
    };

    initPlayers() {
        for(let i=0; i<this.nbPlayer; i++) {
            // this.players.push(new Player(100, new Weapon()));
        };
    };

    getPlayer(indexPlayer) {
        return this.players[indexPlayer];
    };

    getPlayerCell(indexPlayer) {
        return $(`.cell[data-player-id=${indexPlayer}]`);
    };

    resetGame() {
        $('#reset').on('click', function() {
            window.location.reload()
        });
    };

    // attackPhase() {
    //     this.getPlayer(0).attack(this.getPlayer(1));
    // }

    // defendPhase() {
    //     this.getPlayer(0).defend(this.getPlayer(1));
    // }
};

$(function () {
    /* Default game variables */
    let nbColumns = 8;
    let nbRows = 8;
    let nbGreyCell = 8;
    let nbWeapon = 4;
    let nbPlayer = 2;
    let game = new Game(nbColumns, nbRows, nbGreyCell, nbWeapon, nbPlayer);

    game.start();
});

