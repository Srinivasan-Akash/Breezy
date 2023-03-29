export default function POST(url, contentType, data) {
  const controller = new AbortController();
  const signal = controller.signal;

  const promise = new Promise((resolve, reject) => {
    if (contentType == "json") {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: data,
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

  return { promise, cancel: () => controller.abort() };
}