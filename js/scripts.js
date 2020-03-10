//  **************GLOBAL VARIABLES
let viewport
const actionWidth = 1310
function createScrollableViewport (root, children, button1Style = '', button2Style = '') {
  //  Common variables corresponding to width, height etc.
  //  Needed to set up viewport and child elements correctly
  const viewWidth = children[0].offsetWidth
  const viewHeight = children[0].offsetHeight
  //  Creating the main viewport and setting it up
  const viewport = document.createElement('div')
  while (children[0]) viewport.append(children[0])
  viewport.id = 'viewport'
  viewport.style.width = viewWidth + 'px'
  viewport.style.height = viewHeight + 'px'
  //  Creating the switching buttons
  const arrowLeft = document.createElement('button')
  const arrowRight = document.createElement('button')
  arrowLeft.className = button1Style
  arrowRight.className = button2Style
  arrowRight.id = 'arrowRight'
  arrowRight.value = 'RIGHT'
  arrowRight.style.height = viewHeight / 2 + 'px'
  arrowLeft.style.height = viewHeight / 2 + 'px'
  arrowLeft.id = 'arrowLeft'
  arrowLeft.value = 'LEFT'
  arrowLeft.onclick = () => {
    viewport.scrollBy(-viewWidth, 0)
  }
  arrowRight.onclick = () => {
    viewport.scrollBy(viewWidth, 0)
  }
  // Decorating switch buttons
  const arrowLeftDec = document.createElement('div')
  const arrowRightDec = document.createElement('div')
  arrowLeftDec.id = 'arrowLeftDec'
  arrowRightDec.id = 'arrowRightDec'
  arrowLeft.append(arrowLeftDec)
  arrowRight.append(arrowRightDec)
  //  Insertion into the parent container
  root.append(viewport)
  root.append(arrowRight)
  root.prepend(arrowLeft)
  return viewport
}
function executer (condition, callbackTrue, callbackFalse) {
  return function () {
    if (condition()) {
      callbackTrue()
    } else { callbackFalse() }
  }
}
function ifSmallSreenWidth () {
  if (document.documentElement.clientWidth < actionWidth) return true
  else return false
}
function diminishChildren (root) {
  if (!viewport) {
    let children
    if (root) children = root.children
    else throw new Error('window.onload: root is undefined!')
    viewport = createScrollableViewport(root, children, 'buttonStyle', 'buttonStyle')
  }
}
function extendChildren (viewport, root, childrenToRemove) {
  if (viewport) {
    //  DELETE THE BUTTONS
    while (childrenToRemove[0]) {
      childrenToRemove[0].remove()
    }
    //  INSERT ELEMENTS WITH CONTENTS INTO THE PARENT CONTAINER
    while (viewport.firstChild) root.append(viewport.firstChild)
    //  DELETE THE VIEWPORT ITSELF
    viewport.remove()
    viewport = undefined
  }
}
window.onload = () => {
  const rootSection1 = document.getElementById('section1-fungus-consequences')
  const rootSection2 = document.querySelector('section2-false-medicines')
  console.log('rootSection1' + rootSection1)
  executer(ifSmallSreenWidth, diminishChildren(rootSection1), extendChildren(viewport, rootSection1, rootSection1.querySelectorAll('button')))
  // FIXME: executer does not work on section 2 properly, fix it
  executer(ifSmallSreenWidth, diminishChildren(rootSection2), extendChildren(viewport, rootSection2, rootSection2.querySelectorAll('section2-false-medicines-fieldset')))
  console.log("rootSection2.querySelectorAll('section2-false-medicines-fieldset')" + rootSection2.querySelectorAll('section2-false-medicines-fieldset'))
}

// window.onload = executer(ifSmallSreenWidth, diminishChildren(rootSection1), extendChildren(viewport, rootSection1, rootSection1.querySelectorAll('button')))

window.onresize = () => {
  const rootSection1 = document.getElementById('section1-fungus-consequences')
  const rootSection2 = document.querySelector('section2-false-medicines')
  return function () {
    executer(ifSmallSreenWidth, diminishChildren(rootSection1), extendChildren(viewport, rootSection1, rootSection1.querySelectorAll('button')))
    executer(ifSmallSreenWidth, diminishChildren(rootSection2), extendChildren(viewport, rootSection2, rootSection2.querySelectorAll('section2-false-medicines-fieldset')))
  }
}
