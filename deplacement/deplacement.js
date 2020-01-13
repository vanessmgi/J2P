
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
 * Déplacement sur une à deux cases vers la droite
 */
$firstSelectedCell = $('.cell[data-x="1"][data-y="1"]')
$secondSelectedCell = $('.cell[data-x="2"][data-y="1"]')

console.log($firstSelectedCell)
$firstSelectedCell.click(function() {
    // A chaque tour de click, tu sélectionnes la case ayant pour classe player
    const $player = $('.player')

    // Tu effectues le déplacement
    $player.removeClass('player')
    $firstSelectedCell.addClass('player')
})

$secondSelectedCell.click(function() {
    // A chaque tour de click, tu sélectionnes la case ayant pour classe player
    const $player = $('.player')

    // Tu effectues le déplacement
    $player.removeClass('player')
    $secondSelectedCell.addClass('player')
})

/**
 * Taches de cette semaine : 
 *  -> rester sur ce modèle simplifié
 *  -> pouvoir se déplacer (en étant au centre), d'une case vers la droite, vers la gauche, vers le haut et vers le bas
 *  -> une fois que c'est ok, de deux cases.
 *  -> réfléchir à une fonction qui pourrait faire ça
 */