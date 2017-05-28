

window.onload = function () {


    var figureZ = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: -1, y: -1}
        ]
    };


    var figureS = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: -1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1}
        ]
    };


    var figureCube = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1}
        ]
    };

    var figureT = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: -1}
        ]
    };



    var figureI = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: -1, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0}
        ]
    };


    var figureJ = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: -1, y: -1}
        ]
    };

    var figureL = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: -1, y: 0},
            {x: 1, y: 0},
            {x: 1, y: -1}
        ]
    };




    function FigureGenerator() {


        var figureCollection = [];

        var randomInteger = function (min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        };


        this.getFigure = function () {
            var randomFigureNumber = randomInteger(0, figureCollection.length-1);
            return figureCollection[randomFigureNumber];
        };

        this.addFigureToCollection = function(figures){

            figureCollection.push.apply(figureCollection, figures);
        }

    }



    function Field() {


        var  arrField = [];

        function initialaseArrField(arr) {

            for (var i = 0; i < 24; i++) {
                arr[i] = [];
                for (var j = 0; j < 10; j++) {
                    arr[i][j] = 0;
                }
            }
            return arr;
        }

        initialaseArrField(arrField);



        this.getField = function () {
            return arrField;
        };



        this.addFigureToField = function (figure) {


            for (var i = 0; i < figure.length; i++) {

                var coordinateAddFigX =  figure[i].x;
                var  coordinateAddFigY = figure[i].y;

                arrField[coordinateAddFigY][coordinateAddFigX] = 1;
            }

        };


        this.removeFilledRows = function () {

            var rowsThatFill = [];
            var counterOfFill = 0;
            var clearRow = [0,0,0,0,0,0,0,0,0,0];


            for (var i = 0; i < arrField.length; i++) {
                for (var j = 0; j < arrField[0].length; j++) {

                    if(arrField[i][j] == 0 ){
                        counterOfFill++;
                        rowsThatFill.push(arrField[i]);
                        break
                    }
                }
            }


            for(var l = 0; l < arrField.length-counterOfFill; l++){
                rowsThatFill.unshift(clearRow);
            }

            arrField = rowsThatFill;

        };


    }



    function Figure(createFigure) {


        var futureCoordinates = [

            {x: null, y: null},
            {x: null, y: null},
            {x: null, y: null},
            {x: null, y: null}
        ];


        var currentCoordinates = [

            {x: null, y: null},
            {x: null, y: null},
            {x: null, y: null},
            {x: null, y: null}
        ];


        function addFigureToModel(figure) {

            for (var i = 0; i < figure.relativeCoordinates.length; i++) {

                var coordinateX = 4,
                    coordinateY = 1;

                currentCoordinates[i].x = coordinateX + figure.relativeCoordinates[i].x;
                currentCoordinates[i].y = coordinateY + figure.relativeCoordinates[i].y;
            }
        }


        addFigureToModel(createFigure);



        this.getCurrentCoordinates = function () {
            return currentCoordinates
        };


        this.getFutureCoordinates  = function () {
            return futureCoordinates;
        };


        this.rotate = function () {

            var absoluteCoordinates = [

                {x: null, y: null},
                {x: null, y: null},
                {x: null, y: null},
                {x: null, y: null}
            ];


            for (var i = 0; i < currentCoordinates.length; i++) {

                var x = currentCoordinates[i].x;
                var y = currentCoordinates[i].y;

                absoluteCoordinates[i].x = x - currentCoordinates[0].x;
                absoluteCoordinates[i].y  = y - currentCoordinates[0].y;
            }


            for (var k = 0; k < absoluteCoordinates.length; k++) {

                var absoluteX =  absoluteCoordinates[k].y*1+currentCoordinates[0].x;
                var absoluteY =  absoluteCoordinates[k].x*(-1)+currentCoordinates[0].y;

                futureCoordinates[k].x = absoluteX;
                futureCoordinates[k].y = absoluteY;
            }
        };



        this.saveToCurrentCoordinates = function() {

            for (var k = 0; k < futureCoordinates.length; k++) {

                currentCoordinates[k].x = futureCoordinates[k].x;
                currentCoordinates[k].y = futureCoordinates[k].y;
            }
        };



        this.move = function (vector) {

            var increaseX = vector.x;
            var increaseY = vector.y;

            for (var i = 0; i < currentCoordinates.length; i++) {

                var x = currentCoordinates[i].x;
                var y = currentCoordinates[i].y;

                futureCoordinates[i].x = increaseX + x;
                futureCoordinates[i].y = increaseY + y;
            }
        };


        var VECTOR_DOWN = {
            x: 0,
            y: 1
        };

        var VECTOR_LEFT = {
            x: -1,
            y: 0
        };

        var VECTOR_RIGHT = {
            x: 1,
            y: 0
        };


        this.moveLeft = function () {
            this.move(VECTOR_LEFT);
        };


        this.moveRight = function () {
            this.move(VECTOR_RIGHT);
        };


        this.moveDown = function () {
            this.move(VECTOR_DOWN);
        };

    }




    function TetrisEngine() {

        this.currentFigure = {};

        this.gameField = {};

        this.renderer = {};

        var  setIntervalID;

        this.setRenderer = function (newRenderer) {
            this.renderer = newRenderer;
        };

        this.setFigure = function (newFigure) {
            this.currentFigure = newFigure;
        };

        this.setField = function (newField) {
            this.gameField = newField;
        };

        var moveDownCycle;

        this.setMoveDownCycle = function (callBack) {
            moveDownCycle = callBack;
        };

        this.moveDownNormalSpeed = function () {

            this.interruptInterval();

            var speed = 250;
            setIntervalID = setInterval( moveDownCycle, speed);

        };

        this.moveDownHighSpeed = function () {
            this.interruptInterval();
            var speed = 100;
            setIntervalID = setInterval( moveDownCycle, speed);


        };

        this.interruptInterval = function () {
            clearInterval( setIntervalID);
        };


        this.gameIsOver  = function () {

            var arrField = this.gameField.getField();

            for(var i=0; i < arrField[0].length; i++ ){

                if(arrField[0][i] == 1){
                    return true ;
                }
            }

            return false;
        };


        this.moveCheck = function () {

            var figureCoordinates = this.currentFigure.getFutureCoordinates();
            var field = this.gameField.getField();


            var minCoordinateX = 0;
            var maxCoordinateX = field[0].length;
            var maxCoordinateY = field.length;

            var counter;

            for(var j = 0; j < figureCoordinates.length; j++ ){

                var coordinateX = figureCoordinates[j].x;
                var coordinateY = figureCoordinates[j].y;

                if( coordinateY < maxCoordinateY &&
                    coordinateX < maxCoordinateX &&
                    coordinateX >= minCoordinateX &&
                    field[coordinateY][coordinateX] == 0 ){

                    counter = true;

                }else{
                    return false

                }
            }

            return counter

        };


        this.saveAndRender = function () {

            if(this.moveCheck()){
                this.currentFigure.saveToCurrentCoordinates();
            }

            var figure = this.currentFigure.getCurrentCoordinates();
            var tetrisField = this.gameField.getField();

            this.renderer.drawField(figure, tetrisField);
        };


        this.moveFigureLeft = function () {
            this.currentFigure.moveLeft();
            this.saveAndRender();
        };

        this.moveFigureRight = function () {
            this.currentFigure.moveRight();
            this.saveAndRender();
        };

        this.figureRotate = function () {
            this.currentFigure.rotate();
            this.saveAndRender();
        };


    }



    function Renderer() {

        var divClass = $('.center-div');
        var paperNextFigure  = new Raphael(divClass.get(0),315, 175);
        $(paperNextFigure.canvas).attr('id', 'preview');



        this.drawNextFigure = function (figure) {
            paperNextFigure.clear();
            var withAndHeightQuad = 35;

            for (var k = 0; k < figure.relativeCoordinates.length; k++) {

                var figureXCoordinate = withAndHeightQuad*(figure.relativeCoordinates[k].x+4);
                var figureYCoordinate = withAndHeightQuad*(figure.relativeCoordinates[k].y+3);

                paperNextFigure.rect(figureXCoordinate, figureYCoordinate, 35, 35 );

            }

        };


        var paper  = new Raphael(divClass.get(0),350, 700);
        $(paper.canvas).attr('id', 'field');


        function drawLines() {

            var withAndHeightQuad = 35;

            for(var vetrical = 0; vetrical < 11; vetrical++){

                var vertInterval =  vetrical*withAndHeightQuad;
                paper.path( ["M", vertInterval, 0, "L", vertInterval, 700 ] );

            }

            for(var horizontal = 0; horizontal < 25; horizontal++){

                var horizInterval =  horizontal*withAndHeightQuad;
                 paper.path( ["M", 0, horizInterval, "L", 350, horizInterval ] );

            }



        }
        drawLines();


        this.drawField  = function (figure, tetrisField){


            paper.clear();

            var heightOffset = 140;
            var withAndHeightQuad = 35;

            for (var i = 0; i < tetrisField.length; i++) {
                for (var j = 0; j < tetrisField[i].length; j++) {

                    var coordinateX = withAndHeightQuad*j;
                    var coordinateY = withAndHeightQuad*i;

                    if(tetrisField[i][j] == 1){

                        paper.rect(coordinateX, coordinateY-heightOffset, 35, 35 );

                    }

                }
            }

            drawLines();


            for (var k = 0; k < figure.length; k++) {

                var figureXCoordinate = withAndHeightQuad*figure[k].x;
                var figureYCoordinate = withAndHeightQuad*figure[k].y;

                paper.rect(figureXCoordinate, figureYCoordinate-heightOffset, 35, 35 );


            }

        }
    }



    function keyHandler(currentFigure) {

        var togglePause = true;
        var toggleAcceleration = true;

        $(document).keydown(function(e) {
            switch (e.which) {

                case 37 :
                    if(togglePause){
                        currentFigure.moveFigureLeft();
                    }
                    break;

                case 39 :
                    if(togglePause){
                        currentFigure.moveFigureRight();
                    }
                    break;

                case 32 :
                    if(togglePause){
                        currentFigure.figureRotate();
                    }
                    break;

                case 40:
                    if(toggleAcceleration){
                        currentFigure.moveDownHighSpeed();
                        toggleAcceleration  = false;
                    }
                    break;

                case 80:
                    if(togglePause){
                        currentFigure.interruptInterval();
                        togglePause = false;
                    }else{
                        currentFigure.moveDownNormalSpeed();
                        togglePause = true;
                    }
                    break;
            }
        });


        $(document).keyup(function(e) {
            switch (e.which) {

                case 40:
                    if(!toggleAcceleration){
                        currentFigure.moveDownNormalSpeed();
                        toggleAcceleration  = true;
                    }
                    break;
            }
        });


    }



    function Gamestart() {




        this.drawInclinedLines = function () {


            var splashScreen  = new Raphael($('.center-div').get(0),740, 740);
            $(splashScreen.canvas).attr('id', 'svgMain');

            var withAndHeightQuad = 10;
            var a = 0;

            for (var vetrical = 1; vetrical < 149; vetrical++) {

                var vertInterval = vetrical * withAndHeightQuad;

                if(vetrical > 74){
                    a = a +10;
                    vertInterval = 740;
                }

                splashScreen.path(["M",  vertInterval, a , "L", a, vertInterval]);


            }
        }

        }

        function startScreen() {

            var majorScreen = new Gamestart();
            majorScreen.drawInclinedLines();


        }





    startScreen();


    $(document).one('click', function () {

        initGame();

    });



    function initGame(){

        $( "#logo" ).removeClass( "logoStartScreen" ).addClass( "logo" );

        var makeNewFigure = true;
        var currentFigure;
        var nextFigure;


        var generator = new FigureGenerator();
        var gameField = new Field();
        var renderer = new Renderer();

        var engine = new TetrisEngine();

        engine.setField(gameField);
        engine.setRenderer(renderer);


        var  figures = [
            figureL,
            figureCube,
            figureI,
            figureT,
            figureJ,
            figureS,
            figureZ
        ];


        generator.addFigureToCollection(figures);
        nextFigure = generator.getFigure();

        engine.setMoveDownCycle(gameCycle);
        engine.moveDownNormalSpeed();

        keyHandler(engine);


        function gameCycle() {

            if(makeNewFigure){

                currentFigure = new Figure(nextFigure);
                nextFigure = generator.getFigure();
                renderer.drawNextFigure(nextFigure);
                engine.setFigure(currentFigure);

            }

            currentFigure.moveDown();

            if(engine.moveCheck()){

                makeNewFigure = false;
                engine.saveAndRender();

            }else{
                makeNewFigure = true;

                var addFigure = currentFigure.getCurrentCoordinates();
                gameField.addFigureToField(addFigure);
                gameField.removeFilledRows();

                if(engine.gameIsOver()){
                    engine.interruptInterval();

                    $(document).off("keydown");
                    $(document).off("keyup");

                    console.log(' game over ');

                }
            }
        }
    }




};




