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
// const breeze = new Breeze();
// const { promise, cancel } = breeze.POST(
//   "https://jsonplaceholder.typicode.com/posts",
//   "json",
//   {}
// );

// promise.then((data) => console.log(data)).catch((error) => console.log(error));

// // cancel();
