// ---- Global variables ----

let $player1 = $('.player1')
let $player2 = $('.player2')
let $activePlayer = $('.active')


// Retourne la cellule avec ses coordonnées (x,y)
function getCell(x, y) {
    return $(`.cell[data-x=${x}][data-y=${y}]`);
};


// Définition des moves potentiels && inaccessibilité des cases grises
function potentialsMoves() {

    // ------ 1. Prendre les coordonnées du joueur à l'emplacement ACTUEL ------ //
    const $positionPlayerX = parseInt($($activePlayer).attr('data-x'));
    const $positionPlayerY = parseInt($($activePlayer).attr('data-y'));
    console.log("Position x = " + $positionPlayerX + " | " + "Position y = " + $positionPlayerY);


    // ------ 2. Définir le nombre de mouvement maximum ------ //
    const $maxMovesX = 2;
    const $maxMovesY = 1;


    // ------ 3. Boucler jusqu'à que ce le nombre de mouvements maximum soit atteint ------ //
    /* à faire : 
    - faire une function pour gérer les 4 directions
    - faire en sorte que les deux joueurs ne se superposent jamais
    */

    /* vérification case grise à gauche */
    for (let i = 1; i <= $maxMovesX; i++) {
        let $cellLeft = getCell($positionPlayerX - i, $positionPlayerY).addClass('selectable-cell');

        if ($cellLeft.hasClass('greycell')) {
            $cellLeft.removeClass('selectable-cell');
            break;
        }
    }
    /* vérification case grise à droite */
    for (let i = 1; i <= $maxMovesX; i++) {
        let $cellRight = getCell($positionPlayerX + i, $positionPlayerY).addClass('selectable-cell');

        if ($cellRight.hasClass('greycell')) {
            $cellRight.removeClass('selectable-cell')
            break;
        }
    }
    /* vérification case grise en haut */
    for (let i = 1; i <= $maxMovesY; i++) {
        let $cellUp = getCell($positionPlayerX, $positionPlayerY - i).addClass('selectable-cell');

        if ($cellUp.hasClass('greycell')) {
            $cellUp.removeClass('selectable-cell')
            break;
        }
    }
    /* vérification case grise en bas */
    for (let i = 1; i <= $maxMovesY; i++) {
        let $cellDown = getCell($positionPlayerX, $positionPlayerY + i).addClass('selectable-cell');

        if ($cellDown.hasClass('greycell')) {
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
        $selectedCell.addClass('player1');
        $player2.addClass('active');
        $activePlayer = $('.active');
        $player1 = $('.player1');

    } else {
        $activePlayer.removeClass('player2 active');
        $selectedCell.addClass('player2');
        $player1.addClass('active');
        $activePlayer = $('.active');
        $player2 = $('.player2');

    }
    $player2 != $player1
    $('.selectable-cell').off('click');
    $('.selectable-cell').removeClass('selectable-cell');

    potentialsMoves()
    
}