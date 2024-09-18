let aantalElementen = 0;

const klikKnop = document.querySelector("#button");
const kleurBox = document.querySelector(".container");

function actie() {
  aantalElementen++;
  if (aantalElementen <= 49) {
    const newDiv = document.createElement("div");
    kleurBox.append(newDiv);

    newDiv.setAttribute("class", "container__item");
    newDiv.innerHTML = aantalElementen;
  } else {
    alert("Maximum van elementen bereikt.");
  }
}

klikKnop.addEventListener("click", actie);
