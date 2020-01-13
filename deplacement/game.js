$(function(){

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
        this.movePlayer();
      
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


    movePlayer() {
        let player = $(`.cell[data-player-id=${1}]`);
       
        $(player).click(function () {
            //joueur sélectionné via un bcg bleu
            $(this).css("background-color", "lightBlue");
        });

    };




};



/* Default game variables */

$(function () {
    let nbColumns = 6;
    let nbRows = 6;
    let nbGreyCell = 0;
    let nbWeapon = 0;
    let nbPlayer = 1;
    let game = new Game(nbColumns, nbRows, nbGreyCell, nbWeapon, nbPlayer);

    game.start();

});

});