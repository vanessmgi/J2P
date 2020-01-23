
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

/*
$firstSelectedCell.click(function () {
    const $player = $('.player')
    $player.removeClass('player')
    $firstSelectedCell.addClass('player')

    console.log('first ok')
})
*/

function movePlayer() {
    // Je sélectionne l'emplacement de mon joueur
    const $player = $('.player')

    // Je sélectionne mes céllules
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

    // Je calcule les nouveaux déplacements possibles à partir de la nouvelle position de mon joueur
    calculatePossibleMovements()
}

// Future fonction qui permettra de définir les déplacements potentiels
function calculatePossibleMovements() {
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

/**
 * Objectifs semaine du 26 janvier
 *  -> Maintenant que tu l'as fait en dur, réaliser les event listeners avec un système de boucle au lieu de le faire en dur
 *  -> Après le faire en fonction du déplacement du joueur (ça va être dans une fonction que tu vas appeler à chaque déplacement)
 */


