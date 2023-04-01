# 🌬️ Breezy
Breezy is a light-weight yet powerful HTTP library that simplifies working with APIs. Here are some of its features:

## 🚀 Features
    1. 👉 Breezy can make XMLHttpRequests from the browser.
    2. 👉 Supports Promise Chaining.
    3. 👉 Automatically transforms request and response data to JSON, XML, ArrayBuffer, Blob, and form-data.
          Can cancel requests.
    4. 👉 Has a request timeout.
    5. 👉 Automatic request body serialization to various formats, including JSON, form-data, Array Buffer, Blob, and XML.
    6. 👉 Automatic JSON/XML data handling in response.
    7. 👉 Progress capturing for the browser with extra information such as speed rate, time remaining, bytes, 
       percentage completed, etc.
    8. 👉 Compatible with Spec-Complaint FormData and Blob.
    9. 👉 Throws More Understandeable Errors

## 🚧 Coming Soon
    1. 👉 Support for Node.js.
    2. 👉 Intercept request and response.
    3. 👉 Client-side support for protecting against XSRF.
    4. 👉 Setting bandwidth limits for Node.js.
    5. 👉 Reducing package size.
    6. 👉 Automatic response body serialization to various formats, including JSON, form-data, 
       Array Buffer, Blob, and XML.
    7. 👉 Create instances.

**NOTE:** If you have any feature requests, please contact us via prashanthiakash@gmail.com or 7676856815. You will be rewarded from $5-$500.

## 🎬 Getting Started
### 💨 Installing
1) 👉 Using NPM:
```
Currently Not Avaliable
```
2) 👉 Using Bower:
```
Currently Not Avaliable
```
3) 👉 Using Yarn:
```
Currently Not Avaliable
```
4) 👉 Using PNPM:
```
Currently Not Avaliable
```
5) 👉 Using jsDeliver CDN:
```
Currently Not Avaliable
```
6) 👉 Using unpkg CDN:
```
Currently Not Avaliable
```
7) 👉 Direct Code Files:
```
git clone https://github.com/Srinivasan-Akash/Breezy.git
```
### 👋 Introduction
#### 🧪 Examples
Below is a very simple example with as less code as possible. We are just sending an POST request to an api

##### INPUT:-
```
// Initialize
const breeze = new Breezy();

// Variables (optional)
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const CONTENT_TYPE = "json";

// GET Request
const { promise, cancel } = breeze.GET(
  API_URL,
  CONTENT_TYPE,
);

// Handle GET Request
promise.then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
});
```

##### OUTPUT:-
<img width="759" alt="01 04 2023_20 06 03_REC" src="https://user-images.githubusercontent.com/108281031/229295648-38c10909-8eac-4600-9ae1-4b774f0bbdbb.png">

Below Is The Response Structure:-
1. `json_response` is the json data from the API
2. `response_body_used` is a boolean value to show if body is recieved before or not
3. `response_headers` is the headers from the API
4. `response_type` show what response it is like cors, void etc...
5. `status` is the status code recieved from the API
6. `response_body` is a readablestream of the body which can be read if not locked
```
{
    "json_response": [{"userId": 1, "id": 1, "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "body": "quia et suscipit\nsuscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto"}],
    "response_body": ReadableStream {locked: true},
    "response_body_used": true,
    "response_header": {
        "cache-control": "no-cache",
        "content-length": "15",
        "content-type": "application/json; charset=utf-8",
        "expires": "-1",
        "location": "http://jsonplaceholder.typicode.com/posts/101",
        "pragma": "no-cache"
    },
    "response_type": "",
    "status": 201
}
```

#### ⚒ Simple PATCH/POST/PUT/DELETE Request
##### GET Request:-
```
// Initialize
const breeze = new Breezy();

// Variables (optional)
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const CONTENT_TYPE = "json";

// GET Request
const { promise, cancel } = breeze.GET(
  API_URL,
  CONTENT_TYPE
);

// Handle GET Request
promise.then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
});
```

##### POST Request:-
```
// Initialize
const breeze = new Breezy();

// Variables (optional)
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const CONTENT_TYPE = "json";
const BODY = {}

// POST Request
const { promise, cancel } = breeze.POST(
  API_URL,
  CONTENT_TYPE,
  BODY
);

// Handle POST Request
promise.then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
});
```
### 📝 Breezy API
#### 1. 👉 Request Config & Response Schema
##### Request Config
Request Config tells all the parameters which are necessarry or optional these can be used in all request types (POST, GET, PATCH, DELETE, PUT) but there are some exceptions for GET request
```
// Initialize
const breeze = new Breezy();
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const CONTENT_TYPE = "json";
const TIMEOUT = 10000 // (In Milli Seconds) (Optional Parameter) Timeout so it cancels request if response does not come it given time default is 1min

// Will atomatically tranform to json by Breezy
const BODY = {
    id: 1,
    title: "foo",
    body: "bar",
    userId: 1,
}

const onProgress = (progress, loaded, total) => { // loaded and total are in bytes
  console.log(`Progress: ${progress}%`); // Output the progress in percent
};

// PUT Request
const { promise, cancel } = breeze.PUT( // cancel is a function when called cancels request
  API_URL,
  CONTENT_TYPE,
  BODY,
  TIMEOUT,
  onProgress // Call Back Function
);

// data is directly converted to json
promise.then((data) => console.log(data)).catch((error) => console.log(error));
```
##### Response Schema
<img width="759" alt="01 04 2023_20 06 03_REC" src="https://user-images.githubusercontent.com/108281031/229295648-38c10909-8eac-4600-9ae1-4b774f0bbdbb.png">

Below Is The Response:-
1. `json_response` is the json data from the API
2. `response_body_used` is a boolean value to show if body is recieved before or not
3. `response_headers` is the headers from the API
4. `response_type` show what response it is like cors, void etc...
5. `status` is the status code recieved from the API
6. `response_body` is a readablestream of the body which can be read if not locked
```
{
    "json_response": [{"userId": 1, "id": 1, "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "body": "quia et suscipit\nsuscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto"}],
    "response_body": ReadableStream {locked: true},
    "response_body_used": true,
    "response_header": {
        "cache-control": "no-cache",
        "content-length": "15",
        "content-type": "application/json; charset=utf-8",
        "expires": "-1",
        "location": "http://jsonplaceholder.typicode.com/posts/101",
        "pragma": "no-cache"
    },
    "response_type": "",
    "status": 201
}
```

#### 2. 👉 Cancel Request
To cancel Request Just call the `cancel()` function. Here we can use this in various places for example:-
1. Providing users the ability to cancel a pending request
2. Aborting an ongoing request when a user leaves a page
3. Canceling pending requests before making a new one when the input changes
4. Handling scenarios where the client or server times out
5. Using service workers to intercept and cache requests etc....

Here to mimic such situation we have called the cancel function in 100ms but you can create a button and onclick you can cancel the request and many things like that
##### INPUT:-
```
// Initialize
const breeze = new Breezy();

// Variables (optional)
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const CONTENT_TYPE = "json";

// GET Request
const { promise, cancel } = breeze.GET(
  API_URL,
  CONTENT_TYPE
);

setTimeout(() => cancel(), 100)

// Handle GET Request
promise.then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
});
```
##### OUTPUT:-
<img width="759" alt="01 04 2023_20 37 54_REC" src="https://user-images.githubusercontent.com/108281031/229297344-4ece454a-a68c-43b4-9c81-8412e7f05546.png">
#### 3. 👉 Set Timeouts
#### 4. 👉 getProgress()
#### 5. 👉 Interceptors
#### 6. 👉 Handling Errors
#### 7. 👉 Array Buffers, Blobs, Form-Data, XML

## 📚 Additional Information
### 👩‍💻 Code Of Conduct
### 🧾 Collaborator Guides
### 💲 or 👩‍💻 Contribute To Breezy
### 📝 Notes
#### 1. Semver
#### 2. Promises
#### 3. Type Script
#### 4. Resources
#### 5. Credits
#### 6. License 
