import ReactDom from "./ReactDom.js";
import { createElement } from "./react.js";
const App = createElement("div", { id: "app" }, "app", "app2");
ReactDom.createRoot(document.querySelector("#app")).render(App);
