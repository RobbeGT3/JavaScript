//JavaScript
let myArray = [];
const gooiKnop = document.querySelector("#gooiKnop");
let count;

function countNumber(num) {
  for (let i = 0; i <= myArray.length; i++) {
    if (myArray[i] == num) {
      count += 1;
    }
  }
}

function vulArray() {
  count = 0;
  myArray = [];
  for (let i = 0; i < 5; i++) {
    let nummer = Math.floor(Math.random() * 6) + 1;
    const boxInhoud = document.querySelector("#box-" + (i + 1));
    boxInhoud.innerHTML = nummer;
    myArray.push(nummer);
  }
  countNumber(2);
  console.log(myArray);
  console.log(count);
}

gooiKnop.addEventListener("click", vulArray);
