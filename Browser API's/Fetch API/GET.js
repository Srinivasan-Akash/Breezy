export default function GET(url, contentType) {
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
            response_body: response.body,
            response_body_used: response.bodyUsed
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
              response_body: response.body,
              response_body_used: response.bodyUsed
            };
          });
        });
    }
  }