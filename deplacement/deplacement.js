// ---- Global variables ----

let $player1 = $('.player1')
let $player2 = $('.player2')
let $activePlayer = $('.active')


/**
 * Je déclare mes variables globales d'arme
 */
const weapon1 = 'couteau'
const weapon2 = 'pistolet'
const weapon3 = 'fusil'
const weapon4 = 'bazooka'

/**
 * Les armes des joueurs
 */
let weaponPlayer1 = weapon1
let weaponPlayer2 = weapon1


// mon joueur 1 arrive sur une case fusil
weaponPlayer1 = weapon3



// Retourne la cellule avec ses coordonnées (x,y)
function getCell(x, y) {
    return $(`.cell[data-x=${x}][data-y=${y}]`);
};

// Retourne la position du joueur actif
function getPlayerPosition(player) {
    return {
        $positionPlayerX: parseInt($(player).attr('data-x')),
        $positionPlayerY: parseInt($(player).attr('data-y'))
    }
}


// Définition des moves potentiels && inaccessibilité des cases grises
function potentialsMoves() {

    // ------ 1. Définir le nombre de mouvement maximum ------ //
    const $maxMovesX = 2;
    const $maxMovesY = 1;


    // ------ 2. Boucler jusqu'à que ce le nombre de mouvements maximum soit atteint ------ //
    /* à faire : 
    - faire une function pour gérer les 4 directions
    */

    /* vérification case grise à gauche */
    for (let i = 1; i <= $maxMovesX; i++) {
        let $cellLeft = getCell(getPlayerPosition($activePlayer).$positionPlayerX - i, getPlayerPosition($activePlayer).$positionPlayerY).addClass('selectable-cell');

        if ($cellLeft.hasClass('greycell') || $cellLeft.hasClass('player1') || $cellLeft.hasClass('player2')) {
            $cellLeft.removeClass('selectable-cell');
            break;
        }
    }
    /* vérification case grise à droite */
    for (let i = 1; i <= $maxMovesX; i++) {
        let $cellRight = getCell(getPlayerPosition($activePlayer).$positionPlayerX + i, getPlayerPosition($activePlayer).$positionPlayerY).addClass('selectable-cell');

        if ($cellRight.hasClass('greycell') || $cellRight.hasClass('player1') || $cellRight.hasClass('player2')) {
            $cellRight.removeClass('selectable-cell')
            break;
        }
    }
    /* vérification case grise en haut */
    for (let i = 1; i <= $maxMovesY; i++) {
        let $cellUp = getCell(getPlayerPosition($activePlayer).$positionPlayerX, getPlayerPosition($activePlayer).$positionPlayerY - i).addClass('selectable-cell');

        if ($cellUp.hasClass('greycell') || $cellUp.hasClass('player1') || $cellUp.hasClass('player2')) {
            $cellUp.removeClass('selectable-cell')
            break;
        }
    }
    /* vérification case grise en bas */
    for (let i = 1; i <= $maxMovesY; i++) {
        let $cellDown = getCell(getPlayerPosition($activePlayer).$positionPlayerX, getPlayerPosition($activePlayer).$positionPlayerY + i).addClass('selectable-cell');

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
- optimiser la condition (trop répétitive)
*/


function movePlayer() {

    $selectedCell = $(this);
    $destWeapon = $selectedCell.attr('data-wp-id');
    
    
    if ($activePlayer.hasClass('player1')) {
        $activePlayer.removeClass('player1 active weapon');
        $activePlayer.empty();
        $activePlayer.removeAttr('data-id data-wp-id');
        $selectedCell.addClass('player1 weapon');
        $selectedCell.text("Player1")
        $selectedCell.attr('data-id', + 1)
        $selectedCell.attr('data-wp-id', + 1)
        $player2.addClass('active');
        $activePlayer = $('.active');
        $player1 = $('.player1');

    } else {
        $activePlayer.removeClass('player2 active weapon');
        $activePlayer.removeAttr('data-id data-wp-id');
        $activePlayer.empty();
        $selectedCell.addClass('player2 weapon');
        $selectedCell.text("Player2")
        $selectedCell.attr('data-id', + 2);
        $selectedCell.attr('data-wp-id', + 1);
        $player1.addClass('active');
        $activePlayer = $('.active');
        $player2 = $('.player2');

    }

    /* 
    Lorsque mon joueur '.active' arrive sur une cellule qui contient un 'data-wp-id'
    il récupère la nouvelle arme (met à jour le data-wp-id avec l'ID de la nouvelle arme)
    lorsqu'il se déplace à nouveau (conserve le data-wp-id de sa nouvelle arme)
    il laisse l'ancienne arme sur la case qu'il vient de quitter (ajout de la class .weapon / du text "Wx" / le data-wp-id de l'ancienne arme)
    */
 
    $('.selectable-cell').off('click');
    $('.selectable-cell').removeClass('selectable-cell');


    potentialsMoves();
    isOnBattleMode();
    swapWeapons();

}


function isOnBattleMode() {
    // Est-ce que les joueurs sont en mode combat
    // L'idée de cette fonction : checker si les deux joueurs sont côté à côté

    let $cellLeft = getCell(getPlayerPosition($activePlayer).$positionPlayerX - 1, getPlayerPosition($activePlayer).$positionPlayerY);
    let $cellRight = getCell(getPlayerPosition($activePlayer).$positionPlayerX + 1, getPlayerPosition($activePlayer).$positionPlayerY);
    let $cellUp = getCell(getPlayerPosition($activePlayer).$positionPlayerX, getPlayerPosition($activePlayer).$positionPlayerY - 1);
    let $cellDown = getCell(getPlayerPosition($activePlayer).$positionPlayerX, getPlayerPosition($activePlayer).$positionPlayerY + 1);

    // condition pour vérifier si joueurX est à côté du joueur('active')
    if ($cellLeft.hasClass('player1') || $cellRight.hasClass('player1') || $cellUp.hasClass('player1') || $cellDown.hasClass('player1')) {
        console.log("Joueur 1 est prêt à attaquer le joueur 2 avec un " + weapon1);
        setTimeout(function () {
            confirm("Joueur 1 est prêt à attaquer le joueur 2 avec un " + weapon1);
        }, 1000);

    } else if ($cellLeft.hasClass('player2') || $cellRight.hasClass('player2') || $cellUp.hasClass('player2') || $cellDown.hasClass('player2')) {
        console.log("Joueur 2 est prêt à attaquer le joueur 1 avec un " + weapon1);
        setTimeout(function () {
            confirm("Joueur 2 est prêt à attaquer le joueur 1 avec un " + weapon1);
        }, 1000);
        
    } else {
        //console.log("No player around");
    }

}

isOnBattleMode();


function swapWeapons() { // 2 arguments à placer : arme possedée / future arme accessible à prendre

    let $selectedCell = $('.selectable-cell');
    
    if ($selectedCell.hasClass('weapon')) {
        console.log("arme(s) dispo");
    } else {
        console.log("pas d'arme(s) dans le coin");
    }
}





    
