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

async function getResource8() {
  const response = await fetch("http://localhost:8000/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Dresden", country: "Germany" }),
  });
  return await response.json();
}

async function driverfunction8() {
  const resource = await getResource8();
  console.log(`förfrågan 8: ${resource}`);
}

driverfunction8();

async function getResource9() {
  const response = await fetch("http://localhost:8000/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Dresden" }),
  });
  return await response.json();
}

async function driverfunction9() {
  const resource = await getResource9();
  console.log(`förfrågan 9: ${resource}`);
}

driverfunction9();

async function getResource10() {
  const response = await fetch("http://localhost:8000/cities", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: 56 }),
  });
  return await response.json();
}

async function driverfunction10() {
  const resource = await getResource10();
  console.log(`förfrågan 10: ${resource}`);
}

driverfunction10();

async function getResource11() {
  const response = await fetch("http://localhost:8000/cities", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  return await response.json();
}

async function driverfunction11() {
  const resource = await getResource11();
  console.log(`förfrågan 11: ${resource}`);
}

driverfunction11();

async function getResource12() {
  const response = await fetch("http://localhost:8000/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from: 2, to: 1, password: "pass" }),
  });
  return await response.json();
}

async function driverfunction12() {
  const resource = await getResource12();
  console.log(`förfrågan 12: ${resource}`);
}

driverfunction12();

async function getResource13() {
  const response = await fetch("http://localhost:8000/cities/search");
  return await response.json();
}

async function driverfunction13() {
  //KOLLA DENNA tror den  ska vara rätt får ändå felsvar 400
  const resource = await getResource13();
  console.log(`förfrågan 13: ${resource}`);
}

driverfunction13();

async function getResource14() {
  const response = await fetch("http://localhost:8000/mordor", {
    method: "DELETE",
  });
  return await response.json();
}

async function driverfunction14() {
  const resource = await getResource14();
  console.log(`förfrågan 14: ${resource}`);
}

driverfunction14();
