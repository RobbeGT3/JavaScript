//JavaScript
let myArray = [];
const gooiKnop = document.querySelector("#gooiKnop");

function vulArray() {
  myArray = [];
  for (let i = 0; i < 5; i++) {
    let nummer = Math.floor(Math.random() * 6) + 1;
    const boxInhoud = document.querySelector("#box-" + (i + 1));
    boxInhoud.innerHTML = nummer;
    myArray.push(nummer);
  }
  console.log(myArray);
}

gooiKnop.addEventListener("click", vulArray);
