// Yahtzee opdracht
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

const diceImages = {
  1: 'Images/1.png',
  2: 'Images/2.png',
  3: 'Images/3.png',
  4: 'Images/4.png',
  5: 'Images/5.png',
  6: 'Images/6.png',
};

const gooiKnop = document.querySelector("#gooiKnop");
const diceDivs = document.querySelectorAll(".dices");
const scoreCells = document.querySelectorAll(".score1");

gooiKnop.addEventListener("click", gooiDobbelstenen);

startYahtzee();

function startYahtzee() {
  holdingValueDices();
  updateDiceImages(diceValue);
}

function gooiDobbelstenen() {
  turns--;
  generateValues();
  updateScore();
  updateDiceImages(diceValue);

  if (turns === 0) {
    holdingValueScore();

    function holdingValueScore() {
      scoreCells.forEach((cell) => {
        cell.addEventListener("click", function () {
          lockScore(cell.id);
          turns = 3;
          document.getElementById("gooiKnop").disabled = false;

          diceDivs.forEach((index) =>{
            if(diceHold[index]){
              console.log(diceHold)
            }
          })

        });
      });
    }
    document.getElementById("gooiKnop").disabled = true;
  }
}

function holdingValueDices() {
  diceDivs.forEach((element, index) => {
    element.addEventListener("click", function () {
      holdDice(index, this);
    });
  });

  function holdDice(index, divElement) {
    diceHold[index] = !diceHold[index];
    if (!diceHold[index]) {
      divElement.style = "border: 0px";
    } else {
      divElement.style = "border: 3px solid darkblue; border";
    }
  }
}

function generateValues() {
  for (let i = 0; i < 5; i++) {
    if (!diceHold[i]) {
      let nummer = Math.floor(Math.random() * 6) + 1;
      diceValue[i] = nummer;
    }
  }
}

function updateDiceImages(values) {
  values.forEach((value, index) => {
      const imgElement = document.getElementById(`img${index + 1}`);
      if (imgElement) {
          imgElement.src = diceImages[value]; 
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
  //sum
  score[13].value = upperSum();
  //bonus
  if (score[13].value >= 65) {
    score[14].value = 35;
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

  document.querySelector("#player1ThreeOfAKind").textContent = score[6].value;
  document.querySelector("#player1FourOfAKind").textContent = score[7].value;
  document.querySelector("#player1FullHouse").textContent = score[8].value;
  document.querySelector("#player1SmallStraight").textContent = score[9].value;
  document.querySelector("#player1LargeStraight").textContent = score[10].value;
  document.querySelector("#player1Chance").textContent = score[11].value;
  document.querySelector("#player1YAHTZEE").textContent = score[12].value;
  
  document.querySelector("#player1Sum").textContent = score[13].value;
  document.querySelector("#player1Bonus").textContent = score[14].value;
  document.querySelector("#player1Total").textContent = score[15].value;
}

function lockScore(scoreId) {
  const scoreCell = document.getElementById(scoreId);
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
  
  scoreCell.style.color = "darkgreen";
  scoreCell.style.backgroundColor = "lightgreen";
}

function ofAKind(number) {
  let diceAantal = {};

  //Maakt een frequentie array aan.
  //[1,3,3,4,1] wordt { 1:2, 3:2, 4:1}
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
  //Maakt een copy van de array, sorteerd die en zet hem om in string
  let sortedArr = [...arr].sort((a, b) => a - b);
  let arrString = sortedArr.join("");

  const option1 = "1234";
  const option2 = "2345";
  const option3 = "3456";
  if (
    arrString.includes(option1) ||
    arrString.includes(option2) ||
    arrString.includes(option3)
  ) {
    return 30;
  } else {
    return 0;
  }
}

function largeStraight(arr) {
  //Maakt een copy van de array, sorteerd die en zet hem om in string
  let sortedArr = [...arr].sort((a, b) => a - b);
  let arrString = sortedArr.join("");

  const option1 = "12345";
  const option2 = "23456";
  if (arrString.includes(option1) || arrString.includes(option2)) {
    return 40;
  } else {
    return 0;
  }
}
