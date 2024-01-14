function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((item) => {
        return typeof item === "string" ? createTextNode(item) : item;
      }),
    },
  };
}

function createTextNode(text) {
  return {
    type: "textElement",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(eleObj, container) {
  console.log(eleObj);
  let ele =
    eleObj.type === "textElement"
      ? document.createTextNode("")
      : document.createElement(eleObj.type);

  Object.keys(eleObj.props).forEach((key) => {
    if (key !== "children") {
      ele[key] = eleObj.props[key];
    }
  });
  container.append(ele);
  let children = eleObj.props.children;
  children.forEach((item) => {
    render(item, ele);
  });
}

let textObj = createTextNode("app");
let textObj2 = createTextNode("app2");
//let eleObj = createElement("div", { id: "app" }, textObj, textObj2);

let eleObj = createElement("div", { id: "app" }, "app", "app2");
let container = document.getElementById("root");
//let dom = document.createElement(eleObj.type);
// dom.id = eleObj.id;
// container.append(dom);
// let textNode = document.createTextNode("");
// textNode.nodeValue = textObj.props.nodeValue;
// dom.append(textNode);

//render(eleObj, container);
export { render, createElement };
