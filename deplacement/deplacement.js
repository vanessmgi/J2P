
// ------ Retourne la cellule des coordonnées (x,y) ------
function getCell(x, y) {
    return $(`.cell[data-x=${x}][data-y=${y}]`);
};


// ------ Définit les mouvements d'un jouer -------
function movePlayer() {

    // Je sélectionne l'emplacement de mon joueur
    const $player = $('.player');

    // Je sélectionne mes cellules
    const $cells = $('.cell')

    // Je bouge mon joueur
    $player.removeClass('player')
    if ($cells.hasClass('.player')) {
        $cells.attr('data-empty', false)
    } else {
        $cells.attr('data-empty', true)
    }
    $selectedCell = $(this);
    $selectedCell.attr('data-empty', false)
    $selectedCell.addClass('player');

    $('.selectable-cell').off('click');
    $('.selectable-cell').removeClass('selectable-cell');

    // Je calcule les nouveaux déplacements possibles à partir de la nouvelle position de mon joueur
    potentialsMoves()
}


// ------ Future fonction qui permettra de définir les déplacements potentiels ------
function potentialsMoves() {

    // 1. Prendre les coordonnées du joueur à l'emplacement ACTUEL
    const $positionPlayerX = parseInt($('.player').attr('data-x'));
    const $positionPlayerY = parseInt($('.player').attr('data-y'));
    console.log("Position x = " + $positionPlayerX + " | " + "Position y = " + $positionPlayerY);

    // 2. Définir le nombre de mouvement maximum 

    const $maxMovesX = 2;
    const $maxMovesY = 1;

    // 3. Boucler jusqu'à que ce le nombre de mouvements maximum soit atteint
    
    for (let i = 1; i <= $maxMovesX; i++) {
        let $cellLeft = getCell($positionPlayerX - i, $positionPlayerY).addClass('selectable-cell');
        let $cellRight = getCell($positionPlayerX + i, $positionPlayerY).addClass('selectable-cell');
        
        if ($cellLeft.hasClass('greycell')) {
            i = $maxMovesX
            $cellLeft.removeClass('selectable-cell');
        } 
        
        if ($cellRight.hasClass('greycell')) {
            i = $maxMovesX
            $cellRight.removeClass('selectable-cell')
        } 
        
    }

    for (let i = 1; i <= $maxMovesY; i++) {
        let $cellUp = getCell($positionPlayerX, $positionPlayerY - i).addClass('selectable-cell');
        let $cellDown = getCell($positionPlayerX, $positionPlayerY + i).addClass('selectable-cell');

        if ($cellDown.hasClass('greycell')) {
            i = $maxMovesY
            $cellDown.removeClass('selectable-cell');
        } 

        if ($cellUp.hasClass('greycell')) {
            i = $maxMovesY
            $cellUp.removeClass('selectable-cell')
        }
    }

    // cible la class .selectable-cell et appel la fonction movePlayer() au clic
    $('.selectable-cell').click(movePlayer);
    
}

potentialsMoves()










/*

Déplacement sur toutes les cases

---

// Au préalable, je sélectionne l'ensemble des cellules sur le DOM
$cells = $('.cell')

// Puis, sur l'ensemble de ces cellules, tu écoutes un événement au click
$cells.click(function() {
    // A chaque tour de click, tu sélectionnes la case ayant pour classe player
    const $player = $('.player')

    // Tu effectues le déplacement
    $player.removeClass('player')
    $(this).addClass('player')
})
*/

// Deplacement en dur
/*
$firstSelectedCell = $('.cell[data-x="2"][data-y="2"]')

$rightSelectedCell = $('.cell[data-x="3"][data-y="2"]')
$dbRightSelectedCell = $('.cell[data-x="4"][data-y="2"]')

$leftSelectedCell = $('.cell[data-x="1"][data-y="2"]')
$dbLeftSelectedCell = $('.cell[data-x="0"][data-y="2"]')

$upSelectedCell = $('.cell[data-x="2"][data-y="1"]')
$dbUpSelectedCell = $('.cell[data-x="2"][data-y="0"]')

$downSelectedCell = $('.cell[data-x="2"][data-y="3"]')
$dbDownSelectedCell = $('.cell[data-x="2"][data-y="4"]')

*/



// let $coordinateCell = $('.cell').click(function () {
//     const $x = $(this).attr("data-x");
//     const $y = $(this).attr("data-y");
// })


// $coordinateCell.click(movePlayer)


/*
$firstSelectedCell.click(movePlayer);
$rightSelectedCell.click(movePlayer);
$dbRightSelectedCell.click(movePlayer);
$leftSelectedCell.click(movePlayer);
$dbLeftSelectedCell.click(movePlayer);
$upSelectedCell.click(movePlayer);
$dbUpSelectedCell.click(movePlayer);
$downSelectedCell.click(movePlayer);
$dbDownSelectedCell.click(movePlayer);
*/

/**
 * Objectifs semaine du 26 janvier
 *  -> Maintenant que tu l'as fait en dur, réaliser les event listeners avec un système de boucle au lieu de le faire en dur
 *  -> Après le faire en fonction du déplacement du joueur (ça va être dans une fonction que tu vas appeler à chaque déplacement)
 */



