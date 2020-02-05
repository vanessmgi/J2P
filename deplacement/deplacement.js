// ---- Global variables ----

let $player1 = $('.player1')
let $player2 = $('.player2')
let $activePlayer = $('.active')


// Retourne la cellule avec ses coordonnées (x,y)
function getCell(x, y) {
    return $(`.cell[data-x=${x}][data-y=${y}]`);
};

// Retourne la position du joueur actif
function getPlayerPosition() {
    return {
        $positionPlayerX: parseInt($($activePlayer).attr('data-x')),
        $positionPlayerY: parseInt($($activePlayer).attr('data-y'))
    }
}


// Définition des moves potentiels && inaccessibilité des cases grises
function potentialsMoves() {

    // ------ 1. Prendre les coordonnées du joueur à l'emplacement ACTUEL ------ //
    // MAINTENANT dans la fonction getPlayerPosition
    // console.log("Position x = " + $positionPlayerX + " | " + "Position y = " + $positionPlayerY);


    // ------ 2. Définir le nombre de mouvement maximum ------ //
    const $maxMovesX = 2;
    const $maxMovesY = 1;


    // ------ 3. Boucler jusqu'à que ce le nombre de mouvements maximum soit atteint ------ //
    /* à faire : 
    - faire une function pour gérer les 4 directions
    */

    /* vérification case grise à gauche */
    for (let i = 1; i <= $maxMovesX; i++) {
        let $cellLeft = getCell(getPlayerPosition().$positionPlayerX - i, getPlayerPosition().$positionPlayerY).addClass('selectable-cell');

        if ($cellLeft.hasClass('greycell') || $cellLeft.hasClass('player1') || $cellLeft.hasClass('player2')) {
            $cellLeft.removeClass('selectable-cell');
            break;
        }
    }
    /* vérification case grise à droite */
    for (let i = 1; i <= $maxMovesX; i++) {
        let $cellRight = getCell(getPlayerPosition().$positionPlayerX + i, getPlayerPosition().$positionPlayerY).addClass('selectable-cell');

        if ($cellRight.hasClass('greycell') || $cellRight.hasClass('player1') || $cellRight.hasClass('player2')) {
            $cellRight.removeClass('selectable-cell')
            break;
        }
    }
    /* vérification case grise en haut */
    for (let i = 1; i <= $maxMovesY; i++) {
        let $cellUp = getCell(getPlayerPosition().$positionPlayerX, getPlayerPosition().$positionPlayerY - i).addClass('selectable-cell');

        if ($cellUp.hasClass('greycell') || $cellUp.hasClass('player1') || $cellUp.hasClass('player2')) {
            $cellUp.removeClass('selectable-cell')
            break;
        }
    }
    /* vérification case grise en bas */
    for (let i = 1; i <= $maxMovesY; i++) {
        let $cellDown = getCell(getPlayerPosition().$positionPlayerX, getPlayerPosition().$positionPlayerY + i).addClass('selectable-cell');

        if ($cellDown.hasClass('greycell') || $cellDown.hasClass('player1') || $cellDown.hasClass('player2')) {
            $cellDown.removeClass('selectable-cell');
            break;
        }
    }

    // cible la class .selectable-cell et appel la fonction movePlayer() au clic //
    $('.selectable-cell').click(movePlayer);

}

potentialsMoves()

// Gère le tour par tour //
/* à faire :
- optimiser la condition (trop répétitif)
*/
function movePlayer() {

    $selectedCell = $(this);
    
    if ($activePlayer.hasClass('player1')) { 
        $activePlayer.removeClass('player1 active');
        $activePlayer.empty();
        $activePlayer.removeAttr('data-id', + 1); 
        $selectedCell.addClass('player1');
        $selectedCell.text("Player1")
        $selectedCell.attr('data-id', + 1)
        $player2.addClass('active');
        $activePlayer = $('.active');
        $player1 = $('.player1');

    } else {
        $activePlayer.removeClass('player2 active');
        $activePlayer.removeAttr('data-id', + 2);
        $activePlayer.empty();
        $selectedCell.addClass('player2');
        $selectedCell.text("Player2")
        $selectedCell.attr('data-id', + 2);
        $player1.addClass('active');
        $activePlayer = $('.active');
        $player2 = $('.player2');

    }
    //$player2 != $player1
    $('.selectable-cell').off('click');
    $('.selectable-cell').removeClass('selectable-cell');

    
    potentialsMoves()
    isOnBattleMode()
    
}


function isOnBattleMode() {
    // Est-ce que les joueurs sont en mode combat
    // L'idée de cette fonction : checker si les deux joueurs sont côté à côté

    let $cellLeft = getCell(getPlayerPosition().$positionPlayerX - 1, getPlayerPosition().$positionPlayerY);
    let $cellRight = getCell(getPlayerPosition().$positionPlayerX + 1, getPlayerPosition().$positionPlayerY);
    let $cellUp = getCell(getPlayerPosition().$positionPlayerX, getPlayerPosition().$positionPlayerY - 1);
    let $cellDown = getCell(getPlayerPosition().$positionPlayerX, getPlayerPosition().$positionPlayerY + 1);

    // condition pour vérifier si joueurX est à côté du joueur('active')
    if ($cellLeft.hasClass('player1') || $cellRight.hasClass('player1') || $cellUp.hasClass('player1') || $cellDown.hasClass('player1')) {
        console.log("Active player attack player2 !")

    } else if ($cellLeft.hasClass('player2') || $cellRight.hasClass('player2') || $cellUp.hasClass('player2') || $cellDown.hasClass('player2')) {  
        console.log("Active player attack player1 !")

    } else {
        console.log("No player around");
    }

}

isOnBattleMode();

/**
 * Todo
 *  -> Mode combat
 *      - 1. Tu peux commencer par coder en dure une position et si c'est les deux joueurs sont dessus, tu rentres en mode combat
 *      - 2. Si c'est trop simple de base en dure, vas-y directement en mode dynamique
 */
