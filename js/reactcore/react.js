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

let nextWorkOfUnit = null;

function render(el, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };
  console.log("render");
  console.log(nextWorkOfUnit);
  // console.log(eleObj);
  // let ele =
  //   eleObj.type === "textElement"
  //     ? document.createTextNode("")
  //     : document.createElement(eleObj.type);
  // Object.keys(eleObj.props).forEach((key) => {
  //   if (key !== "children") {
  //     ele[key] = eleObj.props[key];
  //   }
  // });
  // container.append(ele);
  // let children = eleObj.props.children;
  // children.forEach((item) => {
  //   render(item, ele);
  // });
}

function workLoop(deadline) {
  console.log("workLoop");
  console.log(nextWorkOfUnit);
  let shouldyield = false;
  while (!shouldyield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit);

    shouldyield = deadline.timeRemaining() < 1;
    requestIdleCallback(workLoop);
  }
}

function performWorkOfUnit(work) {
  console.log("performWorkOfUnit");
  console.log(nextWorkOfUnit);
  //1、创建DOM
  if (!work.dom) {
    console.log("111");
    const dom = (work.dom =
      work.type === "textElement"
        ? document.createTextNode("")
        : document.createElement(work.type));
    work.parent.dom.append(dom);
  }

  //2、处理props
  Object.keys(work.props).forEach((key) => {
    if (key !== "children") {
      work.dom[key] = work.props[key];
    }
  });
  //3、转换链表
  const children = work.props.children;
  let prevChild = null;
  children.forEach((child, index) => {
    const netWork = {
      type: child.type,
      props: child.props,
      child: null,
      parent: work,
      sibling: null,
      dom: null,
    };
    if (index === 0) {
      work.child = netWork;
    } else {
      prevChild.sibling = netWork;
    }
    prevChild = netWork;
  });
  //4、返回下一个任务
  if (work.child) {
    return work.child;
  }

  if (work.sibling) {
    return work.sibling;
  }

  return work.parent.sibling;
}

requestIdleCallback(workLoop);

//let textObj = createTextNode("app");
//let textObj2 = createTextNode("app2");
//let eleObj = createElement("div", { id: "app" }, textObj, textObj2);

//let eleObj = createElement("div", { id: "app" }, "app", "app2");
//let container = document.getElementById("root");
//let dom = document.createElement(eleObj.type);
// dom.id = eleObj.id;
// container.append(dom);
// let textNode = document.createTextNode("");
// textNode.nodeValue = textObj.props.nodeValue;
// dom.append(textNode);

//render(eleObj, container);
export { render, createElement };
