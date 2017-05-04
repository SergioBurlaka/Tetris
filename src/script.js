

window.onload = function () {

    var figureS = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: -1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1}
        ]
    };

    var figureZ = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: -1, y: -1}
        ]
    };


    var figureJ = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: -1, y: 0},
            {x: 0, y: -1},
            {x: 0, y: -2}
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

    var figureLetterT = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: -1, y: 0}
        ]
    };

    var figureLetterI = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: -2, y: 0}
        ]
    };

    var figureLetterL = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 0, y: -2}
        ]
    };



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

        initialaseArrField( arrField );

        this.setField = function (newField) {
            arrField = newField;
        };

        this.getField = function () {
            return arrField;
        };


    }


    function Figure() {


        var currentFigure;


        // function makeEmptyFigure() {
        //
        //
        //     var tempFigure = {
        //         coordinatesInField: []
        //     };
        //
        //     for (var k = 0; k < 4; k++) {
        //
        //         tempFigure.coordinatesInField[k] = {x: null, y: null};
        //
        //     }
        //
        //     return tempFigure;
        // }
        //
        //
        // makeEmptyFigure();




        this.getSingleFigure = function () {
            return currentFigure;
        };

        this.setFigure = function (figure) {
            currentFigure = figure;
        }


    }




    function TetrisEngine() {

        Figure.call(this);
        Field.call(this);


        var figureCollection = [];


        var randomInteger = function (min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        };


        var figureInjector = function () {
            var randomFigureNumber = randomInteger(0, figureCollection.length-1);
            return figureCollection[randomFigureNumber];
        };


        this.addFigureToCollection = function () {
            figureCollection.push.apply(figureCollection, arguments);
        };




        this.setFigureOnField = function () {

            var figure = figureInjector();
            var currentFigureOnField = {
                coordinatesInField: []
            };


            for (var i = 0; i < figure.relativeCoordinates.length; i++) {

                var coordinateX = 4,
                    coordinateY = -1;

                coordinateX = coordinateX + figure.relativeCoordinates[i].x;
                coordinateY = coordinateY + figure.relativeCoordinates[i].y;

                currentFigureOnField.coordinatesInField[i] = {x: coordinateX, y: coordinateY};

            }


            this.setFigure(currentFigureOnField);

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



        this.move = function (vector) {

            var  futureCoordinates = [];
            var currentFigure = this.getSingleFigure();

            var increaseX = vector.x;
            var increaseY = vector.y;

            for (var i = 0; i < currentFigure.coordinatesInField.length; i++) {

                var x = currentFigure.coordinatesInField[i].x;
                var y = currentFigure.coordinatesInField[i].y;

                futureCoordinates[i] = {x: increaseX + x, y: increaseY + y};

            }

            console.log('///////');
            console.log(futureCoordinates[0]);
            console.log(futureCoordinates[1]);
            console.log(futureCoordinates[2]);
            console.log(futureCoordinates[3]);
            console.log(futureCoordinates[4]);
            console.log('///////');


            return futureCoordinates;

        };


        this.rotate = function () {

            var  futureCoordinates = [];

            var currentFigure = this.getSingleFigure();

            for (var i = 0; i < currentFigure.coordinatesInField.length; i++) {

                var x = currentFigure.coordinatesInField[i].x;
                var y = currentFigure.coordinatesInField[i].y;

                var relativeCoordinatesX = x - currentFigure.coordinatesInField[0].x;
                var relativeCoordinatesY  = y - currentFigure.coordinatesInField[0].y;

                futureCoordinates[i] = {x: relativeCoordinatesX, y: relativeCoordinatesY};

            }

            var prepearForRotation = [];

            for (var j = 0; j < futureCoordinates.length; j++) {

                var rotationCoordinateX = futureCoordinates[j].x - futureCoordinates[2].x;
                var rotationCoordinateY =  futureCoordinates[j].y - futureCoordinates[2].y;

                prepearForRotation[j] = {x: rotationCoordinateX, y: rotationCoordinateY};


            }

            var rotatedCoordinate = [];

            for (var k = 0; k < prepearForRotation.length; k++) {

                var absoluteY =  prepearForRotation[k].x*(-1)+currentFigure.coordinatesInField[2].y;
                var absoluteX =  prepearForRotation[k].y*1+currentFigure.coordinatesInField[2].x;

                rotatedCoordinate[k] = {x: absoluteX, y: absoluteY};

            }


            var resultOfCheck = this.moveCheck(rotatedCoordinate);

            if(resultOfCheck) {

                this.drawField();

            }


        };

        this.addFigureTofield = function () {

            var figureCoordinate = this.getSingleFigure();
            var fieldForAddFigure = this.getField();

            // console.log(fieldForAddFigure);
            // console.log('fieldForAddFigure');
            //

            for (var i = 0; i < figureCoordinate.coordinatesInField.length; i++) {

                var coordinateAddFigX =  figureCoordinate.coordinatesInField[i].x;
                var  coordinateAddFigY = figureCoordinate.coordinatesInField[i].y;

                fieldForAddFigure[coordinateAddFigY][coordinateAddFigX] = 1;

            }


            this.setField(fieldForAddFigure);

            // figureCoordinate = this.makeEmptyFigure();
            //
            // console.log(figureCoordinate);
            // console.log('figureCoordinate');

            // this.setFigure(figureCoordinate);

        };



        this.checkFilledRow = function () {

            var valuesArr = this.getField().slice();
            var removqlIndexes = this.getFilledRow(valuesArr);

            if(removqlIndexes.length){
                this.moveFieldDown(removqlIndexes);
            }

        };


        this.getFilledRow = function (field) {

            var rowsThatFill = [];
            var counterOfFill;

            for (var i = 0; i < field.length; i++) {
                for (var j = 0; j < field[0].length; j++) {

                    if(field[i][j] == 1 ){
                        counterOfFill = true;
                    }else{
                        counterOfFill = false;
                        break
                    }

                }

                if(field[i][9] == 1 && counterOfFill == true){
                    rowsThatFill.push(i);
                }
            }

            return rowsThatFill;
        };



        this.moveFieldDown = function (removqlIndexes) {


            var valuesArr = this.getField().slice();
            var clearRow = [0,0,0,0,0,0,0,0,0,0];

            var iterations = removqlIndexes.length;
            var firstElement = removqlIndexes[0];


            for(var index=0; index < iterations ; index++){

                var firstPartArr = valuesArr.slice(0,firstElement );
                var secondPartArr = valuesArr.slice( firstElement+1);


                var finalArray = firstPartArr.concat(secondPartArr);

                removqlIndexes  = this.getFilledRow(finalArray);

                firstElement = removqlIndexes[0];

                valuesArr = finalArray;


            }


            for(var i = 0; i < iterations; i++){
                valuesArr.unshift(clearRow);
            }

            for(var k = -4; k < 0; k++){
                valuesArr[k] = clearRow;
            }


            this.setField(valuesArr);

        };



        this.gameIsOver = function(){

            var figureForCheck  = tetrisEngine.moveDown();
            var hasNoCollision = tetrisEngine.moveCheck(figureForCheck);

            var field = this.getField();

            return !hasNoCollision || !!field[0][4];

        };



        this.moveLeft = function () {

            var coordinateFigure  = this.move(VECTOR_LEFT);
            var resultOfCheck = this.moveCheck(coordinateFigure);

            if(resultOfCheck){
                this.drawField();
            }

        };



        this.moveRight = function () {

            var coordinateFigure = this.move(VECTOR_RIGHT);
            var resultOfCheck = this.moveCheck(coordinateFigure);

            if(resultOfCheck){
                this.drawField();
            }

        };


        this.moveDown = function () {

            return this.move(VECTOR_DOWN);

        };

        this.makeEmptyFigure = function () {

            var figureCoordinate = this.getSingleFigure();

            var tempFigure = {
                coordinatesInField: []
            };

            for (var k = 0; k < figureCoordinate.coordinatesInField.length; k++) {

                tempFigure.coordinatesInField[k] = {x: null, y: null};

            }

            return tempFigure;
        };


         this.saveCoordinatesToFigure = function(checkedFigure) {



            var tempFigure = this.makeEmptyFigure();

            for (var k = 0; k < checkedFigure.length; k++) {

                tempFigure.coordinatesInField[k].x = checkedFigure[k].x;
                tempFigure.coordinatesInField[k].y = checkedFigure[k].y;

            }

             console.log('///saveCoordinatesToFigure////');
             console.log(tempFigure.coordinatesInField[0]);
             console.log(tempFigure.coordinatesInField[1]);
             console.log(tempFigure.coordinatesInField[2]);
             console.log(tempFigure.coordinatesInField[3]);
             console.log(tempFigure.coordinatesInField[4]);
             console.log(tempFigure.coordinatesInField);
             console.log('///////');

            this.setFigure(tempFigure);



        };



        this.moveCheck = function (figureCoordinates) {


            var field = this.getField();

            console.log('////moveCheck///');
            console.log(figureCoordinates[0]);
            console.log(figureCoordinates[1]);
            console.log(figureCoordinates[2]);
            console.log(figureCoordinates[3]);
            console.log(figureCoordinates[4]);
            console.log('///////');

            var minCoordinateX = 0;
            var maxCoordinateX = field[0].length;
            var maxCoordinateY = field.length;

            var counter = true;

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


            this.saveCoordinatesToFigure(figureCoordinates);

            return counter

        };

        var paper  = Raphael(20, 20, 350, 700);



        this.drawField  = function () {

            var figure = this.getSingleFigure();
            var tetrisField = this.getField();


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




            var innerFigureCoordinates = figure.coordinatesInField;

            for (var k = 0; k < innerFigureCoordinates.length; k++) {

                var figureXCoordinate = innerFigureCoordinates[k].x;
                var figureYCoordinate = innerFigureCoordinates[k].y;

                figureXCoordinate = withAndHeightQuad*(figureXCoordinate);
                figureYCoordinate = withAndHeightQuad*(figureYCoordinate);

                paper.rect(figureXCoordinate, figureYCoordinate, 35, 35 );

            }

        }

    }





    function moweFigure() {

        var speed = 300;

        tetrisEngine.setFigureOnField();
        tetrisEngine.drawField();

        var movFig = setInterval( moveFukingDown, speed);





        $(document).keydown(function(e) {
            switch (e.which) {
                case 37:
                    tetrisEngine.moveLeft();
                    break;

                case 39:
                   tetrisEngine.moveRight();
                    break;

                case 32:
                    tetrisEngine.rotate();
                    break;

                case 40:

                    break;

            }
        });

        $(document).keyup(function(e) {
            switch (e.which) {

                case 40:

                    break;

            }
        });



        function moveFukingDown() {

            var figureForCheckh  = tetrisEngine.moveDown();
            var hasNoCollision = tetrisEngine.moveCheck(figureForCheckh);

            if(hasNoCollision){

                tetrisEngine.drawField();

            }else{

                tetrisEngine.addFigureTofield();
                tetrisEngine.checkFilledRow();

                console.log(tetrisEngine.getField());
                console.log('getField') ;

                tetrisEngine.setFigureOnField();

                var gameIsOver = tetrisEngine.gameIsOver();

                if(gameIsOver){
                    clearInterval(movFig);
                    console.log(' game over ');
                    // console.log(' game over ');

                }else{
                    tetrisEngine.drawField();

                }
            }
        }



    };




    var tetrisEngine = new TetrisEngine();


    tetrisEngine.addFigureToCollection(figureLetterL,figureCube,figureLetterI,figureLetterT);
    tetrisEngine.addFigureToCollection(figureJ, figureS, figureZ);


    // tetrisEngine.addFigureToCollection(figureJ);

    // comentaryy napishy

     moweFigure();


    //
    // var valuesArr = ['v0', 'v1', 'v2', 'v3', 'v4', 'v5','v6', 'v7'];
    //
    // console.log(valuesArr);
    //
    // var removqlIndexes = [3];
    //
    //
    // var startArr = [];
    // var tempArr;
    //
    // for(var index=0; index < removqlIndexes.length ; index++){
    //
    //     var firstPartArr = valuesArr.slice(0, removqlIndexes[0]);
    //     console.log(firstPartArr);
    //
    //     var secondPartArr = valuesArr.slice( removqlIndexes[0]+1);
    //     console.log(secondPartArr);
    //
    //
    //
    //     startArr = firstPartArr.concat(secondPartArr);
    //
    // }
    //
    // console.log('result');
    //
    // console.log(startArr);
    //
    // for(var indexShoe = 0 ;  indexShoe< removqlIndexes.length ; indexShoe++){
    //
    //     console.log(valuesArr[removqlIndexes[indexShoe]]);
    // }
    //
    //
    // console.log('****');
    //
    // console.log(valuesArr);
    //
    // console.log('****');



};

