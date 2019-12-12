class Board {
   constructor(col, row, nbGreyCell, nbWeapon, nbPlayer) {
      this._col = col;
      this._row = row;
      this._nbGreyCell = nbGreyCell;
      this._nbWeapon = nbWeapon;
      this._nbPlayer = nbPlayer;
   };

   // Génère un plateau de jeu + DOM
    generateBoard() {
        let $boardContainer = $('#dynamicGame .board');
        let $table = $('<table></table>');

        for (let y = 0; y < this._row; y++) { // y => nombre de lignes
        let $row = $('<tr class="line"></tr>');

            for (let x = 0; x < this._col; x++) { // x => nombre de cellules / ligne
                let $cell = $(`<td data-x=${x} data-y=${y} data-empty=true class="cell"></td>`);
                $row.append($cell);
            };
         $table.append($row);
        };
      $boardContainer.html($table);
   };

    // Génère une position aléatoire de (x,y) & vérifie si data-empty = true
    generatePosition() {
        let $x, $y;
            do {
                $x = Math.floor(Math.random() * this._col);
                $y = Math.floor(Math.random() * this._row);
            } while (!this.isEmpty($x, $y));
            return {
                x: $x,
                y: $y
            };
    };

    // Retourne les coordonnées (x, y) d'une cellule si elle est vide
    isEmpty(x, y) {
        let $cell = this.getCell(x, y);
        let $state = $cell.attr('data-empty')=="true";
        return $state == true;
    };

    // Retourne les coordonnées (x,y) d'une cellule
    getCell(x, y) {
        return $(`.cell[data-x=${x}][data-y=${y}]`);
    };

    // Génère x case(s) grise(s) et add (.greycell) / data-empty=false
    generateGreyCells() {
        for (let i = 0; i < this._nbGreyCell; i++) {
                // Récupérer le total de noeuds ayant la class .cell
                // Générer un indice aléatoire
            let $position = this.generatePosition();
                // Sélectionne un noeud html de façon aléatoire
            let $cell = this.getCell($position.x, $position.y)

                $cell.addClass('greycell');
                $cell.attr('data-empty', false);
      };
   };

   // Génère x case(s) arme(s) et add (.weapon) / data-empty=false
    generateWeapons() {
        for (let i = 0; i < this._nbWeapon; i++) {
            let $position = this.generatePosition();
            let $cell = this.getCell($position.x, $position.y);

                $cell.addClass('weapon');
                $cell.attr('data-weapon-id', i);
                $cell.text('Weapon ' + i);
                $cell.attr('data-empty', false);
      };
   };

    // Vérifie qu'aucun joueur ne soit à côté de la cellule (x, y)
    checkCellIsNotPlayer(x, y) {
        return !this.getCell(x, y).hasClass('player');
    };

    // Vérifie si Joueur(s) autour d'une case
    noPlayersAround($position) {
        let $x = $position.x;
        let $y = $position.y;
        let $celluleGaucheIsNotPlayer = this.checkCellIsNotPlayer($x-1, $y);
        let $celluleDroiteIsNotPlayer = this.checkCellIsNotPlayer($x+1, $y);
        let $celluleHautIsNotPlayer = this.checkCellIsNotPlayer($x, $y-1);
        let $celluleBasIsNotPlayer = this.checkCellIsNotPlayer($x, $y+1);

        if($celluleGaucheIsNotPlayer && $celluleDroiteIsNotPlayer && $celluleHautIsNotPlayer && $celluleBasIsNotPlayer) {
            // Aucun joueur autour
            return true;
        };
        return false;
    };

    // Génère la position de x player tant que la case est vide && sans spawn côte à côte
    generatePlayerPosition() {
        for (let i = 0; i < this._nbPlayer; i++) {
            let $position = this.generatePosition(); // Case vide

            do {
                $position = this.generatePosition(); // Case vide
            } while (!this.noPlayersAround($position));

            let $cell = this.getCell($position.x, $position.y);
                $cell.addClass('player');
                $cell.attr('data-player-id', i);
                $cell.text('Player ' + i);
                $cell.attr('data-empty', false);
        };
    };
};
