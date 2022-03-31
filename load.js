var gameObjects = ['none', 'wall1', 'wall2', 'wall3', 'bomb', 'hole', 'rabbit', 'farmer', 'farmer2', 'carrot', 'boom', 'wallk1', 'key1', 'wallk2', 'key2', 'wallk3', 'key3', 'life'];
var exploiseSwitch = false;
gameObjects[0]="none"; gameObjects[1]="wall1"; gameObjects[2]="wall2"; gameObjects[3]="wall3";
gameObjects[4]="bomb"; gameObjects[5]="hole"; gameObjects[6]="rabbit"; gameObjects[7]="farmer";
gameObjects[8]="farmer2"; gameObjects[9]="carrot"; gameObjects[10]="boom"; gameObjects[11]="wallk1"; gameObjects[12]="key1";  gameObjects[13]="wallk2"; gameObjects[14]="key2"; gameObjects[15]="wallk3"; gameObjects[16]="key3"; gameObjects[17]="life";

class GameMenuObj {
    outSwitch;
    exitSwitch;
    winId;
    message;
    nextLevel;
    constructor () {
        this.end=true;

        this.outSwitch=true;
        this.winId='none';

        this.exitSwitch=true;
        this.message='none';
        this.nextLevel=false;
    }
    
    engine = () => {
        if (this.winId!=='none') {
            if (this.winId=='popUp') {
                menuWindow.style.display='none';
                gamePopUpWindow.style.display='block';
            } 
            if (this.winId=='menu') {
                menuWindow.style.display='block';
                menuWindowText.innerHTML='<h3>PAUSE</h3>';
            }
        }
    }

    popUpWindow = (textUp, winId, message) => {
        this.winId=winId;
        this.message=message;
        gamePopUpWindow.style.display='block';
        gamePopUpWindowText.innerHTML=textUp;
    }
}

class GameMap {
    labyrinthRows;
    labyrinthColumns;
    labyrinthData;
    labyrinthName;
    labyrinthAllId;
    labyrinthLonght;
    gridContainerDivLength;
    level;
    farmerInGame;
    farmers;
    constructor(labyrinthRows, labyrinthColumns) {
        this.level=1;
        this.labyrinthRows=labyrinthRows;
        this.labyrinthColumns=labyrinthColumns;
        this.labyrinthData= new Array(this.labyrinthRows);
        this.labyrinthAllId=[];
        this.labyrinthLonght=(labyrinthRows*labyrinthColumns);
        this.farmerInGame=[];
        this.farmers=[
            {   
                "id": "1",
                "LiveSoulName": "farmer",
                "animNumberMax": "12",
                "brainMode": "1"
            },
            {   
                "id": "2",
                "LiveSoulName": "farmer2",
                "animNumberMax": "8",
                "brainMode": "1"
            },
            {  
                "id": "3",
                "LiveSoulName": "farmer",
                "animNumberMax": "12",
                "brainMode": "0"
            },
            {  
                "id": "4",
                "LiveSoulName": "farmer2",
                "animNumberMax": "8",
                "brainMode": "0"
            }
        ];
    }
    
    mapReset = () => {
        for (var y=0; y<this.labyrinthData.length; y++) {
            this.labyrinthData[y] = new Array(this.labyrinthColumns);
        }
        let idInsert=[];
        for (var y=0; y < this.labyrinthRows; y++) {
            for (var x=0; x < this.labyrinthColumns; x++) {
                this.labyrinthData[y][x]=gameObjects[0];
                idInsert.push(gameObjects[0]);
            }
        }
        this.labyrinthAllId = idInsert;
    }

    mapTextInfo = () => {
        let idNumber=0;
        for (var y=0; y < this.labyrinthRows; y++) {
            for (var x=0; x < this.labyrinthColumns; x++) {
                document.getElementById(idNumber).innerHTML='<h6>'+this.labyrinthAllId[idNumber]+'</h6>';
                idNumber++;
            }
        }
    }

    mapUpload = () => {
        for (var y=0; y<this.labyrinthData.length; y++) {
            this.labyrinthData[y] = new Array(this.labyrinthColumns);
        }
        let idInsert=[];
        for (var y=0; y < this.labyrinthRows; y++) {
            for (var x=0; x < this.labyrinthColumns; x++) {
                let random=Math.floor(Math.random()*100);
                let data;
                if(random < 80) {
                    data='none';
                } else if(random < 85) {
                    data='wall1';
                } else if(random < 90) {
                    data='wall2';
                } else {
                    data='wall3';
                }
                this.labyrinthData[y][x] = data;
                idInsert.push(data);
            }
        }
        this.labyrinthAllId = idInsert;
    }

    mapKeret = () => {
        let keret='wall1';
        for (let n=0; n<this.labyrinthColumns; n++) {
            this.labyrinthAllId[n]=keret;
            this.labyrinthData[0][n]=keret;
        }
        for (let n=0; n<this.labyrinthColumns; n++) {
            this.labyrinthAllId[(this.labyrinthLonght-n)]=keret;
            this.labyrinthData[this.labyrinthRows-1][n]=keret;
        }
        for (let n=0; n<this.labyrinthRows; n++) {
            this.labyrinthAllId[(n*this.labyrinthColumns)]=keret;
            this.labyrinthData[n][0]=keret;
        }
        for (let n=0; n<this.labyrinthRows; n++) {
            let Counting = ((n*this.labyrinthColumns)+(this.labyrinthColumns-1));
            this.labyrinthAllId[Counting]=keret;
            this.labyrinthData[n][this.labyrinthColumns-1]=keret;
        }
    }
}

class LiveSoul {
    LiveSoulName;
    LiveSoulId;
    column;
    row;
    animNumberMax;
    animNumberValue;
    animSwitch;
    slidingAll;
    slidingWay;
    slidingWayNumber;
    brainMode;
    brainSwitch;
    on;
    explosive;
    stepId;
    constructor(LiveSoulName, animNumberMax, brainMode) {
        this.LiveSoulName=LiveSoulName;
        this.animNumberMax=animNumberMax;
        this.brainMode=brainMode;
        this.animNumberValue=0;
        this.animSwitch=false;
        this.slidingAll=0;
        this.slidingwayNumber=0;
        this.brainSwitch=false;
        this.on=true;
        this.explosive=false;
    }
    liveSoulPozitionMod = (id, divValue) => {
        let idCounting=0;
        for (var y=0; y < map.labyrinthRows; y++) {
            for (var x=0; x < map.labyrinthColumns; x++) {
                if (idCounting==id) {
                    this.row=y; // beírás
                    this.column=x;  // beírás
                    map.labyrinthData[y][x]=divValue;   //beír
                    map.labyrinthAllId[idCounting]=divValue;    //beír
                    divDraw(idCounting, divValue);
                }
                idCounting++;
            }
        }
    }
    repeatSee = async () => {
        if (this.animSwitch==true) {
            this.animNumberValue++;
            let sliding = (map.gridContainerDivLength/this.animNumberMax);
            this.slidingAll = this.slidingAll+sliding;
            if(this.slidingWay=='left') {
                document.getElementById(this.LiveSoulId).style.left='-'+this.slidingAll+'px';
            }
            if(this.slidingWay=='right') {
                document.getElementById(this.LiveSoulId).style.left=this.slidingAll+'px';
            }
            if(this.slidingWay=='up') {
                document.getElementById(this.LiveSoulId).style.top='-'+this.slidingAll+'px';
            }
            if(this.slidingWay=='down') {
                document.getElementById(this.LiveSoulId).style.top=+this.slidingAll+'px';
            }
            if (this.animNumberValue==this.animNumberMax) {     /* move anim end */
                let newLiveSoulId=(this.LiveSoulId + this.slidingWayNumber);

                for (let n=0; n<map.farmerInGame.length; n++) {
                        if (map.farmerInGame[n].explosive==true) {
                            map.farmerInGame[n].explosive=false;
                            map.farmerInGame[n].on=false;       // FARMER off
                            this.liveSoulPozitionMod(this.LiveSoulId, gameObjects[0]); //
                            this.liveSoulPozitionMod(newLiveSoulId, gameObjects[0]); //
                        }        
                }            
                document.getElementById(this.LiveSoulId).style.left='0px';
                document.getElementById(this.LiveSoulId).style.top='0px';
                
                this.liveSoulPozitionMod(this.LiveSoulId, gameObjects[0]); //
                this.liveSoulPozitionMod(newLiveSoulId, this.LiveSoulName); //
                this.LiveSoulId=newLiveSoulId;
                this.animNumberValue=0;
                this.slidingAll=0;
                this.animSwitch=false;
                if (gameMenu.nextLevel==true && this.LiveSoulName==gameObjects[6]) {
                    await sleep(200);
                    gameMenu.nextLevel=false;
                    map.level=map.level+1;
                    gameMenu.outSwitch=false;
                    gameMenu.popUpWindow('Level '+map.level, 'popUp', 'nextLevel');
                }
            }
        }
    }
    liveSoulMove=(slidingWay, add)=>{   // Move
        this.slidingWay=slidingWay;
        this.slidingWayNumber=add;
        // Rabbit
        if (this.LiveSoulName=='rabbit') {
            // Hole    
            if ((map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[5]) && carrot.pickedUp==true) {
                let audio = document.getElementById('bell'); audio.play();
                this.animSwitch=true;
                this.animNumberValue=0;
                this.slidingAll=0;
                gameMenu.nextLevel=true;
            }
            // Carrot pickup
            if (map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[9]) {
                let audio = document.getElementById('eat'); audio.play();
                this.animSwitch=true;
                this.animNumberValue=0;
                this.slidingAll=0;
                carrot.objectPickUp++;
                carrot.pointsDraw();
                if (carrot.objectPickUp==carrot.objectPiece) {     
                    // NEXT LEVEL !!!
                    carrot.pickedUp=true;
                    divDraw(hole.objectId, hole.objectName);
                    let audio = document.getElementById('bell2'); audio.play();
                }
            }
            // Bomb pickup
            if (map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[4]) {
                let audio = document.getElementById('pickup'); audio.play();
                this.animSwitch=true;
                this.animNumberValue=0;
                this.slidingAll=0;
                bomb.objectPiece++;
                bomb.bombDraw();
            }
            // life pickup
            if (map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[17]) {
                let audio = document.getElementById('eat'); audio.play();
                this.animSwitch=true;
                this.animNumberValue=0;
                this.slidingAll=0;
                energyThings(10);
            }

            // Key pickup 
            if (map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[12] || 
                map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[14] ||
                map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[16]
                ) {
                let audio = document.getElementById('bell'); audio.play();
                this.animSwitch=true;
                this.animNumberValue=0;
                this.slidingAll=0;
                if (map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[12]) { key1.have=true; }
                if (map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[14]) { key2.have=true; }
                if (map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[16]) { key3.have=true; }
            }
            // Wallk1 open 
            if (map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[11]) {
                if (key1.have==true) { key1.have=false; this.keyPicup(); } else { this.noKeyPicupSound(); }
            }
            // Wallk2 open
            if (map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[13]) {
                if (key2.have==true) { key2.have=false; this.keyPicup(); } else { this.noKeyPicupSound(); }
            }
            // Wallk3 open 
            if (map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[15]) {
                if (key3.have==true) { key3.have=false; this.keyPicup(); } else { this.noKeyPicupSound(); }
            }
        }
        // empty sector
        if (map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[0]) {
            map.labyrinthAllId[this.LiveSoulId+add]=this.LiveSoulName;
            this.stepId=this.LiveSoulId; 
            this.stepIdAdd=this.LiveSoulId+add;

            this.animSwitch=true;
            this.animNumberValue=0;
            this.slidingAll=0;
        } else {
            if (this.LiveSoulName=='rabbit') {
                let audio = document.getElementById('puff'); audio.play();
            }
            this.brainSwitch=false; // Brain iq 1 switch
        }
        if (this.LiveSoulName!=gameObjects[6] && map.labyrinthAllId[this.LiveSoulId+add]==gameObjects[6]) {   
            // ENERGY
            energyThings(-20);
        }
    }
    keyPicup = () => {
        let audio = document.getElementById('bell2'); audio.play();
        this.animSwitch=true; this.animNumberValue=0; this.slidingAll=0;
    }
    noKeyPicupSound = () => { let audio = document.getElementById('key'); audio.play(); }

    iqRandom = () => {
        let random = Math.floor(Math.random() * 4)+1;
        if (random==1) { return 'up';} if (random==2) { return 'down';}
        if (random==3) { return 'left';} if (random==4) { return 'right';}
    }
    brain = () => {
        let iq;
        if (this.brainMode==0) {
            iq=this.iqRandom();
        }

        if (this.brainMode==1) { 
            if (this.brainSwitch==false) { iq=this.iqRandom(); this.brainSwitch=true; } 
            else { iq=this.slidingWay }
        }

        if (this.animSwitch==false) {
            if (iq=='up') { 
                let felNumber = parseInt('-'+map.labyrinthColumns);
                this.liveSoulMove('up', felNumber);
            }
            if (iq=='down') { 
                let downNumber = parseInt(+map.labyrinthColumns);
                this.liveSoulMove('down', downNumber);
            }
            if (iq=='left') { 
                let leftNumber = -1;
                this.liveSoulMove('left', leftNumber);
            }
            if (iq=='right') { 
                let rightNumber = 1;
                this.liveSoulMove('right', rightNumber);
            }
        }
    }
    liveSoulInsert=()=>{
        let emptyBox=true;
        do {
            let randomRow=Math.floor(Math.random()*(map.labyrinthRows-2)+1);
            let randomColumn=Math.floor(Math.random()*(map.labyrinthColumns-2)+1);
            if (map.labyrinthData[randomRow][randomColumn]==gameObjects[0]) {
                map.labyrinthData[randomRow][randomColumn]=this.LiveSoulName;
                this.row=randomRow;
                this.column=randomColumn;
                this.LiveSoulId=getAllIdNumber(randomRow, randomColumn, this.LiveSoulName);
                emptyBox=false;
            }
        } while (emptyBox);
    }
    livesDraw=()=>{
        let livesInsert = '';
        for (let readLives=0; readLives<this.lives; readLives++) {
            livesInsert +='<img class="livebox" src="img2/rabbit.svg">';
        }
        liveboxs.innerHTML=livesInsert;
    }
}

class Objects {
    objectName
    objectId;
    objectPiece;
    objectPickUp;
    row;
    column;
    animNumberMax;
    animNumberValue;
    animSwitch;
    constructor (objectName, objectPiece) {
        this.objectName=objectName;
        this.objectPiece=objectPiece;
        this.objectPickUp=0;
    }
    objectInsert=()=>{
        let emptyBox;
        for (let darab=0; darab<this.objectPiece; darab++) {
            emptyBox=true;
            do {
                let randomRow=Math.floor(Math.random()*(map.labyrinthRows-2)+1);
                let randomColumn=Math.floor(Math.random()*(map.labyrinthColumns-2)+1);
                if (map.labyrinthData[randomRow][randomColumn]==gameObjects[0]) {
                    map.labyrinthData[randomRow][randomColumn]=this.objectName;
                    this.row=randomRow;
                    this.column=randomColumn;
                    this.objectId=getAllIdNumber(randomRow, randomColumn, this.objectName);
                    emptyBox=false;
                }
            } while (emptyBox);
        }
    }

    oneInsert=()=>{
        let emptyBox=true;
        do {
            let randomRow=Math.floor(Math.random()*(map.labyrinthRows-2)+1);
            let randomColumn=Math.floor(Math.random()*(map.labyrinthColumns-2)+1);
            if (map.labyrinthData[randomRow][randomColumn]==gameObjects[0]) {
                map.labyrinthData[randomRow][randomColumn]=this.objectName;
                this.row=randomRow;
                this.column=randomColumn;
                this.objectId=getAllIdNumber(randomRow, randomColumn, this.objectName);
                emptyBox=false;
            }
        } while (emptyBox);
    }

    pointsDraw=()=>{
        let divSelect;
        divSelect='#'; divSelect += this.objectName; divSelect += 'infotext';
        document.querySelector(divSelect).innerHTML='<span class="ht">'+this.objectPickUp+'/'+this.objectPiece+'</span>';
    }
    bombDraw=()=>{
        let divSelect;
        divSelect='#'; divSelect += this.objectName; divSelect += 'infotext';
        document.querySelector(divSelect).innerHTML='<span class="ht">'+this.objectPiece+'</span>';
    }
}

class Explosive {
    exploiseName;
    exploiseId;
    row;
    column;
    explosiveCordinates;
    noExplosiveObjects;
    animNumberMax;
    animNumberValue;
    animSwitch;
    constructor(exploiseName, animNumberMax){
        this.exploiseName=exploiseName;
        this.animNumberMax=animNumberMax;
        this.animSwitch=false;
        this.animNumberValue=0;
        this.noExplosiveObjects= ['carrot', 'bomb', 'hole', 'key', 'wallk'];
    }
    repeatSee = () => {
        if (this.animSwitch==true) {
            this.animNumberValue++;
            this.explosiveCordinates = [
                { "row": this.row-1, "column": this.column, "id": this.exploiseId-map.labyrinthColumns },
                { "row": this.row+1, "column": this.column, "id": this.exploiseId+map.labyrinthColumns },
                { "row": this.row, "column": this.column-1, "id": this.exploiseId-1 },
                { "row": this.row, "column": this.column+1, "id": this.exploiseId+1 },
            ];
            for(let boomS of this.explosiveCordinates) {
                if (boomS.row>0 && boomS.row<map.labyrinthRows-1 && boomS.column>0 && boomS.column<map.labyrinthColumns-1) {
                    if (map.labyrinthAllId[boomS.id]==gameObjects[1] ||
                        map.labyrinthAllId[boomS.id]==gameObjects[11] ||
                        map.labyrinthAllId[boomS.id]==gameObjects[13] ||
                        map.labyrinthAllId[boomS.id]==gameObjects[15] ) 
                    {
                    } else {
                        document.getElementById(boomS.id).style.backgroundImage="url('img2/explosion.svg')";
                            
                        /*  Farmers explosive  */
                        for (let n=0; n<map.farmerInGame.length; n++) {
                            if (map.labyrinthAllId[boomS.id]==map.farmerInGame[n].LiveSoulName) {
                                if (map.farmerInGame[n].LiveSoulId == boomS.id) {
                                    map.farmerInGame[n].explosive=true;
                                    map.farmerInGame[n].on=false;
                                    map.farmerInGame[n].liveSoulPozitionMod(map.farmerInGame[n].stepId, gameObjects[0]);
                                    document.getElementById(map.farmerInGame[n].stepId).style.left='0px';
                                    document.getElementById(map.farmerInGame[n].stepId).style.top='0px';
                                    map.farmerInGame[n].liveSoulPozitionMod(map.farmerInGame[n].stepId, gameObjects[0]);
                                    document.getElementById(map.farmerInGame[n].stepIdAdd).style.left='0px';
                                    document.getElementById(map.farmerInGame[n].stepIdAdd).style.top='0px';
                                    map.farmerInGame[n].liveSoulPozitionMod(map.farmerInGame[n].stepIdAdd, gameObjects[0]);
                                }
                            }
                        }

                    }
                }
            }

            if (this.animNumberValue==this.animNumberMax) { // Boom end
                for(let boomS of this.explosiveCordinates) {
                    if (boomS.row>0 && boomS.row<map.labyrinthRows-1 && boomS.column>0 && boomS.column<map.labyrinthColumns-1) {
                        if (map.labyrinthAllId[boomS.id]!='carrot' && map.labyrinthAllId[boomS.id]!='bomb' && map.labyrinthAllId[boomS.id]!='hole' && map.labyrinthAllId[boomS.id]!='wall1' && map.labyrinthAllId[boomS.id]!='wallk1' && map.labyrinthAllId[boomS.id]!='key1' && map.labyrinthAllId[boomS.id]!='wallk2' && map.labyrinthAllId[boomS.id]!='key2' && map.labyrinthAllId[boomS.id]!='wallk3' && map.labyrinthAllId[boomS.id]!='key3') {
                            
                            map.labyrinthData[boomS.row][boomS.column]=gameObjects[0];
                            map.labyrinthAllId[boomS.id]=gameObjects[0];
                            
                            document.getElementById(boomS.id).style.backgroundImage="none";
                            bomb.bombDraw();
                        }
                        divDraw(boomS.id, map.labyrinthAllId[boomS.id]);
                    }
                }
                this.animSwitch=false;
                bomb.objectPiece--;
                bomb.bombDraw();
                this.animNumberValue=0;
            }
        }
    }
}

getAllIdNumber=(randomRow,randomColumn,name)=>{
    let idCounting=0;
    let returnId;
    for (let y=0; y < map.labyrinthRows; y++) {
        for (let x=0; x < map.labyrinthColumns; x++) {
            if (y==randomRow && x==randomColumn) {
                returnId=idCounting;
                map.labyrinthAllId[idCounting]=name;
            }
            idCounting++;
        }
    }
    return returnId;
}
    const gameMenu=new GameMenuObj;

    let switchOut=true;
    let mapY;
    let mapX;

    do { mapY=Math.floor(Math.random() * 25); if ( mapY>14 ) { switchOut=false; } } while (switchOut);
    switchOut=true;
    do { mapX=Math.floor(Math.random() * 25); if ( mapX>14 ) { switchOut=false; } } while (switchOut);

    const map = new GameMap(mapY,mapX);
    map.mapReset();
    map.mapUpload();
    map.mapKeret();
    
    const rabbit = new LiveSoul('rabbit', 10);
    rabbit.liveSoulInsert();
    rabbit.energy=100;
    rabbit.lives=3;

    for (let n=0; n<map.farmers.length; n++) {
        map.farmerInGame[n] = new LiveSoul(map.farmers[n].LiveSoulName, map.farmers[n].animNumberMax, map.farmers[n].brainMode);
        map.farmerInGame[n].liveSoulInsert();
    }

    const carrot = new Objects('carrot', 3);
    carrot.objectInsert();
    carrot.pickedUp=false;
    
    const life = new Objects('life', 5);
    life.objectInsert();

    const bomb = new Objects('bomb', 8);
    bomb.objectInsert();
    
    const hole = new Objects('hole', 1);
    hole.objectInsert();
    
    const key1 = new Objects('key1');
    key1.oneInsert(); key1.have=false;
    
    const key2 = new Objects('key2');
    key2.oneInsert(); key2.have=false;
    const key3 = new Objects('key3');
    key3.oneInsert(); key3.have=false;
    
    const wallk1 = new Objects('wallk1');
    wallk1.oneInsert();
    
    const wallk2 = new Objects('wallk2');
    wallk2.oneInsert();
    const wallk3 = new Objects('wallk3');
    wallk3.oneInsert();
    
    const boom = new Explosive('boom1',10); // 50