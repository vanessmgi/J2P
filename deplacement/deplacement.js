
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


/**
 * Taches de cette semaine :
 *  -> rester sur ce modèle simplifié
 *  -> pouvoir se déplacer (en étant au centre), d'une case vers la droite, vers la gauche, vers le haut et vers le bas
 *  -> une fois que c'est ok, de deux cases.
 *  -> réfléchir à une fonction qui pourrait faire ça
 */



// Deplacement

$firstSelectedCell = $('.cell[data-x="2"][data-y="2"]')

$rightSelectedCell = $('.cell[data-x="3"][data-y="2"]')
$dbRightSelectedCell = $('.cell[data-x="4"][data-y="2"]')

$leftSelectedCell = $('.cell[data-x="1"][data-y="2"]')
$dbLeftSelectedCell = $('.cell[data-x="0"][data-y="2"]')

$upSelectedCell = $('.cell[data-x="2"][data-y="1"]')
$dbUpSelectedCell = $('.cell[data-x="2"][data-y="0"]')

$downSelectedCell = $('.cell[data-x="2"][data-y="3"]')
$dbDownSelectedCell = $('.cell[data-x="2"][data-y="4"]')



function movePlayer() {
    const $player = $('.player')
    $player.removeClass('player')
    $selectedCell = $(this); 
    $selectedCell.addClass('player');
}

$firstSelectedCell.click(movePlayer);
$rightSelectedCell.click(movePlayer);
$dbRightSelectedCell.click(movePlayer);
$leftSelectedCell.click(movePlayer);
$dbLeftSelectedCell.click(movePlayer);
$upSelectedCell.click(movePlayer);
$dbUpSelectedCell.click(movePlayer);
$downSelectedCell.click(movePlayer);
$dbDownSelectedCell.click(movePlayer);


