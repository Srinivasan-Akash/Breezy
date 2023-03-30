export default function PUT(url, contentType, data, timeout = 60000) {
  const controller = new AbortController();
  const signal = controller.signal;

  const promise = new Promise((resolve, reject) => {
    let headers = {};

    let body = data;
    if (contentType == "json") {
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify(data);
    } else if (contentType == "xml") {
      headers = { "Content-Type": "application/xml" };
    } else if (contentType == "form-data") {
      headers = {};
      body = new FormData();
      for (let key in data) {
        body.append(key, data[key]);
      }
    } else if (contentType == "array-buffer") {
      headers = {};
      body = new ArrayBuffer(data.length);
      let uint8View = new Uint8Array(body);
      for (let i = 0; i < data.length; i++) {
        uint8View[i] = data[i];
      }
    } else if (contentType == "blob") {
      headers = {};
      body = new Blob([data], { type: "application/octet-stream" });
    }
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject("Breeze:- Request timed out");
    }, timeout);

    fetch(url, {
      method: "PUT",
      headers,
      body,
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
