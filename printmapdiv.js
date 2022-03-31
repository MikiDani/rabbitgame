let idSzamol=0;
for(let x=0; x<map.labyrinthRows; x++) {
    for(let y=0; y<map.labyrinthColumns; y++) {
        map.labyrinthData
        document.write('<div id="'+idSzamol+'"></div>');
        idSzamol=idSzamol+1;
    }
}
//'+idSzamol+'<br>'+map.labyrinthData[x][y]+'