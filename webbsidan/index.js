const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");

const requestGET = new Request("http://localhost:8000/cities");

fetch(requestGET)
  .then((x) => {
    if (!x.ok) {
      console.log("FEl");
    }
    return x.json();
  })
  .then(fulfillhandleGET);

function fulfillhandleGET(resource) {
  const cities = resource;

  for (let city of cities) {
    console.log(city);
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
      console.log(city.id);

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
    alert("Stad eller Land är inte ifyllt");
  }

  fetch("http://localhost:8000/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: inputName.value,
      country: inputCountry.value,
    }),
  })
    .then((x) => x.json())
    .then(fulfillhandlePOST);

  function fulfillhandlePOST(resource) {
    const city = resource;

    if (city.name == undefined && city.country == undefined) {
      alert("Kolla listan igen:) staden finns redan");
    }
    console.log("fulfillhandlePOST" + city.name + city.country);

    if (city.name != undefined && city.country != undefined) {
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
        console.log(city.id);

        fetch("http://localhost:8000/cities", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: city.id }),
        })
          .then((x) => x.json())
          .then(citys.remove());
      });

      inputName.value = "";
      inputCountry.value = "";
    }
  }
});

button2.addEventListener("click", function () {
  const inputText = document.getElementById("inputText").value;
  const inputCountry2 = document.getElementById("inputCountry2").value;

  fetch(
    `http://localhost:8000/cities/search?text=${inputText}&country=${inputCountry2}`
  )
    .then((x) => x.json())
    .then(fulfillhandleMatch);

  function fulfillhandleMatch(resource) {
    const cityMatchArray = resource;
    console.log(cityMatchArray);

    if (inputText == "") {
      alert("Du måste skriva något på text:)");
    }

    if (inputText != "") {
      document.getElementById("cities2").innerHTML = ``;
      for (let city of cityMatchArray) {
        let div = document.createElement("div");
        let p = document.createElement("p");

        div.classList.add("city2");
        p.classList.add("cityText");
        p.textContent = `${city.name}, ${city.country}`;

        document.getElementById("cities2").appendChild(div);
        div.appendChild(p);
      }
    }
    inputText = "";
    inputCountry2 = "";
  }
});
