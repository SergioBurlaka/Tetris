

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

    var figureLetterT = {
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


    var figureLetterI = {
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

    var figureLetterL = {
        relativeCoordinates: [
            {x: 0, y: 0},
            {x: -1, y: 0},
            {x: 1, y: 0},
            {x: 1, y: -1}
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

        initialaseArrField(arrField);

        this.setField = function (newField) {
            arrField = newField;
        };

        this.getField = function () {
            return arrField;
        };



        this.addFigureToField = function (figure) {


            for (var i = 0; i < figure.coordinatesInField.length; i++) {

                var coordinateAddFigX =  figure.coordinatesInField[i].x;
                var  coordinateAddFigY = figure.coordinatesInField[i].y;

                arrField[coordinateAddFigY][coordinateAddFigX] = 1;

            }

        };

        this.checkFilledRow = function () {

            var valuesArr = this.getField();
            var removedlIndexes = this.getFilledRow(valuesArr);

            if(removedlIndexes.length){
                this.moveFieldDown(removedlIndexes);
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




    }


    function Figure() {


        var futureCoordinates = {
            coordinatesInField: [
                {x: null, y: null},
                {x: null, y: null},
                {x: null, y: null},
                {x: null, y: null}
            ]
        };


        var currentCoordinates = {
            coordinatesInField: [
                {x: null, y: null},
                {x: null, y: null},
                {x: null, y: null},
                {x: null, y: null}
            ]
        };


        this.getCurrentCoordinates = function () {
            return currentCoordinates
        };

        this.getFutureCoordinates  = function () {
            return futureCoordinates;
        };


        this.addFigureToModel = function (figure) {


            for (var i = 0; i < figure.relativeCoordinates.length; i++) {

                var coordinateX = 4,
                    coordinateY = -1;

                currentCoordinates.coordinatesInField[i].x = coordinateX + figure.relativeCoordinates[i].x;
                currentCoordinates.coordinatesInField[i].y = coordinateY + figure.relativeCoordinates[i].y;

            }

        };




        // this.rotate = function () {
        //
        //
        //     var absoluteCoordinates = [];
        //
        //     for (var i = 0; i < currentCoordinates.coordinatesInField.length; i++) {
        //
        //         var x = currentCoordinates.coordinatesInField[i].x;
        //         var y = currentCoordinates.coordinatesInField[i].y;
        //
        //         var relativeCoordinatesX = x - currentCoordinates.coordinatesInField[0].x;
        //         var relativeCoordinatesY  = y - currentCoordinates.coordinatesInField[0].y;
        //
        //         absoluteCoordinates[i] = {x: relativeCoordinatesX, y: relativeCoordinatesY};
        //
        //     }
        //
        //     var prepearForRotation = [];
        //
        //     for (var j = 0; j < absoluteCoordinates.length; j++) {
        //
        //         var rotationCoordinateX = absoluteCoordinates[j].x - absoluteCoordinates[2].x;
        //         var rotationCoordinateY =  absoluteCoordinates[j].y - absoluteCoordinates[2].y;
        //
        //         prepearForRotation[j] = {x: rotationCoordinateX, y: rotationCoordinateY};
        //
        //
        //     }
        //
        //     var rotatedCoordinate = [];
        //
        //     for (var k = 0; k < prepearForRotation.length; k++) {
        //
        //         var absoluteY =  prepearForRotation[k].x*(-1)+currentCoordinates.coordinatesInField[2].y;
        //         var absoluteX =  prepearForRotation[k].y*1+currentCoordinates.coordinatesInField[2].x;
        //
        //         rotatedCoordinate[k] = {x: absoluteX, y: absoluteY};
        //
        //     }
        //
        //
        //     this.saveToFutureCoordinates(rotatedCoordinate);
        //
        // };

        this.rotate = function () {


            var absoluteCoordinates = [];

            for (var i = 0; i < currentCoordinates.coordinatesInField.length; i++) {

                var x = currentCoordinates.coordinatesInField[i].x;
                var y = currentCoordinates.coordinatesInField[i].y;

                var relativeCoordinatesX = x - currentCoordinates.coordinatesInField[0].x;
                var relativeCoordinatesY  = y - currentCoordinates.coordinatesInField[0].y;

                absoluteCoordinates[i] = {x: relativeCoordinatesX, y: relativeCoordinatesY};

            }


            for (var k = 0; k < absoluteCoordinates.length; k++) {

                var absoluteX =  absoluteCoordinates[k].y*1+currentCoordinates.coordinatesInField[0].x;
                var absoluteY =  absoluteCoordinates[k].x*(-1)+currentCoordinates.coordinatesInField[0].y;


                futureCoordinates.coordinatesInField[k].x = absoluteX;
                futureCoordinates.coordinatesInField[k].y = absoluteY;

            }



        };


        // this.saveToFutureCoordinates = function (figureArray) {
        //
        //     for (var i = 0; i < futureCoordinates.coordinatesInField.length; i++) {
        //
        //         futureCoordinates.coordinatesInField[i].x = figureArray[i].x;
        //         futureCoordinates.coordinatesInField[i].y = figureArray[i].y;
        //
        //     }
        // };



        // this.makeEmptyFigure = function () {
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
        // };
        //
        //
        // this.copyFigure = function () {
        //
        //
        //     var tempFigure = this.makeEmptyFigure();
        //
        //     for (var k = 0; k < 4; k++) {
        //
        //         tempFigure.coordinatesInField[k].x =  currentCoordinates.coordinatesInField[k].x;
        //         tempFigure.coordinatesInField[k].y =  currentCoordinates.coordinatesInField[k].y;
        //
        //
        //     }
        //
        //     return tempFigure;
        // };


        this.saveToCurrentCoordinates = function() {


            for (var k = 0; k < futureCoordinates.coordinatesInField.length; k++) {

                currentCoordinates.coordinatesInField[k].x = futureCoordinates.coordinatesInField[k].x;
                currentCoordinates.coordinatesInField[k].y = futureCoordinates.coordinatesInField[k].y;

            }

        };



        this.move = function (vector) {

            var increaseX = vector.x;
            var increaseY = vector.y;

            for (var i = 0; i < currentCoordinates.coordinatesInField.length; i++) {

                var x = currentCoordinates.coordinatesInField[i].x;
                var y = currentCoordinates.coordinatesInField[i].y;

                futureCoordinates.coordinatesInField[i].x = increaseX + x;
                futureCoordinates.coordinatesInField[i].y = increaseY + y;

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

        this.addFigureToCollection = function(){

            figureCollection.push.apply(figureCollection, arguments);
        }

    }




    function TetrisEngine() {

        this.gameIsOver  = function (arrField) {

            for(var i=0; i < arrField[0].length; i++ ){

                if(arrField[0][i] == 1 ){
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

            for(var j = 0; j < figureCoordinates.coordinatesInField.length; j++ ){

                var coordinateX = figureCoordinates.coordinatesInField[j].x;
                var coordinateY = figureCoordinates.coordinatesInField[j].y;

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



    var tetrisEngine = new TetrisEngine();
    var generator = new FigureGenerator();
    var fieldClass  = new Field();
    var figureClass = new Figure();



    generator.addFigureToCollection(figureLetterL,figureCube,figureLetterI,figureLetterT);
    generator.addFigureToCollection(figureJ, figureS, figureZ);



    // generator.addFigureToCollection(figureLetterT);


    moweFigure();




    function moweFigure() {

        var speed = 250;

        var makeNewFigure = true;

          var movFig = setInterval( moveFukingDown, speed);

        $(document).keydown(function(e) {
            switch (e.which) {
                case 37:
                    figureClass.moveLeft();

                    var futureFigureLeft = figureClass.getFutureCoordinates();
                    var fieldLeft = fieldClass.getField();


                    if(tetrisEngine.moveCheck(futureFigureLeft, fieldLeft)){
                        figureClass.saveToCurrentCoordinates();
                    }


                    var figureMoveLeft = figureClass.getCurrentCoordinates();
                    var fieldLeftWithFigure = fieldClass.getField();

                    tetrisEngine.drawField(figureMoveLeft, fieldLeftWithFigure);
                    break;

                case 39:
                    figureClass.moveRight();

                    var futureFigure = figureClass.getFutureCoordinates();
                    var field = fieldClass.getField();


                    if(tetrisEngine.moveCheck(futureFigure,field)){
                        figureClass.saveToCurrentCoordinates();
                    }


                    var figureMoveRight = figureClass.getCurrentCoordinates();
                    var fieldRight = fieldClass.getField();


                    tetrisEngine.drawField(figureMoveRight, fieldRight);
                    break;

                case 32:
                    figureClass.rotate();

                    var futureFigureRotation = figureClass.getFutureCoordinates();
                    var fieldRotation = fieldClass.getField();


                    if(tetrisEngine.moveCheck(futureFigureRotation,fieldRotation)){
                        figureClass.saveToCurrentCoordinates();
                    }


                    var figureMoveRotate = figureClass.getCurrentCoordinates();
                    var fieldRotate = fieldClass.getField();


                    tetrisEngine.drawField(figureMoveRotate, fieldRotate);


                    break;

            }
        });



        // $(document).keyup(function(e) {
        //     switch (e.which) {
        //
        //         case 40:
        //
        //             break;
        //
        //     }
        // });
        //


        function moveFukingDown() {


            if(makeNewFigure){
                var figure = generator.getFigure();
                figureClass.addFigureToModel(figure);
            }


            figureClass.moveDown();


            var futureFigure = figureClass.getFutureCoordinates();
            var field = fieldClass.getField();


            if(tetrisEngine.moveCheck(futureFigure,field)){

                makeNewFigure = false;

                figureClass.saveToCurrentCoordinates();
                tetrisEngine.drawField(futureFigure, field);

            }else{
                makeNewFigure = true;
                var addFigure = figureClass.getCurrentCoordinates();
                fieldClass.addFigureToField(addFigure);
                fieldClass.checkFilledRow();


                var fieldForCheck = fieldClass.getField();
                var isGameOver = tetrisEngine.gameIsOver(fieldForCheck);

                if(isGameOver){
                    clearInterval(movFig);
                    console.log(' game over ');
                }
            }

            console.log('its work');


        }

    };

    //
    //     function moveFukingDown() {
    //
    //
    //         console.time('test');
    //
    //
    //         if(makeNewFigure){
    //             tetrisEngine.setFigureOnField();
    //             tetrisEngine.drawField();
    //         }
    //
    //
    //         var figureForCheckh  = tetrisEngine.moveDown();
    //         var hasNoCollision = tetrisEngine.moveCheck(figureForCheckh);
    //
    //         if(hasNoCollision){
    //
    //             makeNewFigure = false;
    //             tetrisEngine.drawField();
    //
    //         }else{
    //
    //             makeNewFigure = true;
    //
    //             tetrisEngine.addFigureToField();
    //             tetrisEngine.checkFilledRow();
    //             // tetrisEngine.drawField();
    //
    //             var gameIsOver = tetrisEngine.gameIsOver();
    //
    //             if(gameIsOver){
    //                 clearInterval(movFig);
    //                 console.log(' game over ');
    //             }
    //
    //         }
    //
    //         console.timeEnd('test');
    //
    //     }
    //
    // };






        //
        // var simpleFig  = {
        //     coordinates :[
        //         {x: 0, y: 0},
        //         {x: -1, y: 0},
        //         {x: 0, y: -1},
        //         {x: 1, y: -1}
        //     ]
        // };
        //
        // function RecreateFigure(figure) {
        //
        //     this.makeAbsolute = function () {
        //
        //     }
        //
        // }




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

