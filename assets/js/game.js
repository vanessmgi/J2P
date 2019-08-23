$(function () {
    /* Default game variables */
    let nbColumns = 8;
    let nbRows = 8;
    let nbGreyCells = 2;
    let nbWeapons = 4;
    let nbPlayers = 2;






    generateBoard(nbColumns, nbRows);
    generateGreyCells(nbGreyCells);
    generateWeapons(nbWeapons);
    generatePlayers(nbPlayers);



    
});