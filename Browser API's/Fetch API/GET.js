export default function GET(url, contentType, timeout = 60000) {
  const controller = new AbortController();
  const signal = controller.signal;

  const promise = new Promise((resolve, reject) => {
    let headers = {};
    if (contentType == "json") {
      headers = { "Content-Type": "application/json" };
    } else if (contentType == "xml") {
      headers = { "Content-Type": "application/xml" };
    }
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject("Breeze:- Request timed out");
    }, timeout);

    fetch(url, {
      method: "GET",
      headers,
      signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        if (response.ok) {
          if (contentType == "json") {
            return response.json().then((json) => {
              resolve({
                json_response: json,
                status: response.status,
                response_type: response.type,
                response_header: response.headers,
                response_body: response.body,
                response_body_used: response.bodyUsed,
              });
            });
          } else if (contentType == "xml") {
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
                response_body_used: response.bodyUsed,
              });
            });
          } else {
            resolve({
              status: response.status,
              response_type: response.type,
              response_header: response.headers,
              response_body: response.body,
              response_body_used: response.bodyUsed,
            });
          }
        } else {
          reject(response.status + " " + response.statusText);
        }
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        if (error.name === "AbortError") {
          reject("Request was cancelled");
        } else {
          reject(error);
        }
      });
  });
  return { promise, cancel: () => controller.abort() };
}