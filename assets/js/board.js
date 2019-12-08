$(function () {
class Board {
   constructor(col, row, greyBox, numberOfWeapons, nbPlayerPosition) {
      this._col = col;
      this._row = row;
      this._greyBox = greyBox;
      this._numberOfWeapons = numberOfWeapons;
      this._nbPlayerPosition = nbPlayerPosition;
   }

    generateBoard() {
        let $boardContainer = $('#dynamicGame .board');
        let $table = $('<table></table>');

        for (let y = 0; y < this._row; y++) { // y => nombre de lignes
        let $row = $('<tr class="line"></tr>');

            for (let x = 0; x < this._col; x++) { // x => nombre de cellules / ligne
                let $cell = $(`<td data-x=${x} data-y=${y} data-empty=true class="cell"></td>`);
                $row.append($cell);
            }
         $table.append($row);
        }
      $boardContainer.html($table);
   }


    generatePosition() {
        let x, y;
            do {
                x = Math.floor(Math.random() * this._col);
                y = Math.floor(Math.random() * this._row);
            } while (!this.isEmpty(x, y));
                return {
                    x: x,
                    y: y
                }
    }


    isEmpty(x, y) {
        let cell = this.getCell(x, y);
        let state = cell.attr('data-empty')=="true";
        return state == true;
    }


    getCell(x, y) {
        return $(`.cell[data-x=${x}][data-y=${y}]`);
    }


    generateGreyCells() {
        for (let i = 0; i < this._greyBox; i++) {
                // Récupérer le total de noeuds ayant la class .cell
                // Générer un indice aléatoire
            let $position = this.generatePosition();
                // Sélectionne un noeud html de façon aléatoire
            this.getCell($position.x, $position.y).addClass('cellGr');
            $('.cell.cellGr').attr('data-empty', false);
      }
   }


    generateWeapons() {
        for (let i = 0; i < this._numberOfWeapons; i++) {
            let $position = this.generatePosition();
            this.getCell($position.x, $position.y).addClass('cellWP');
            $('.cellWP').text('WP');
            $('.cell.cellWP').attr('data-empty', false);
      }
   };


    generatePlayerPosition() {
        for (let i = 0; i < this._nbPlayerPosition; i++) {
            let $position = this.generatePosition();

        // à dev - gestion pour éviter le côte à côte

        /*          
            do {
            $position = this.generatePosition();
         } while (checkIfNoOneClose($position)); 

        */

            this.getCell($position.x, $position.y).addClass('cellPP');
            $('.cellPP').text('Joueur');
            $('.cell.cellPP').attr('data-empty', false);
      }
   }
}

const board = new Board(8, 8, 8, 4, 2);
board.generateBoard();
board.generateGreyCells();
board.generateWeapons();
board.generatePlayerPosition();


});