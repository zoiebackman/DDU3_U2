f1();
function f1() {
  fetch("http://localhost:8000/cities")
    .then((response) => {
      if (!response.ok) {
        console.log("FEl");
      }
      return response.json();
    })
    .then(fulfillhandleGET);

  function fulfillhandleGET(resource) {
    const cities = resource;
    console.log(cities);
    console.log("Förfrågan 1: Array som innehåller 17 städer");
    f2();
  }
}

function f2() {
  fetch("http://localhost:8000/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "malmö", country: "sweden" }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("förfrågan 2 fel");
      }
      return response.json();
    })
    .then(fulfillhandlePOST);

  function fulfillhandlePOST(resource) {
    const city = resource;
    console.log("Förfrågan 2: Staden malmö finns nu i listan");
    f3();
  }
}

function f3() {
  fetch("http://localhost:8000/cities", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: 2 }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("förfrågan 3 fel");
      }
      return response.json();
    })
    .then(fulfillhandleDELETE);

  function fulfillhandleDELETE(resource) {
    const answer = resource;
    console.log("förfrågan 3: stad med id 2 borttagen");
    f4();
    f5();
    f6();
    f7();
  }
}

function f4() {
  fetch("http://localhost:8000/cities")
    .then((response) => {
      if (!response.ok) {
        console.log("FEl");
      }
      return response.json();
    })
    .then(fulfillhandleGET2);

  function fulfillhandleGET2(resource) {
    const cities = resource;
    console.log(cities);

    console.log("förfrågan 4: Array minus Lille plus Malmö");
  }
}

function f5() {
  fetch("http://localhost:8000/cities/43")
    .then((response) => {
      if (!response.ok) {
        console.log("FEl");
      }
      return response.json();
    })
    .then(fulfillhandleId43);

  function fulfillhandleId43(resource) {
    const city43 = resource;
    console.log("förfrågan 5: Malmö med id 43");
  }
}

function f6() {
  fetch("http://localhost:8000/cities/search?text=en")
    .then((response) => {
      if (!response.ok) {
        console.log("FEl");
      }
      return response.json();
    })
    .then(fulfillhandleSearch);

  function fulfillhandleSearch(resource) {
    const rightCities = resource;
    console.log("förfrågan 6: Städer som innehåller en");
  }
}

function f7() {
  fetch("http://localhost:8000/cities/search?text=en&country=Sweden")
    .then((response) => {
      if (!response.ok) {
        console.log("FEl");
      }
      return response.json();
    })
    .then(fulfillhandleSearch2);

  function fulfillhandleSearch2(resource) {
    const rightCities = resource;
    console.log("förfrågan 7: städer som uppfyller text och country");
    felSvar();
  }
}

async function getResource8() {
  const response = await fetch("http://localhost:8000/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Dresden", country: "Germany" }),
  });
  if (response.status == 409) {
    console.log("förfrågan 8, Staden finns redan");
  }
}

async function getResource9() {
  const response = await fetch("http://localhost:8000/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Dresden" }),
  });
  if (response.status == 400) {
    console.log("förfrågan 9, stad eller country saknas");
  }
}

async function getResource10() {
  const response = await fetch("http://localhost:8000/cities", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: 56 }),
  });
  if (response.status == 404) {
    console.log("förfrågan 10, finns ingen stad med id");
  }
}

async function getResource11() {
  const response = await fetch("http://localhost:8000/cities", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  if (response.status == 400) {
    console.log("förfrågan 11, id saknas");
  }
}

async function getResource12() {
  const response = await fetch("http://localhost:8000/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from: 2, to: 1, password: "pass" }),
  });
  if (response.status == 400) {
    console.log("förfrågan 12, finns ingen endpoint messages");
  }
}

async function getResource13() {
  const response = await fetch("http://localhost:8000/cities/search");
  if (response.status == 400) {
    console.log("förfrågan 13, finns ingen endpoint cities/search");
  }
}

async function getResource14() {
  const response = await fetch("http://localhost:8000/mordor", {
    method: "DELETE",
  });
  if (response.status == 400) {
    console.log("förfrågan 14, finns ingen endpoint mordor på delete");
  }
}

async function felSvar() {
  await getResource8();
  await getResource9();
  await getResource10();
  await getResource11();
  await getResource12();
  await getResource13();
  await getResource14();
}
