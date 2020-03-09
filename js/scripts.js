//  **************GLOBAL VARIABLES
let viewport;
const actionWidth = 1310;
function createScrollableViewport (root, children, button1Style = '', button2Style = '') {
  //  Common variables corresponding to width, height etc.
  //  Needed to set up viewport and child elements correctly
  const viewWidth = children[0].offsetWidth;
  const viewHeight = children[0].offsetHeight;
  //  Creating the main viewport and setting it up
  const viewport = document.createElement('div')
  while (children[0]) viewport.append(children[0]);
  viewport.id = 'viewport';
  viewport.style.width = viewWidth + 'px';
  viewport.style.height = viewHeight + 'px';
  //  Creating the switching buttons
  const arrowLeft = document.createElement('button');
  const arrowRight = document.createElement('button');
  arrowLeft.className = button1Style;
  arrowRight.className = button2Style;
  arrowRight.id = 'arrowRight';
  arrowRight.value = 'RIGHT';
  arrowRight.style.height = viewHeight / 2 + 'px';
  arrowLeft.style.height = viewHeight / 2 + 'px';
  arrowLeft.id = 'arrowLeft';
  arrowLeft.value = 'LEFT';
  arrowLeft.onclick = () => {
    viewport.scrollBy(-viewWidth, 0);
  }
  arrowRight.onclick = () => {
    viewport.scrollBy(viewWidth, 0);
  }
  // Decorating switch buttons
  const arrowLeftDec = document.createElement('div')
  const arrowRightDec = document.createElement('div')
  arrowLeftDec.id = 'arrowLeftDec'
  arrowRightDec.id = 'arrowRightDec'
  arrowLeft.append(arrowLeftDec)
  arrowRight.append(arrowRightDec)
  //  Insertion into the parent container
  root.append(viewport);
  root.append(arrowRight);
  root.prepend(arrowLeft);
  return viewport;
}
function executer (condition, callbackTrue, callbackFalse) {
  return function () {
    if (condition()) {
      callbackTrue()
    } else { callbackFalse() }
  }
}
function ifSmallSreenWidth () {
  if (document.documentElement.clientWidth < actionWidth) return true;
  else return false;
}
function diminishChildren () {
  if (!viewport) {
    const root = document.getElementById('section1-fungus-consequences');
    let children;
    if (root) children = root.children;
    else throw new Error('window.onload: root is undefined!');
    viewport = createScrollableViewport(root, children, 'buttonStyle', 'buttonStyle');
  }
}
function extendChildren () {
  if (viewport) {
    const root = document.getElementById('section1-fungus-consequences');
    const rootToRemove = root.getElementsByTagName('button');
    //  DELETE THE BUTTONS
    console.log(rootToRemove)
    while (rootToRemove[0]) {
      rootToRemove[0].remove()
    }
    //  INSERT ELEMENTS WITH CONTENTS INTO THE PARENT CONTAINER
    while (viewport.firstChild) root.append(viewport.firstChild);
    //  DELETE THE VIEWPORT ITSELF
    viewport.remove();
    viewport = undefined;
  }
}
window.onload = executer(ifSmallSreenWidth, diminishChildren, extendChildren);
window.onresize = executer(ifSmallSreenWidth, diminishChildren, extendChildren);
