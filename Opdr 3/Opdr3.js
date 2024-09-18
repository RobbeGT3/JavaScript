let aantalElementen = 0;

const klikKnop = document.querySelector("#button");
const kleurBox = document.querySelector(".container");

function actie() {
  if (aantalElementen <= 49) {
    for (let index = 0; index <= 48; index++) {
      aantalElementen++;
      const newDiv = document.createElement("div");
      kleurBox.append(newDiv);

      newDiv.setAttribute("class", "container__item");
      newDiv.innerHTML = aantalElementen;
    }
  } else {
    alert("Maximum van elementen bereikt.");
  }
}

klikKnop.addEventListener("click", actie);
