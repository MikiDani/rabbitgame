const infoBox=document.querySelector('#infobox');
const carrotInfotext=document.querySelector('#carrotinfotext');
const carrotBox=document.querySelector('#carrotbox');
const bombInfoText=document.querySelector('#bombinfotext');
const carrotInfoText=document.querySelector('#carrotinfotext');
const bombBox=document.querySelector('#bombbox');
const gridContainer=document.getElementById('gridcontainer');
const BtnGp=document.getElementById('btn-gpuw');
const energyBox=document.getElementById('energybox');
const energy=document.getElementById('energy');
const liveboxs=document.getElementById('liveboxs');
const livebox=document.querySelectorAll('.livebox');
const gridContainerDiv=document.querySelectorAll('#gridcontainer div');
const gamePopUpWindow=document.getElementById('gamepopupwindow');
const gamePopUpWindowText=document.getElementById('gamepopupwindow-text');
const menuWindow=document.getElementById('menuwindow');
const menuWindowText=document.getElementById('menuwindow-text');

gameMenu.outSwitch==true ? menuWindow.style.display='none'  : menuWindow.style.display='block';
gamePopUpWindow.style.display='none';

mapRowsColumns = () => {    
 // var mapDivColumnsPiece = Math.round(100 / map.labyrinthColumns); kerekítve
    var mapDivColumnsPiece = (100 / map.labyrinthColumns);
    /*  Oszlopok elosztása  */
    let insertCssColumns='';
    for (let n=0; n<map.labyrinthColumns; n++) {
        insertCssColumns += `${mapDivColumnsPiece}%`;
    }
    gridContainer.style.gridTemplateColumns = insertCssColumns;
    /* gridContainerDiv magassága */
    window.onresize = () => mapScaling();
    mapScaling = () => {
        let divHeightNumber = gridContainerDiv[0].offsetWidth;
        let divHeight = gridContainerDiv[0].offsetWidth+'px';
        map.gridContainerDivLength=gridContainerDiv[0].offsetWidth;
        for (let n=0; n<gridContainerDiv.length; n++){
            gridContainerDiv[n].style.height=divHeight;
        }
        let infoboxWidth=gridContainer.offsetWidth+'px';
        let half = (gridContainerDiv[0].offsetWidth/2)+"px";
        let energyWidth = ((gridContainerDiv[0].offsetWidth/2)*10)+"px";
        let oneThierd = (gridContainerDiv[0].offsetWidth/3)+"px";
        let percentage80 = (gridContainerDiv[0].offsetWidth/100)*80+"px";
        let percentage10 = (gridContainerDiv[0].offsetWidth/100)*10+"px";
        infoBox.style.width=infoboxWidth; infoBox.style.height=divHeight;
        infoBox.style.paddingLeft=percentage10; infoBox.style.paddingRight=percentage10;
        carrotBox.style.width=percentage80; carrotBox.style.height=percentage80;
        carrotBox.style.marginTop=percentage10; carrotInfoText.style.height=divHeight;
        bombBox.style.width=percentage80; bombBox.style.height=percentage80;
        bombBox.style.marginTop=percentage10; bombInfoText.style.height=divHeight;
        liveboxs.style.height=divHeight;
        liveboxs.style.width=(divHeightNumber*rabbit.lives)+'px';
        carrotInfotext.style.fontSize=half; carrotInfotext.style.top=oneThierd;
        bombInfoText.style.fontSize=half; bombInfoText.style.top=oneThierd;
        energyBox.style.width=energyWidth; energyBox.style.height=oneThierd;
        energyBox.style.marginTop=oneThierd; energy.style.height=oneThierd;
        energy.style.width=rabbit.energy+"%";
    }
}

divDraw = (divId, divValue) => {
    let modText;
    for (let n=0; n<gameObjects.length; n++) {
        if (divValue==gameObjects[n]) {
            if (gameObjects[n]=='none') {
                modText='none';
            } else {
                if (gameObjects[n]=='hole') {
                    if (carrot.pickedUp==true) {
                        modText='url("img2/hole.svg")';
                    } else {
                        modText='url("img2/hole2.svg")';
                    }
                } else {
                modText='url("img2/'+gameObjects[n]+'.svg")';
                }
            }
        }
        document.getElementById(divId).style.backgroundImage=""+modText+"";
        if (divValue=='rabbit') {
            document.getElementById(divId).style.zIndex="10";
        } else { document.getElementById(divId).style.zIndex="1"; }
    }
}

allMapDraw = () => {
    let idCounting=0;
    for (var y=0; y < map.labyrinthRows; y++) {
        for (var x=0; x < map.labyrinthColumns; x++) {
            divDraw(idCounting, map.labyrinthData[y][x]);
            document.getElementById(idCounting).style.top='0px';
            document.getElementById(idCounting).style.left='0px';
            idCounting++;
        }
    }
}

explosiveBomb = () => {
    if (bomb.objectPiece>0) {
        if (boom.animSwitch==false) {
            boom.animSwitch=true;
            boom.row=rabbit.row;
            boom.column=rabbit.column;
            boom.exploiseId=rabbit.LiveSoulId;
            let audio = document.getElementById('boom'); audio.play();
        }
    }
}

gameEngine = () => {  /*** GAME ***/
    let engineCounting=0;
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    window.onclick = () => {
        const rabbitContainerDiv=document.getElementById(rabbit.LiveSoulId);
        let rabbitBox = (gridContainerDiv[0].offsetWidth);
        let halfRabbitBox = (gridContainerDiv[0].offsetWidth/2);
        let x = event.clientX; let y = event.clientY;
        let rabbitLeft = rabbitContainerDiv.offsetLeft;
        let rabbitTop = rabbitContainerDiv.offsetTop;
        
        gridContainerDiv[rabbit.LiveSoulId].onclick = () => {
            explosiveBomb();
        }
        
        if (rabbit.animSwitch==false && boom.animSwitch==false) {
            if (x>rabbitLeft && x<(rabbitLeft+rabbitBox)) {
                if (y<(rabbitTop+halfRabbitBox)) {
                    if (rabbit.LiveSoulId>map.labyrinthColumns) {
                        let felNumber = parseInt('-'+map.labyrinthColumns);
                        rabbit.liveSoulMove('up', felNumber);
                    }
                }
                if (y>(rabbitTop+halfRabbitBox)) {            
                    if (rabbit.LiveSoulId<(map.labyrinthLonght-map.labyrinthColumns)) {
                        rabbit.liveSoulMove('down', map.labyrinthColumns);
                    }
                }
            } else {
            
                if (y>rabbitTop && y<(rabbitTop+rabbitBox)) {
                    if (x<rabbitLeft) {
                        rabbit.liveSoulMove('left', -1);
                    }
                    if (x>rabbitLeft) {
                        rabbit.liveSoulMove('right', 1);
                    }
                }
                
            }
        }
    }

    /* window.ondblclick = () => { if (rabbit.animSwitch==false && boom.animSwitch==false) { explosiveBomb(); } } */

    energyThings = (eValue) => {
        rabbit.energy=(rabbit.energy+eValue);
        if (rabbit.energy<0) { rabbit.energy=0; }
        if (rabbit.energy>100) { rabbit.energy=100; }
        if (rabbit.energy>0) {
            document.getElementById('energy').style.width=rabbit.energy+'%';
        } else {
            document.getElementById('energy').style.width=rabbit.energy+'%';
            if (rabbit.lives>0) {
                gameMenu.outSwitch=false;
                document.getElementById('energy').style.width=rabbit.energy+'%';
                gameMenu.popUpWindow('You lost a life!', 'popUp', 'minusLive');
                let audio = document.getElementById('life'); audio.play();
            } else {
                gameMenu.outSwitch=false;
                document.getElementById('energy').style.width=rabbit.energy+'%';
                gameMenu.popUpWindow('Game Over!', 'popUp', 'gameOver');
            }
        }
    }

    keyboardSee = () => {
        BtnGp.onclick= () => {
            gameMenu.outSwitch=true;
            gameMenu.winId='none';
            gamePopUpWindow.style.display='none';
            if (gameMenu.message=='minusLive') { rabbit.lives=rabbit.lives-1; restartLevel(); }
            if (gameMenu.message=='nextLevel') { restartLevel(); }
            if (gameMenu.message=='gameOver') { gameMenu.exitSwitch=false; gameMenu.outSwitch=false; gameMenu.winId='menu'; }
            gameMenu.message='none';
        }
        
        document.addEventListener('keydown', function(useKey) {
            // U
            if (useKey.keyCode == 85) {
                restartLevel();
            }
            // E
            if (useKey.keyCode == 69) {
                energyThings(-20);
            }
            // Esc
            if (useKey.keyCode == 27) {  // megkell fordítani a ciklust ha akarsz menüt vagy nem
                if (gameMenu.outSwitch==true) {
                    gameMenu.outSwitch=false;
                    gameMenu.winId='menu';
                } else {
                    gameMenu.outSwitch=true; 
                    gameMenu.winId='none';
                    menuWindow.style.display='none';
                }
            }
            /* rabbit move */
            if (gameMenu.outSwitch==true && rabbit.animSwitch==false && boom.animSwitch==false) {
                // Space
                if (useKey.keyCode == 32) { explosiveBomb(); }
                //bal0
                if (useKey.keyCode == 37) { rabbit.liveSoulMove('left', -1); }
                //jobb
                if (useKey.keyCode == 39) { rabbit.liveSoulMove('right', 1); }
                //fel
                if (useKey.keyCode == 38) { if (rabbit.LiveSoulId>map.labyrinthColumns) { let felNumber = parseInt('-'+map.labyrinthColumns); rabbit.liveSoulMove('up', felNumber); } }
                //le
                if (useKey.keyCode == 40) { if (rabbit.LiveSoulId<(map.labyrinthLonght-map.labyrinthColumns)) { rabbit.liveSoulMove('down', map.labyrinthColumns); } }
            }
        });
    }

    restartLevel = () => {
        map.mapReset();
        map.mapUpload();
        map.mapKeret();
        
        rabbit.liveSoulInsert();
        rabbit.energy=100;
        rabbit.animNumberValue=0;
        rabbit.animSwitch=false;
        rabbit.slidingAll=0;
        rabbit.slidingwayNumber=0;
        
        for (let n=0; n<map.farmerInGame.length; n++) {
            map.farmerInGame[n].liveSoulInsert();
            map.farmerInGame[n].animNumberValue=0;
            map.farmerInGame[n].animSwitch=false;
            map.farmerInGame[n].slidingAll=0;
            map.farmerInGame[n].slidingwayNumber=0;
            map.farmerInGame[n].on=true;
        }

        carrot.objectInsert();
        carrot.pickedUp=false;
        carrot.objectPickUp=0;
        
        bomb.objectInsert(); 
        hole.objectInsert();
        
        key1.have=false; key2.have=false; key3.have=false;
        key1.oneInsert(); wallk1.oneInsert();
        key2.oneInsert(); wallk2.oneInsert();
        key3.oneInsert(); wallk3.oneInsert();

        mapRowsColumns();
        mapScaling();
        allMapDraw();
        carrot.pointsDraw();
        bomb.bombDraw();
        rabbit.livesDraw();
    }

    gameRepeat = async () => {
        do {
            gameMenu.engine();
            if (gameMenu.outSwitch==true) {
                if (gameMenu.exitSwitch==true) {
                    while (gameMenu.outSwitch) {
                        engineCounting++;
                        //console.log(engineCounting);
                        rabbit.repeatSee();
                        boom.repeatSee();
                        /* Farmers see and Move */
                        for (let n=0; n<map.farmerInGame.length; n++) {
                            if (map.farmerInGame[n].on == true) {
                                map.farmerInGame[n].repeatSee();
                                map.farmerInGame[n].brain();
                            }
                        }
                        await sleep(20);
                    }
                }
            }
            await sleep(20);
        } while (gameMenu.end);
    }
    keyboardSee();
    gameRepeat();
}
/*****************/
rabbit.livesDraw();
mapRowsColumns();
mapScaling();
allMapDraw();
carrot.pointsDraw();
bomb.bombDraw();

gameEngine();
/*****************/