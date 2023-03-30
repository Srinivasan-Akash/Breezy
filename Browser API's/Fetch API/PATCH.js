export default function PATCH(url, contentType, data, timeout = 60000, onProgress = () => {}) {
  let xhr;

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

    xhr = new XMLHttpRequest();
    xhr.open("PATCH", url);
    xhr.timeout = timeout;
    xhr.withCredentials = true;

    for (let header in headers) {
      xhr.setRequestHeader(header, headers[header]);
    }

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = ((event.loaded/event.total) * 100);
        onProgress(percent, event.loaded, event.total);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const responseHeaders = {};
        xhr.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach(function(line) {
          const parts = line.split(': ');
          const header = parts.shift();
          const value = parts.join(': ');
          responseHeaders[header] = value;
        });
        let responseBody = xhr.response;
        if (contentType == "json") {
          responseBody = JSON.parse(responseBody);
        } else if (contentType == "xml") {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(responseBody, "text/xml");
          const serializer = new XMLSerializer();
          responseBody = serializer.serializeToString(xmlDoc);
        }
        resolve({
          status: xhr.status,
          response_type: xhr.responseType,
          response_header: responseHeaders,
          response_body: responseBody,
          response_body_used: xhr.responseURL ? true : false
        });
      } else {
        reject(new Error(`${xhr.status} ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Breeze:- Network Error"));
    };

    xhr.ontimeout = () => {
      reject(new Error("Breeze:- Request timed out"));
    };

    xhr.onabort = () => {
      reject(console.log("Breeze:- Request was cancelled"));
    };

    xhr.send(body);
  });

  return { promise, cancel: () => xhr.abort() };
}