export default function GET(url, contentType, timeout = 60000) {
  const controller = new AbortController();
  const signal = controller.signal;

  const promise = new Promise((resolve, reject) => {
    if (contentType == "json") {
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal
      })
        .then((response) => {
          return response.json().then((json) => {
            resolve({
              json_response: json,
              status: response.status,
              response_type: response.type,
              response_header: response.headers,
              response_body: response.body,
              response_body_used: response.bodyUsed
            });
          });
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            reject("Request was cancelled");
          } else {
            reject(error);
          }
        });
    } else if (contentType == "xml") {
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/xml" },
        signal
      })
        .then((response) => {
          return response.text().then((xml) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "text/xml");
            const serializer = new XMLSerializer();
            const xmlStr = serializer.serializeToString(xmlDoc);
            resolve({
              xml_response: xmlStr,
              status: response.status,
              response_type: response.type,
              response_header: response.headers,
              response_body: response.body,
              response_body_used: response.bodyUsed
            });
          });
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            reject("Request was cancelled");
          } else {
            reject(error);
          }
        });
    }
  });

  setTimeout(() => {controller.abort(); console.log("Breezy:- Response Timed Out")}, timeout)

  return { promise, cancel: () => {controller.abort(); console.log("Breezy:- Request Cancelled")} };
}