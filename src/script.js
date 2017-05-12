


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

    // var figureLetterT = {
    //     relativeCoordinates: [
    //         {x: 0, y: 0},
    //         {x: 1, y: 0},
    //         {x: -1, y: 0},
    //         {x: 0, y: -1}
    //     ]
    //
    // };


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

            for (var i = -4; i < 20; i++) {
                arr[i] = [];
                for (var j = 0; j < 10; j++) {
                    arr[i][j] = 0;
                }
            }
            return arr;
        }

        initialaseArrField(arrField);

        this.setField = function (newField) {
            arrField = newField;
        };

        this.getField = function () {
            return arrField;
        };



        this.addFigureToField = function (figure) {

            // console.log('field_Before');
            // console.log(arrField.slice());
            //
            // console.log('figure_Before');
            // console.log(figure.slice());


            for (var i = 0; i < figure.length; i++) {

                var coordinateAddFigX =  figure[i].x;
                var  coordinateAddFigY = figure[i].y;

                arrField[coordinateAddFigY][coordinateAddFigX] = 1;

            }
            //
            // console.log('field_After');
            // console.log(arrField);

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

                    // else{
                    //     counterOfFill = false;
                    //
                    // }

                }

                // if(!(arrField[i][9] == 1 && counterOfFill == true)){
                //     rowsThatFill.push(arrField[i]);
                // }
            }

            for(var l = 0; l < arrField.length-counterOfFill; l++){
                rowsThatFill.unshift(clearRow);
            }

            for(var k = -4; k < 0; k++){
                rowsThatFill[k] = clearRow;
                    }

            arrField = rowsThatFill;
            // console.log(rowsThatFill);
            // return rowsThatFill;
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
                    coordinateY = -1;

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

        this.gameIsOver  = function (arrField) {

            for(var i=0; i < arrField[0].length; i++ ){

                if(arrField[0][i] == 1){
                    return true ;
                }
            }

            return false;
        };




        this.moveCheck = function (figureCoordinates, field) {

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

        var paper  = Raphael(20, 20, 350, 700);


        this.drawField  = function (figure, tetrisField) {


            paper.clear();

            var withAndHeightQuad = 35;

            for (var i = 0; i < tetrisField.length; i++) {
                for (var j = 0; j < tetrisField[i].length; j++) {

                    var coordinateX = withAndHeightQuad*j;
                    var coordinateY = withAndHeightQuad*i;

                    if(tetrisField[i][j] !== 0){

                        paper.rect(coordinateX, coordinateY, 35, 35 );

                    }

                }
            }

            for(var vetrical = 0; vetrical < 11; vetrical++){

                var vertInterval =  vetrical*withAndHeightQuad;
                paper.path( ["M", vertInterval, 0, "L", vertInterval, 700 ] );

            }

            for(var horizontal = 0; horizontal < 25; horizontal++){

                var horizInterval =  horizontal*withAndHeightQuad;
                paper.path( ["M", 0, horizInterval, "L", 350, horizInterval ] );

            }



            for (var k = 0; k < figure.length; k++) {

                var figureXCoordinate = withAndHeightQuad*figure[k].x;
                var figureYCoordinate = withAndHeightQuad*figure[k].y;

                paper.rect(figureXCoordinate, figureYCoordinate, 35, 35 );

            }

        }

    }







    startGame();


    function startGame(){

        var engine = new TetrisEngine();
        var generator = new FigureGenerator();
        var gameField  = new Field();
        var currentFigure;

        //
        // var  figures = [
        //     figureCube
        // ];


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

        var speed = 250;
        var makeNewFigure = true;
        var movFig = setInterval( gameCycle, speed);


        $(document).keydown(function(e) {
            switch (e.which) {
                case 37:
                    currentFigure.moveLeft();

                    var futureFigureLeft = currentFigure.getFutureCoordinates();
                    var fieldLeft = gameField.getField();


                    if(engine.moveCheck(futureFigureLeft, fieldLeft)){
                        currentFigure.saveToCurrentCoordinates();
                    }


                    var figureMoveLeft = currentFigure.getCurrentCoordinates();
                    var fieldLeftWithFigure = gameField.getField();

                    engine.drawField(figureMoveLeft, fieldLeftWithFigure);
                    break;

                case 39:
                    currentFigure.moveRight();

                    var futureFigure = currentFigure.getFutureCoordinates();
                    var field = gameField.getField();


                    if(engine.moveCheck(futureFigure,field)){
                        currentFigure.saveToCurrentCoordinates();
                    }


                    var figureMoveRight = currentFigure.getCurrentCoordinates();
                    var fieldRight = gameField.getField();


                    engine.drawField(figureMoveRight, fieldRight);
                    break;

                case 32:
                    currentFigure.rotate();

                    var futureFigureRotation = currentFigure.getFutureCoordinates();
                    var fieldRotation = gameField.getField();


                    if(engine.moveCheck(futureFigureRotation,fieldRotation)){
                        currentFigure.saveToCurrentCoordinates();
                    }


                    var figureMoveRotate = currentFigure.getCurrentCoordinates();
                    var fieldRotate = gameField.getField();


                    engine.drawField(figureMoveRotate, fieldRotate);


                    break;

            }
        });


        function gameCycle() {


            if(makeNewFigure){
                var figure = generator.getFigure();
                currentFigure = new Figure(figure);

            }


            currentFigure.moveDown();


            var futureFigure = currentFigure.getFutureCoordinates();
            var field = gameField.getField();


            if(engine.moveCheck(futureFigure,field)){

                makeNewFigure = false;

                currentFigure.saveToCurrentCoordinates();
                engine.drawField(futureFigure, field);

            }else{
                makeNewFigure = true;

                var addFigure = currentFigure.getCurrentCoordinates();
                gameField.addFigureToField(addFigure);
                gameField.removeFilledRows();


                var fieldForCheck = gameField.getField();
                var isGameOver = engine.gameIsOver(fieldForCheck);

                if(isGameOver){
                    clearInterval(movFig);
                    console.log(' game over ');
                }
            }

            console.log('its work');


        }

    }















}




