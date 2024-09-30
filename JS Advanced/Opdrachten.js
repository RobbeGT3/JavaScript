// Opdracht 1
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}
let value1 = toCelsius(10);
let value2 = toCelsius;

console.log(typeof value1, typeof value2);
/*In deze code krijg je de soort data te zien die value 1 en value 2 zijn. Value1 is in dit geval een number en value2 is in dit geval een functie aangezien die geen number kan teruggeven omdat die geen parameters meekrijgt.*/

//Opdracht 2:
function kwadraat(x) {
  return x * x;
}

const kwadraatFunctie = function (x) {
  return x * x;
};

console.log(kwadraatFunctie(5));
console.log(typeof kwadraatFunctie);
/*Orginele code is: const kwadraat = (x) => x * x; */

//opdracht 3
const woorden = ["JavaScript", "is", "erg", "leuk"];
// woorden.forEach(console.log);
woorden.forEach((tekst) => console.log(tekst));

// opdracht 4
const woorden2 = ["JavaScript", "is", "erg", "leuk"];
console.log(woorden2.filter((tekst) => tekst.length < 3));

//opdracht 5
const studenten = [
  { naam: "Jan", cijfer: 7 },
  { naam: "Piet", cijfer: 8 },
  { naam: "Klaas", cijfer: 6 },
  { naam: "Marie", cijfer: 9 },
];
const goodGrades = studenten.filter((studenten) => studenten.cijfer >= 8);
console.log(goodGrades);

//opdracht 6

studenten.forEach(function (a) {
  if (a.cijfer >= 8) {
    console.log(a);
  }
});

//Opdracht 7
const getallen = [1, 2, 3, 4, 5];
function verdubbelen(x) {
  return x * 2;
}
let verdubbeld1 = getallen.map(verdubbelen);

/*Het array ziet er dan als volgt uit: [2, 4, 6, 8, 10] */

//Opdracht 8
const namen = ["Carl", "Charlie", "Daniel", "Jack", "Dana"];

function greetingTekst(naam) {
  return "Hello " + naam;
}

let greeting = namen.map(greetingTekst);
console.log(greeting);

//Opdracht 9
let animePersonages = [
  "Naruto Uzumaki",
  "Monkey D. Luffy",
  "Goku",
  "Goku",
  "Sailor Moon",
  "Spike Spiegel",
];

let personage = animePersonages.find((person) => person === "Goku");
console.log(personage);
/* als een karakter er meerdere keeren voorkomt, dan wordt die alsnog maar 1 keer weergegeven. De find wordt maar 1 keer uitgevoerd.*/

//Opdracht 10
const numbers = [15, 6, 21, 22, 3];

function myFunc(total, num) {
  return total + num;
}
console.log(numbers.reduce(myFunc));
