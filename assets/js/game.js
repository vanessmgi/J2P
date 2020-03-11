/*
Class qui gère tout le déroulement du jeu :
- itinialisation des paramètres de la partie avec les variables par défaut
- itinialisation des joueurs
- mouvement des joueurs (et les contraintes)
- récupération des armes
- phase de combat
- phase de défence
- fin de partie
*/

class Game {

    // Pas oublie les petits points virgules
    SHIELD_DEFEND_VALUE = 0.5
    SHIELD_ATTACK_VALUE = 0.0

    MAX_MOV_X = 3
    MAX_MOV_Y = 3

    constructor(col, row, nbGreyCell, nbWeapon, nbPlayer) {
        this.nbPlayer = nbPlayer;
        this.board = new Board(col, row, nbGreyCell, nbWeapon, nbPlayer);
        this.players = [];
        this.names = ["Ryan", "Wilson"];
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

    // Vérifie les mouvements possible et non disponible pour les joueurs
    // Review : les méthodes nextRound and handleMovement ne servent à rien -> elles appellent toutes les deux potentialMoves
    potentialMoves() {
        /* vérification case grise à gauche */
        for (let i = 1; i <= this.MAX_MOV_X; i++) {
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
        for (let i = 1; i <= this.MAX_MOV_X; i++) {
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
        for (let i = 1; i <= this.MAX_MOV_Y; i++) {
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
        for (let i = 1; i <= this.MAX_MOV_Y; i++) {
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
        // cible la class .selectable-cell et appel la fonction movePlayer() au clic 
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
            $previousCell.css('background-image', `url('${this.currentPlayer.previousWeapon.url}')`);
            this.currentPlayer.previousWeapon = null;

        } else { // réinitialise les attributs de la case précédente
            $previousCell.removeAttr('data-weapon-id');
            $previousCell.removeAttr('style');
            $previousCell.attr('data-empty', true);
        }

        $selectedCell.addClass("player");
        $selectedCell.attr("data-id", this.currentPlayer.id);
        $selectedCell.attr("data-empty", false);

        if ($selectedCell.hasClass('weapon')) { // On remplace l'arme possédée par la nouvelle
            let newWeapon = Weapons[$selectedCell.attr('data-weapon-id')];
            $selectedCell.css('background-image', 'unset');
            this.currentPlayer.previousWeapon = this.currentPlayer.weapon;
            this.currentPlayer.weapon = newWeapon;
        } else {
            $selectedCell.css('background-image', `url("${this.currentPlayer.image}")`);
        }

        this.currentPlayer.x = parseInt($selectedCell.attr('data-x'));
        this.currentPlayer.y = parseInt($selectedCell.attr('data-y'));
        $(".selectable-cell").off("click");
        $(".selectable-cell").removeClass("selectable-cell");

        // Initialisation du combat
        if (!this.board.hasPlayersAround({ x: this.currentPlayer.x, y: this.currentPlayer.y })) {
            this.refreshPlayersUI();
            this.nextBattleRound();

            // Alert Start Fight
            Swal.fire({
                title: '<h1><br /> Prêt pour le combat ?</h1>',
                confirmButtonColor: '#a56c01',
                background: "#1f1e1e",
            })
            $('.board').css('opacity', '0.5');

        // Sinon le tour par tour continue
        } else {
            this.nextPlayer();
            this.refreshPlayersUI();
            this.nextRound();
        }
    }

    // Gère les paramètres du combat
    nextBattleRound() {
        let otherPlayer = this.players.find(player => player.id != this.currentPlayer.id);
        let currentCard = $('.player-card[data-player-id=' + this.currentPlayer.id + ']');
        
        // Phase d'attaque
        $(currentCard).find('.attack-button').click(e => {
            this.resetRoundOptionListeners();
            this.currentPlayer.shield = this.SHIELD_ATTACK_VALUE;

            // Stock le résultat de l'attaque
            let damages = this.currentPlayer.attack(this.currentPlayer.weapon.damages, otherPlayer.shield);

            // Si le joueur n'a plus de point de vie - Fin de la partie
            if ((otherPlayer.health - damages) <= 0) {
                otherPlayer.health = 0;
                this.currentPlayer.damages = 100;
                this.refreshPlayersUI();
                

                // Alert "Partie terminée" et relance une nouvelle partie
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

            // Sinon le joueur continue le combat continue jusqu'à health = 0
            } else {
                otherPlayer.health -= damages;
                this.nextPlayer();
                this.currentPlayer.damages += damages;
                this.refreshPlayersUI();
                this.nextBattleRound();
            }
        });

        // Phase de défense
        $(currentCard).find('.defend-button').click(e => {
            this.currentPlayer.shield = this.SHIELD_DEFEND_VALUE;    
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

    // Supprime les écouteurs d'événements sur les deux boutons
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
            // Alert Règles du jeu
            Swal.fire({
                title: '<h1>War Game !</h1>',
                html: "<p style='color: lightgray'>1. Chaque joueur peut attaquer ou défendre en tour par tour.<br /><br />2. Les dégâts dépendent de l'armée possédée.<br /><br />3. Chaque joueur peut choisir d'attaquer ou de se défendre au tour d'après.<br /><br />4. Le joueur qui se défend encaissera 50% de dégâts en moins.<br /><br />5. La partie est terminée lorsque l'un des deux joueurs atteint 0 point de vie.</p>",
                confirmButtonColor: '#a56c01',
                background: "#1f1e1e",
            })
        });
    }
}

/* Variables du jeu par défaut */
$(function () {
    let nbColumns = 8;
    let nbRows = 8;
    let nbGreyCell = 10;
    let nbWeapon = 4;
    let nbPlayer = 2;
    let game = new Game(nbColumns, nbRows, nbGreyCell, nbWeapon, nbPlayer);
    game.start();
});