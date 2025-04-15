fetch("http://localhost:8000/cities")
  .then((x) => {
    if (!x.ok) {
      console.log("FEl");
    }
    return x.json();
  })
  .then(fulfillhandleGET);

function fulfillhandleGET(resource) {
  const cities = resource;
  console.log(cities);
  console.log("Förfrågan 1: Array som innehåller 17 städer");
}

fetch("http://localhost:8000/cities", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "malmö", country: "sweden" }),
})
  .then((x) => x.json())
  .then(fulfillhandlePOST);

function fulfillhandlePOST(resource) {
  const city = resource;
  console.log("Förfrågan 2: Staden malmö finns nu i listan");
}

fetch("http://localhost:8000/cities", {
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id: 2 }),
})
  .then((x) => x.text())
  .then(fulfillhandleDELETE);

function fulfillhandleDELETE(resource) {
  const answer = resource;
  console.log("förfrågan 3: " + answer + " stad med id 2 borttagen");

  fetch("http://localhost:8000/cities")
    .then((x) => {
      if (!x.ok) {
        console.log("FEl");
      }
      return x.json();
    })
    .then(fulfillhandleGET2);

  function fulfillhandleGET2(resource) {
    const cities = resource;
    console.log(cities);

    console.log("förfrågan 4: Array minus Lille plus Malmö");
  }

  fetch("http://localhost:8000/cities/43")
    .then((x) => x.json())
    .then(fulfillhandleId43);

  function fulfillhandleId43(resource) {
    const city43 = resource;
    console.log("förfrågan 5: Malmö med id 43");
  }

  fetch("http://localhost:8000/cities/search?text=en")
    .then((x) => x.json())
    .then(fulfillhandleSearch);

  function fulfillhandleSearch(resource) {
    const rightCities = resource;
    console.log("förfrågan 6: Städer som innehåller en");
  }

  fetch("http://localhost:8000/cities/search?text=en&country=Sweden")
    .then((x) => x.json())
    .then(fulfillhandleSearch2);

  function fulfillhandleSearch2(resource) {
    const rightCities = resource;
    console.log("förfrågan 7: städer som uppfyller text och country");
  }
}
