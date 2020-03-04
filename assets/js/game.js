class Game {
    // Classe "chef d'orchestre"
    // Doit garder en mémoire les données des joueurs, armes, etc.
    constructor(col, row, nbGreyCell, nbWeapon, nbPlayer) {
        this.nbPlayer = nbPlayer;
        this.board = new Board(col, row, nbGreyCell, nbWeapon, nbPlayer);
        this.players = [];
        this.names = ["Ryan", "Wilson"]; // en dur -> stocker les names dynamiquement ?
    }

    // Initialise le jeu
    start() {
        this.board.generateBoard();
        this.board.generateGreyCells();
        this.board.generateWeapons();
        this.initPlayers();
        this.refreshPlayersUI();
        this.onResetGame();
        this.nextRound();
        this.rulesGame();
    }

    refreshPlayersUI() {
        for (let i = 0; i < this.players.length; i++) {
            this.refreshPlayerUI(this.players[i]);
        }
    }

    // Réactualise les class des joueurs
    refreshPlayerUI(player) {
        let card = $(".player-card[data-player-id=" + player.id + "]");
        card.find(".player-name").text(player.name);
        card.find(".player-health").css("width", player.health + "%");
        card.find(".player-image").attr("src", player.image);
        if (player.id == this.currentPlayer.id) {
            card.find('.card').addClass('active-player');
        } else {
            card.find('.card').removeClass('active-player');
        }
        let playerCell = this.board.getCell(player.x, player.y);
        playerCell.css('background-image', `url('${player.image}')`);
        card.find('.card-weapon').html(`<img src="${player.weapon.url}" />`)
        card.find('.weapon-damages').text(player.weapon.damages);
        card.find('.player-health').text(player.health);
    }

    // Initialise les joueurs
    initPlayers() {
        for (let i = 0; i < this.nbPlayer; i++) {
            let $position = this.board.generatePlayerPosition();
            let $cell = this.board.getCell($position.x, $position.y);
            $cell.addClass("player");
            $cell.attr("data-empty", false);
            this.players.push(
                new Player(i + 1, this.names[i], $position.x, $position.y)
            );
        }
        this.currentPlayer = this.players[0];
        this.getPlayerCell(this.currentPlayer.id).addClass('active');
    }

    // Initialise le tour du joueur courant
    nextRound() {
        this.handleMovement();
    }

    handleMovement() {
        this.potentialMoves();
    }

    // Vérifie les mouvements possible et impossible pour les joueurs
    potentialMoves() {
        const maxMovesX = 3;
        const maxMovesY = 3;
        for (let i = 1; i <= maxMovesX; i++) {
            let leftCell = this.board
                .getCell(this.currentPlayer.x - i, this.currentPlayer.y)
                .addClass("selectable-cell");
            if (
                leftCell.hasClass("greycell") ||
                leftCell.hasClass("player")
            ) {
                leftCell.removeClass("selectable-cell");
                break;
            }
        }
        /* vérification case grise à droite */
        for (let i = 1; i <= maxMovesX; i++) {
            let rightCell = this.board
                .getCell(this.currentPlayer.x + i, this.currentPlayer.y)
                .addClass("selectable-cell");
            if (
                rightCell.hasClass("greycell") ||
                rightCell.hasClass("player")
            ) {
                rightCell.removeClass("selectable-cell");
                break;
            }
        }
        /* vérification case grise en haut */
        for (let i = 1; i <= maxMovesY; i++) {
            let topCell = this.board
                .getCell(this.currentPlayer.x, this.currentPlayer.y - i)
                .addClass("selectable-cell");
            if (
                topCell.hasClass("greycell") ||
                topCell.hasClass("player")
            ) {
                topCell.removeClass("selectable-cell");
                break;
            }
        }
        /* vérification case grise en bas */
        for (let i = 1; i <= maxMovesY; i++) {
            let bottomCell = this.board
                .getCell(this.currentPlayer.x, this.currentPlayer.y + i)
                .addClass("selectable-cell");
            if (
                bottomCell.hasClass("greycell") ||
                bottomCell.hasClass("player")
            ) {
                bottomCell.removeClass("selectable-cell");
                break;
            }
        }
        // cible la class .selectable-cell et appel la fonction movePlayer() au clic //
        $(".selectable-cell").click(e => { this.movePlayer(e) });
    }

    // Gère le déplacement des joueurs
    movePlayer(e) {
        let $selectedCell = $(e.target);
        let $previousCell = this.getPlayerCell(this.currentPlayer.id);
        $previousCell.removeClass("player active");
        $previousCell.removeAttr("data-id");

        if (this.currentPlayer.previousWeapon != null) { // Le précédent tour, a ramassé une arme
            $previousCell.addClass('weapon');
            $previousCell.attr('data-weapon-id', this.currentPlayer.previousWeapon.id);
            $previousCell.text('');
            $previousCell.css('background-image', `url('${this.currentPlayer.previousWeapon.url}')`);
            this.currentPlayer.previousWeapon = null;
        } else {
            $previousCell.removeAttr('data-weapon-id');
            $previousCell.css('background-image', 'unset');
        }

        $selectedCell.addClass("player");
        $selectedCell.attr("data-id", this.currentPlayer.id);
        if ($selectedCell.hasClass('weapon')) { // On remplace l'arme
            let newWeapon = Weapons[$selectedCell.attr('data-weapon-id')];
            $selectedCell.css('background-image', 'unset');
            console.log('(Joueur "' + this.currentPlayer.name + '") Change d\'arme :', this.currentPlayer.weapon.name + ' -> ' + newWeapon.name);
            this.currentPlayer.previousWeapon = this.currentPlayer.weapon;
            this.currentPlayer.weapon = newWeapon;
        } else {
            $selectedCell.css('background-image', `url("${this.currentPlayer.image}")`);
        }

        this.currentPlayer.x = parseInt($selectedCell.attr('data-x'));
        this.currentPlayer.y = parseInt($selectedCell.attr('data-y'));
        $(".selectable-cell").off("click");
        $(".selectable-cell").removeClass("selectable-cell");

        // Duel à mort
        if (!this.board.noPlayersAround({ x: this.currentPlayer.x, y: this.currentPlayer.y })) {
            this.refreshPlayersUI();
            this.nextBattleRound();

            // Alert Start Fight
            Swal.fire({
                title: '<h1><br /> Prêt pour le combat ?</h1>',
                confirmButtonColor: '#a56c01',
                background: "#1f1e1e",
            })
            $('.board').css('opacity', '0.5');


        } else {
            this.nextPlayer();
            this.refreshPlayersUI();
            this.nextRound();
        }
    }

    // Gère les paramètres du combat
    nextBattleRound() {
        let otherPlayer = this.players.find(player => {
            return player.id != this.currentPlayer.id;
        });
        /* Clear listeners d'attaque et de défense des joueurs */
        /* Listeners sur les options de round */
        let currentCard = $('.player-card[data-player-id=' + this.currentPlayer.id + ']');
        console.log(this.currentPlayer.name + ' : Attaque ou Défense ?');

        $(currentCard).find('.attack-button').click(e => {
            this.resetRoundOptionListeners();
            this.currentPlayer.shield = 0.0;
            let damages = this.currentPlayer.weapon.damages * (1 - otherPlayer.shield);
            console.log(this.currentPlayer.name + ' attaque ' + otherPlayer.name + ' : boum, ' + damages + ' damages !');

            // Partie terminée
            if ((otherPlayer.health - damages) <= 0) {
                otherPlayer.health = 0;
                this.currentPlayer.damages = 100;
                this.refreshPlayersUI();

                // Alert Game Over
                Swal.fire({
                    icon: 'success',
                    title: '<h1>' + this.currentPlayer.name + ' a gagné </h1>',
                    confirmButtonText: 'Rejouer',
                    cancelButtonText: 'Fermer',
                    confirmButtonColor: '#a56c01',
                    background: "#1f1e1e",
                }).then((result) => {
                    if (result.value) {
                        location.reload();
                    }
                })

            } else {
                otherPlayer.health -= damages;
                this.nextPlayer();
                this.currentPlayer.damages += damages;
                this.refreshPlayersUI();
                this.nextBattleRound();
            }
        });

        $(currentCard).find('.defend-button').click(e => {
            this.currentPlayer.shield = 0.5;
            console.log(this.currentPlayer.name + ' se défend : gagne un bouclier de 50% pour la prochaine attaque');
            this.resetRoundOptionListeners();
            this.nextPlayer();
            this.refreshPlayersUI();
            this.nextBattleRound();
        });
    }

    // Gère le tour par tour
    nextPlayer() {
        let newPlayerId = (this.currentPlayer.id) % this.players.length;
        this.currentPlayer = this.players[newPlayerId];
    }

    resetRoundOptionListeners() {
        $('.defend-button, .attack-button').off('click');
    }

    getPlayer(indexPlayer) {
        return this.players[indexPlayer];
    }

    getPlayerCell() {
        return $(`.cell[data-x="${this.currentPlayer.x}"][data-y="${this.currentPlayer.y}"]`);
    }

    onResetGame() {
        $("#reset").on("click", function () {
            location.reload(".board");
        });
    }

    rulesGame() {
        $("#rules").on("click", function () {
            Swal.fire({
                title: '<h1>War Game !</h1>',
                html: "<p style='color: lightgray'>1. Chaque joueur peut attaquer ou défendre en tour par tour.<br /><br />2. Les dégâts dépendent de l'armée possédée.<br /><br />3. Chaque joueur peut choisir d'attaquer ou de se défendre au tour d'après.<br /><br />4. Le joueur qui se défend encaissera 50% de dégâts en moins.<br /><br />5. La partie est terminée lorsque l'un des deux joueurs atteint 0 point de vie.</p>",
                confirmButtonColor: '#a56c01',
                background: "#1f1e1e",
            })
        });
    }
}

/* Default game variables */
$(function () {
    let nbColumns = 8;
    let nbRows = 8;
    let nbGreyCell = 10;
    let nbWeapon = 4;
    let nbPlayer = 2;
    let game = new Game(nbColumns, nbRows, nbGreyCell, nbWeapon, nbPlayer);
    game.start();
});