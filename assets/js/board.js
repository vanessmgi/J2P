class Board {
   constructor(col, row, greyBox) {
      this._col = col;
      this._row = row;
      this._greyBox = greyBox;
      this._numberOfWeapons = 4;
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
      // Générer "this._greyBox" positions aléatoires (cellules grises)
      // Afficher les cases grises

      // Et dans code HTML, mettre en gris, les cellules correspondantes
      // for (let i = 0; i < this._greyBox; i++) {
      //    console.log(i);
      // }
      
      for (let i = 0; i < this._greyBox; i++) {
         // Récupérer le total de noeuds ayant la class .cell
         var len = $(".cell").length;
         // Générer un indice aléatoire
         var random = Math.floor( Math.random() * len ) + 1;

         // Sélectionne un noeud html de façon aléatoire
         $(".cell").eq(random).addClass('cellGr');
      }
   }

   generateWeapons() {
      console.log(this._numberOfWeapons)
      $('.cell').eq(1).addClass('cellWP');
      $('.cell').eq(1).text('WP1')
   }

   generateGreyCellsPosition() {
      // Boucle de 0 à greyBox
         // generer aleatoirement un x entre this._col
         // generer aleatoirement un y entre this._row
         // stocker la position (x, y) dans une variable this.greysCells
   }

   HTMLGreyCells() {
      // Boucle de 0 à nombre de cellules grises
         // trouver dans le code HTML, le td correspondant
            // dans le code HTML, trouver un td qui a la même position que la cellule grise courante
         // griser le td correspondant
            // ajouter une classe "cellule-grise"
   }
}

const board = new Board(10, 10, 4);
board.generateBoard();
// board.generateGreyCells();
board.generateWeapons()


// function generateGreyCells(nbGreyCells) {
//    // boucle avec Math random
//    let xRandom = Math.random(0, 0);
//    let yRandom = Math.random(0, 0);
// }

// function generateWeapons(nbWeapons) {

// }


// function generatePlayers(nbPlayers) {

// }





