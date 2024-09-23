//JavaScript
let myArray = [];
let aantalArray = [];

const gooiKnop = document.querySelector("#gooiKnop");

function countNumber(num) {
  let count = 0;
  for (let i = 0; i <= myArray.length; i++) {
    if (myArray[i] == num) {
      count++;
    }
  }
  const aantalBox = document.querySelector("#row-" + num);
  aantalBox.innerHTML = count;
  aantalArray.push(count);
}

function vulArray() {
  aantalArray = [];
  myArray = [];
  for (let i = 0; i < 5; i++) {
    let nummer = Math.floor(Math.random() * 6) + 1;
    const boxInhoud = document.querySelector("#box-" + (i + 1));
    boxInhoud.innerHTML = nummer;
    myArray.push(nummer);
  }

  for (let i = 1; i <= 6; i++) {
    countNumber(i);
  }
  console.log(aantalArray);
}

gooiKnop.addEventListener("click", vulArray);
