import GET from "./Browser API's/Fetch API/GET.js";
import POST from "./Browser API's/Fetch API/POST.js";
import DELETE from "./Browser API's/Fetch API/DELETE.js";
import PUT from "./Browser API's/Fetch API/PUT.js";
import PATCH from "./Browser API's/Fetch API/PATCH.js";

export default class Breeze {
  constructor() {}
  GET = GET;
  POST = POST;
  DELETE = DELETE;
  PUT = PUT;
  PATCH = PATCH;
}
// Useage
const breeze = new Breeze();

const onProgress = (progress, loaded, total) => {
  console.log(`Progress: ${progress}%`); // Output the progress
};

const { promise, cancel } = breeze.GET(
  "https://jsonplaceholder.typicode.com/posts",
  "json",
  {},
  10000,
  onProgress
);

promise.then((data) => console.log(data)).catch((error) => console.log(error));
