const cities = [
  { id: 2, name: "Lille", country: "France" },
  { id: 3, name: "Nantes", country: "France" },
  { id: 5, name: "Bremen", country: "Germany" },
  { id: 10, name: "Dresden", country: "Germany" },
  { id: 11, name: "Heidelberg", country: "Germany" },
  { id: 12, name: "Venice", country: "Italy" },
  { id: 13, name: "Rome", country: "Italy" },
  { id: 16, name: "Graz", country: "Austria" },
  { id: 20, name: "Basel", country: "Switzerland" },
  { id: 21, name: "Lucerne", country: "Switzerland" },
  { id: 22, name: "Kraków", country: "Poland" },
  { id: 23, name: "Warsaw", country: "Poland" },
  { id: 24, name: "Poznań", country: "Poland" },
  { id: 28, name: "Ghent", country: "Belgium" },
  { id: 31, name: "Maastricht", country: "Netherlands" },
  { id: 38, name: "Maribor", country: "Slovenia" },
  { id: 42, name: "Strasbourg", country: "France" },
];

async function handler(request) {
  const url = new URL(request.url);

  const headersCORS = new Headers();
  headersCORS.set("Access-Control-Allow-Origin", "*");
  headersCORS.set("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS"); // Fråga Erik
  headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
  headersCORS.set("Content-Type", "application/json");

  if (request.method == "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: headersCORS,
    });
  }

  if (request.method == "GET") {
    if (url.pathname == "/cities") {
      return new Response(JSON.stringify(cities), {
        headers: headersCORS,
      });
    }
  }

  if (request.method == "POST") {
    if (url.pathname == "/cities") {
      const body = await request.json();
      const inputName = body.name;
      const inputCountry = body.country;

      if (!inputName || !inputCountry) {
        return new Response("namn eller country saknas", {
          status: 400,
          headers: headersCORS,
        });
      }

      for (let city of cities) {
        if (city.name == inputName) {
          return new Response("Staden finns redan", {
            status: 409,
            headers: headersCORS,
          });
        }
      }
      let counter = 0;
      for (let cityID of cities) {
        if (cityID.id > counter) {
          counter = cityID.id;
        }
      }
      let newCity = {
        id: counter + 1,
        name: inputName,
        country: inputCountry,
      };
      console.log(`Detta är POST/cities: ${newCity}`);
      cities.push(newCity);

      return new Response(JSON.stringify(newCity), {
        status: 200,
        headers: headersCORS,
      });
    }
  }

  if (request.method == "DELETE") {
    if (url.pathname == "/cities") {
      const body = await request.json();
      const cityID = body.id;

      if(!cityID){
        return new Response("Id saknas!", {
          status: 400,
          headers: headersCORS
        })
      }
      for(let city of cities){
        if()
      }
    }
  }

  return new Response("Bad request", {
    status: 400,
    headers: headersCORS,
  });
}
Deno.serve(handler);

/*   if (url.pathname == "/") {
    const html = Deno.readTextFileSync("../webbsidan/index.html");
    return new Response(html, { headers: { "Content-Type": "text/plain" } });
  }

  if (url.pathname == "/index.css") {
    const html = Deno.readTextFileSync("../webbsidan/index.css");
    return new Response(html, { headers: { "Content-Type": "text/css" } });
  }

  if (url.pathname == "/index.js") {
    const html = Deno.readTextFileSync("../webbsidan/index.js");
    return new Response(html, {
      headers: { "Content-Type": "text/javascript" },
    });
  } */
