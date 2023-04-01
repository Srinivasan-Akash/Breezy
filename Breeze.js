import GET from "./Browser API's/Fetch API/GET.js";
import POST from "./Browser API's/Fetch API/POST.js";
import DELETE from "./Browser API's/Fetch API/DELETE.js";
import PUT from "./Browser API's/Fetch API/PUT.js";
import PATCH from "./Browser API's/Fetch API/PATCH.js";

export default class Breezy {
  constructor() {}
  GET = GET;
  POST = POST;
  DELETE = DELETE;
  PUT = PUT;
  PATCH = PATCH;
}
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