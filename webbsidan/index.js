const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");

const requestGET = new Request("http://localhost:8000/cities");

fetch(requestGET)
  .then((x) => {
    if (!x.ok) {
      alert("array med laddar ej");
    }
    return x.json();
  })
  .then(fulfillhandleGET);

function fulfillhandleGET(resource) {
  const cities = resource;

  for (let city of cities) {
    let citys = document.createElement("div");
    let cityText = document.createElement("p");
    let cityDelete = document.createElement("button");

    citys.classList.add("city");
    cityText.classList.add("cityText");
    cityDelete.classList.add("cityDelete");

    cityText.textContent = `${city.name},  ${city.country}`;
    cityDelete.textContent = "Delete";

    document.getElementById("cities").appendChild(citys);
    citys.appendChild(cityText);
    citys.appendChild(cityDelete);

    cityDelete.addEventListener("click", function () {
      fetch("http://localhost:8000/cities", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: city.id }),
      })
        .then((x) => x.json())
        .then(citys.remove());
    });
  }
}

button1.addEventListener("click", function () {
  const inputName = document.getElementById("inputName");
  const inputCountry = document.getElementById("inputCountry");

  if (inputName.value == "" || inputCountry.value == "") {
    alert("namn eller country saknas");
    inputName.value = "";
    inputCountry.value = "";
  }

  fetch("http://localhost:8000/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: inputName.value,
      country: inputCountry.value,
    }),
  })
    .then((response) => {
      if (response.status == 409) {
        alert("staden finns redan");
        inputName.value = "";
        inputCountry.value = "";
        return;
      }
      return response.json();
    })
    .then(fulfillhandlePOST);

  function fulfillhandlePOST(resource) {
    const city = resource;

    let citys = document.createElement("div");
    let cityText = document.createElement("p");
    let cityDelete = document.createElement("button");

    citys.classList.add("city");
    cityText.classList.add("cityText");
    cityDelete.classList.add("cityDelete");

    cityText.textContent = `${city.name},  ${city.country}`;
    cityDelete.textContent = "Delete";

    document.getElementById("cities").appendChild(citys);
    citys.appendChild(cityText);
    citys.appendChild(cityDelete);

    cityDelete.addEventListener("click", function () {
      fetch("http://localhost:8000/cities", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: city.id }),
      })
        .then((x) => x.json())
        .then(() => citys.remove());
    });

    inputName.value = "";
    inputCountry.value = "";
  }
});

button2.addEventListener("click", function () {
  const inputText = document.getElementById("inputText");
  const inputCountry2 = document.getElementById("inputCountry2");

  fetch(
    `http://localhost:8000/cities/search?text=${inputText.value}&country=${inputCountry2.value}`
  )
    .then((response) => {
      if (response.status == 400) {
        alert("Sökparametern text finns ej med!");
        return;
      }
      return response.json();
    })
    .then(fulfillhandleMatch);

  function fulfillhandleMatch(resource) {
    const cityMatchArray = resource;

    document.getElementById("cities2").innerHTML = ``;

    if (cityMatchArray.length == 0) {
      let div = document.createElement("div");
      let p = document.createElement("p");

      div.classList.add("city2");
      p.classList.add("cityText");
      p.textContent = "No cities found";

      document.getElementById("cities2").appendChild(div);
      div.appendChild(p);
    }
    for (let city of cityMatchArray) {
      let div = document.createElement("div");
      let p = document.createElement("p");

      div.classList.add("city2");
      p.classList.add("cityText");
      p.textContent = `${city.name}, ${city.country}`;

      document.getElementById("cities2").appendChild(div);
      div.appendChild(p);
    }

    inputText.value = "";
    inputCountry2.value = "";
  }
});
