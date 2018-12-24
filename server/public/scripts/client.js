console.log('js');

$(document).ready(readyNow);

// gets things set up when the document is ready
function readyNow() {
  console.log('JQ');
  handleBtns();
  getHistory();
} //end readyNow

// function handles all of the buttons
function handleBtns() {
// operation buttons
  $('.numberBtn').on('click', numberBtns);
  $('.operation').on('click', operationBtns);
// functionality buttons
  $('#equatesTo').on('click', sendCalcuInfo);
  $('#clear').on('click', clearcalcOutputBtn);
} // end handleBtns

// global variable 
let symbol = '';
let firstNumber = '';
let secondNumber = '';
let solution = 0;


// operation btns
function operationBtns (){
  symbol = $(this).text();
  $('#calcOutput').append(`${symbol}`);
}

// number btns
function numberBtns (){
  let number = $(this).text();
  console.log(number);
  $('#calcOutput').empty();
  if(symbol === ''){
      firstNumber += number;
      console.log('firstNumber', firstNumber);
    }
  else {
      secondNumber += number;
      console.log('secondNumber', secondNumber);
  }
  $('#calcOutput').append(`${firstNumber}`);
  $('#calcOutput').append(`${symbol}`);
  $('#calcOutput').append(`${secondNumber}`);
}

//function clears input 
function clearcalcOutputBtn() {
  $('#calcOutput').empty();
  $('#calcOutput').append(`0`);
  symbol = '';
  firstNumber = '';
  secondNumber = '';
}// end clearINputBtn

// sends calculation info to the server
function sendCalcuInfo(event) {
  //event.preventDefault();
  let newFirstNumber = firstNumber;
  let newSymbol = symbol;
  let newSecondNumber = secondNumber;
  let newSolution = solution;

// requires user to fill in all feilds before request to server is sent
  if (newFirstNumber == '' || newSecondNumber == '') {
    alert('Please fill in all fields')
    return false;
  }
  console.log(`Sending calculation info firstNumber: ${newFirstNumber} 
  operation: ${newSymbol} secondNumber: ${newSecondNumber}`);

  $.ajax({
    method: 'POST',
    url: '/calculationinfo',
    data: {
      firstNumber: newFirstNumber,
      operation: newSymbol,
      secondNumber: newSecondNumber,
      solution: newSolution
    }
  }).then(function (response) {
    console.log('sent calculation info');
  // gets the calculation from the server once the calculation info is received
    getCalcutionSolution();
  })

}

// Gets solution from server 
function getCalcutionSolution() {
  $.ajax({
    method: 'GET',
    url: '/calculation'
  }).then(function (response) {
    console.log('response:', response);
    showSolution(response);
  }).catch(function (error) {
    console.log('error in request to server for calculation', error);
  })
}


// appends solution to the dom
function showSolution(response) {
  console.log('in showSolution');
  let answer = response;
  console.log(answer);
  $('#calcOutput').empty();
  $('#calcOutput').append(`${answer}`)
  getHistory();
}

// Gets calculation history from server 
function getHistory() {
  $.ajax({
    method: 'GET',
    url: '/history'
  }).then(function (response) {
    console.log('response:', response);
    showHistory(response);
  }).catch(function (error) {
    console.log('error in request to server for calculation', error);
  })
}

// appends the history to the dom
function showHistory(response) {
  console.log('in showHistory');
  $('#appendhistoryHere').empty();
  console.log('response2 is', response);
  for (let i = 0; i < response.length; i++) {
    console.log(response[i]);
    $('#appendhistoryHere').append(`
  <tr>
  <td>${response[i].firstNumber}</td>
  <td>${response[i].operation}</td>
  <td>${response[i].secondNumber}</td>
   <td>${response[i].solution}</td>
</tr> `);
  }
}