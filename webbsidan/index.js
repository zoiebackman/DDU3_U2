const inputName = document.getElementById("inputName");
const inputCountry = document.getElementById("inputCountry");
const button1 = document.getElementById("button1");
const inputText = document.getElementById("inputText");
const inputCountry2 = document.getElementById("inputCountry2");

const get = { method: "GET" };
const post = { method: "POST" };
const del = { method: "DELETE" };

const requestGET = new Request("http://localhost:8000/cities", get);

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

    const buttonDel = document.querySelectorAll(".cityDelete");
    buttonDel.addEventListener("click", function () {
      fetch("http://localhost:8000/cities", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(city.id),
      })
        .then((x) => x.json())
        .then(fulfillhandleDELETE);

      function fulfillhandleDELETE(resource) {}
    });
  }
}

button1.addEventListener("click", function () {
  const inputName = document.getElementById("inputName");
  const inputCountry = document.getElementById("inputCountry");

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

    console.log("fulfillhandlePOST" + city.name + city.country);

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
  }
});
