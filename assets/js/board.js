class Board {
   constructor(col, row, greyBox) {
      this._col = col;
      this._row = row;
      this._greyBox = greyBox;
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
      // for (let i = 0; i < this._greyBox; i++) {
      //    console.log(i);
      // }
      const cells = $(".cell");
      console.log(cells);

   }
}

const board = new Board(4, 4, 2);
board.generateBoard();
board.generateGreyCells();







// function generateGreyCells(nbGreyCells) {
//    // boucle avec Math random
//    let xRandom = Math.random(0, 0);
//    let yRandom = Math.random(0, 0);
// }

// function generateWeapons(nbWeapons) {

// }


// function generatePlayers(nbPlayers) {

// }





