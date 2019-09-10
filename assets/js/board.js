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
            let $cell = $(`<td class="cell y-${y} x-${x}"></td>`);
            $row.append($cell);
         }
         $table.append($row);
      }
      $boardContainer.html($table);
   }

   generateGreyCells() {
      console.log(this._greyBox)

      for (let i = 0; i < this._greyBox; i++) {
         // Récupérer le total de noeuds ayant la class .cell
         let $len = $(".cell").length;
         // Générer un indice aléatoire
         let $randomGC = Math.floor(Math.random() * $len) + 1;
         // Sélectionne un noeud html de façon aléatoire
         $('.cell').eq($randomGC).addClass('cellGr');
      }
   }

   generateWeapons() {
      console.log(this._numberOfWeapons)

      for (let i = 0; i < this._numberOfWeapons; i++) {
            let $len = $(".cell").length;
            let $randomWP = Math.floor(Math.random() * $len) + 1;
            $('.cell').eq($randomWP).addClass('cellWP');
            $('.cellWP').text('WP');
      }
   }

   generatePlayerPosition() {
      console.log(this._nbPlayerPosition);

      for (let i = 0; i < this._nbPlayerPosition; i++) {
         let $len = $(".cell").length;
         let $randomPosition = Math.floor(Math.random() * $len) + 1;
         $('.cell').eq($randomPosition).addClass('cellPP');
         $('.cellPP').text('Joueur');
      }
   }

}

const board = new Board(8, 8, 4, 4, 2);
board.generateBoard();
board.generateGreyCells();
board.generateWeapons();
board.generatePlayerPosition();








