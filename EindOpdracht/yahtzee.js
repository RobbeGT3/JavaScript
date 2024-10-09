let diceValue = [1, 2, 3, 4, 5];
let diceHold = [false, false, false, false, false];
let turns = 3;

let score = [
  { naam: "Ones", value: 0, locked: false }, //0
  { naam: "Twos", value: 0, locked: false }, //1
  { naam: "Threes", value: 0, locked: false }, //2
  { naam: "Fours", value: 0, locked: false }, //3
  { naam: "Fives", value: 0, locked: false }, //4
  { naam: "Sixes", value: 0, locked: false }, //5
  { naam: "threeOfAKind", value: 0, locked: false }, //6
  { naam: "fourOfAKind", value: 0, locked: false }, //7
  { naam: "fullHouse", value: 0, locked: false }, //8
  { naam: "smallstraight", value: 0, locked: false }, //9
  { naam: "largestraight", value: 0, locked: false }, //10
  { naam: "Chance", value: 0, locked: false }, //11
  { naam: "Yahtzee", value: 0, locked: false }, //12
  { naam: "Sum", value: 0 }, //13
  { naam: "bonus", value: 0 }, //14
  { naam: "total", value: 0 }, //15
];

const gooiKnop = document.querySelector("#gooiKnop");
const diceDivs = document.querySelectorAll(".dices");
const scoreCells = document.querySelectorAll(".score1");

gooiKnop.addEventListener("click", gooiDobbelstenen);

startYahtzee();

function startYahtzee() {
  holdingValueDices();
  updateDices();
  generateValues();
}

function gooiDobbelstenen() {
  turns--;
  generateValues();
  updateDices();
  updateScore();

  if (turns === 0) {
    holdingValueScore();

    function holdingValueScore() {
      scoreCells.forEach((cell) => {
        cell.addEventListener("click", function () {
          lockScore(cell.id);
          turns = 3;
          document.getElementById("gooiKnop").disabled = false;
        });
      });
    }
    document.getElementById("gooiKnop").disabled = true;
  }
}

function holdingValueDices() {
  diceDivs.forEach((element, index) => {
    element.addEventListener("click", function () {
      hold(index, this);
    });
  });

  function hold(index, divElement) {
    diceHold[index] = !diceHold[index];
    if (!diceHold[index]) {
      divElement.style = "border: 1px solid black;";
    } else {
      divElement.style = "border: 3px solid black;";
    }
  }
}

function playerTurn() {}

function generateValues() {
  for (let i = 0; i < 5; i++) {
    if (!diceHold[i]) {
      let nummer = Math.floor(Math.random() * 6) + 1;
      diceValue[i] = nummer;
    }
  }
}

function updateDices() {
  diceDivs.forEach((div, index) => {
    if (index < diceValue.length) {
      div.innerHTML = diceValue[index];
    }
  });
}

// berekeningen:
function countNumber(num) {
  let count = 0;
  for (let i = 0; i <= diceValue.length; i++) {
    if (diceValue[i] == num) {
      count++;
    }
  }
  return count;
}

function updateScore() {
  if (!score[0].locked) {
    score[0].value = 1 * countNumber(1);
  }
  if (!score[1].locked) {
    score[1].value = 2 * countNumber(2);
  }
  if (!score[2].locked) {
    score[2].value = 3 * countNumber(3);
  }
  if (!score[3].locked) {
    score[3].value = 4 * countNumber(4);
  }
  if (!score[4].locked) {
    score[4].value = 5 * countNumber(5);
  }
  if (!score[5].locked) {
    score[5].value = 6 * countNumber(6);
  }
  //sum
  score[13].value = upperSum();
  //bonus
  if (score[13].value >= 65) {
    score[14].value = 35;
  }
  //three of a kind
  if (!score[6].locked) {
    if (ofAKind(3)) {
      score[6].value = diceValue.reduce(sumDice);
    } else {
      score[6].value = 0;
    }
  }
  //four of a kind
  if (!score[7].locked) {
    if (ofAKind(4)) {
      score[7].value = diceValue.reduce(sumDice);
    } else {
      score[7].value = 0;
    }
  }
  //full house
  if (!score[8].locked) {
    if (isFullHouse()) {
      score[8].value = 25;
    } else {
      score[8].value = 0;
    }
  }
  //small straight
  if (!score[9].locked) {
    score[9].value = smallStraight(diceValue);
  }
  //large straight
  if (!score[10].locked) {
    score[10].value = largeStraight(diceValue);
  }
  //chance
  if (!score[11].locked) {
    score[11].value = diceValue.reduce(sumDice);
  }
  //YAHTZEE
  if (!score[12].locked) {
    if (ofAKind(5)) {
      score[12].value = 50;
    } else {
      score[12].value = 0;
    }
  }

  score[15].value = totalBerekening();
  displayScores();
}

function displayScores() {
  document.querySelector("#player1Ones").textContent = score[0].value;
  document.querySelector("#player1Twos").textContent = score[1].value;
  document.querySelector("#player1Threes").textContent = score[2].value;
  document.querySelector("#player1Fours").textContent = score[3].value;
  document.querySelector("#player1Fives").textContent = score[4].value;
  document.querySelector("#player1Sixes").textContent = score[5].value;
  document.querySelector("#player1Sum").textContent = score[13].value;
  document.querySelector("#player1Bonus").textContent = score[14].value;

  document.querySelector("#player1ThreeOfAKind").textContent = score[6].value;
  document.querySelector("#player1FourOfAKind").textContent = score[7].value;
  document.querySelector("#player1FullHouse").textContent = score[8].value;
  document.querySelector("#player1SmallStraight").textContent = score[9].value;
  document.querySelector("#player1LargeStraight").textContent = score[10].value;
  document.querySelector("#player1Chance").textContent = score[11].value;
  document.querySelector("#player1YAHTZEE").textContent = score[12].value;
  document.querySelector("#player1Total").textContent = score[15].value;
}

function lockScore(scoreId) {
  switch (scoreId) {
    case "player1Ones":
      score[0].locked = true;
      break;
    case "player1Twos":
      score[1].locked = true;
      break;
    case "player1Threes":
      score[2].locked = true;
      break;
    case "player1Fours":
      score[3].locked = true;
      break;
    case "player1Fives":
      score[4].locked = true;
      break;
    case "player1Sixes":
      score[5].locked = true;
      break;
    case "player1ThreeOfAKind":
      score[6].locked = true;
      break;
    case "player1FourOfAKind":
      score[7].locked = true;
      break;
    case "player1FullHouse":
      score[8].locked = true;
      break;
    case "player1SmallStraight":
      score[9].locked = true;
      break;
    case "player1LargeStraight":
      score[10].locked = true;
      break;
    case "player1Chance":
      score[11].locked = true;
      break;
    case "player1YAHTZEE":
      score[12].locked = true;
      break;
  }
  const scoreCell = document.getElementById(scoreId);
  scoreCell.style.color = "darkgreen";
  scoreCell.style.backgroundColor = "lightgreen";
}

function ofAKind(number) {
  let diceAantal = {};

  diceValue.forEach((num) => {
    diceAantal[num] = (diceAantal[num] || 0) + 1;
  });

  return Object.values(diceAantal).some((value) => value >= number);
}

function isFullHouse() {
  let diceAantal = {};

  diceValue.forEach((num) => {
    diceAantal[num] = (diceAantal[num] || 0) + 1;
  });

  let Aantal = Object.values(diceAantal);

  return Aantal.includes(3) && Aantal.includes(2);
}

function sumDice(total, sum) {
  return total + sum;
}

function upperSum() {
  let total = 0;
  if (score[0].locked) {
    total += score[0].value;
  }
  if (score[1].locked) {
    total += score[1].value;
  }
  if (score[2].locked) {
    total += score[2].value;
  }
  if (score[3].locked) {
    total += score[3].value;
  }
  if (score[4].locked) {
    total += score[4].value;
  }
  if (score[5].locked) {
    total += score[5].value;
  }
  return total;
}

function totalBerekening() {
  let total = upperSum();
  if (score[6].locked) {
    total += score[6].value;
  }
  if (score[7].locked) {
    total += score[7].value;
  }
  if (score[8].locked) {
    total += score[8].value;
  }
  if (score[9].locked) {
    total += score[9].value;
  }
  if (score[10].locked) {
    total += score[10].value;
  }
  if (score[11].locked) {
    total += score[11].value;
  }
  if (score[12].locked) {
    total += score[12].value;
  }
  total += score[13].value;
  total += score[14].value;
  return total;
}

function smallStraight(arr) {
  let arrString = arr.join("");

  const sequence1 = "1234";
  const sequence2 = "2345";
  const sequence3 = "3456";
  if (
    arrString.includes(sequence1) ||
    arrString.includes(sequence2) ||
    arrString.includes(sequence3)
  ) {
    return 30;
  } else {
    return 0;
  }
}

function largeStraight(arr) {
  let arrString = arr.join("");

  const Option1 = "12345";
  const Option2 = "23456";
  if (arrString.includes(Option1) || arrString.includes(Option2)) {
    return 40;
  } else {
    return 0;
  }
}
