console.log('running');

// bringing/sourcing in express 
const express = require('express');

// creating an instance of express
const app = express();

// tell express where to find public files when it gets HTTP requests
app.use(express.static('server/public'));

// tell express to listen for requests on a specific port
const port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log(`express is listening on port ${port}`);
})

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

// array to hold a history of calculations
let historyArray = [];

// array to hold solutions
let solutionsArray = [];

// handles POST request from client.js, calculates the 
// solution, and pushes
// it to the solutionArray
app.post('/calculationinfo', (req, res) => {
// empties the solution array so that one solution is sent each time
    solutionsArray = [];
    let newCalculation = req.body;
    console.log(newCalculation);
     let number1 = newCalculation.firstNumber;
     let number2 = newCalculation.secondNumber;
     number1 = parseFloat(number1)
     number2 = parseFloat(number2)
// if statments 1-4 check which operation was selected, then preforms
// the correct math operation 
    if (newCalculation.operation == '+') {
        console.log('in addtion', number1, number2);
        let solution = number1 + number2;
        solutionsArray.push(solution);
        newCalculation.solution = parseFloat(solution); 
        historyArray.push(newCalculation);
    }
    if (newCalculation.operation == '-') {
        console.log('in subtract', number1, number2);
        let solution = number1 - number2;
        solutionsArray.push(solution)
        newCalculation.solution = parseFloat(solution);
        historyArray.push(newCalculation)
    }
    if (newCalculation.operation == '*') {
        console.log('in mult', number1, number2);
        let solution = number1 * number2;
        solutionsArray.push(solution)
        newCalculation.solution = parseFloat(solution);
        historyArray.push(newCalculation)
    }
    if (newCalculation.operation == '/') {
        console.log('in division', number1, number2);
        let solution = number1 / number2;
        solutionsArray.push(solution)
        newCalculation.solution = parseFloat(solution);
        historyArray.push(newCalculation)
    }
    res.sendStatus(201);
})

// sends the solution array back to client.js 
app.get('/calculation', (req, res) => {
    res.send(solutionsArray)
})

// sends the history array back to client.js
app.get('/history', (req, res) => {
    res.send(historyArray)
    console.log(historyArray);
})