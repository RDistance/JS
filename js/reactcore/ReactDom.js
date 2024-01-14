import { render } from "./react.js";

let ReactDom = {
  createRoot: function (container) {
    return {
      render: function (App) {
        render(App, container);
      },
    };
  },
};
export default ReactDom;
