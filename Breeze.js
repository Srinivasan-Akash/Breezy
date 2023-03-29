export default class Breeze {
    constructor() {}
  
    GET(url, contentType) {
      if (contentType == "json") {
        return fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
          return response.json().then((json) => {
            return {
              json_response: json,
              status: response.status,
              response_type: response.type,
              response_header: response.headers,
              response_body: response.body
            };
          });
        });
      } 
      
      else if (contentType == "xml") {
        return fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/xml" },
        })
          .then((response) => {
            return response.text().then((xml) => {
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(xml, "text/xml");
              const serializer = new XMLSerializer();
              const xmlStr = serializer.serializeToString(xmlDoc);
              return {
                xml_response: xmlStr,
                status: response.status,
                response_type: response.type,
                response_header: response.headers,
                response_body: response.body
              };
            });
          });
      }

      else if (contentType == "blob") {}
    }
  }
  
  const breeze = new Breeze();
  breeze
    .GET("https://v2.jokeapi.dev/joke/Any?format=xml", "xml", {})
    .then((data) => console.log(data));