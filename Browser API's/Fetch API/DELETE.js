export default function DELETE(url, contentType) {
  const controller = new AbortController();
  const signal = controller.signal;

  if (contentType == "json") {
    return {
      promise: fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        signal,
      }).then((response) => {
        return response.json().then((json) => {
          return {
            json_response: json,
            status: response.status,
            response_type: response.type,
            response_header: response.headers,
            response_body: response.body,
            response_body_used: response.bodyUsed,
          };
        });
      }),
      cancel: () => controller.abort(),
    };
  } else if (contentType == "xml") {
    return {
      promise: fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/xml" },
        signal,
      }).then((response) => {
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
            response_body_used: response.bodyUsed,
          };
        });
      }),
      cancel: () => controller.abort(),
    };
  }
}