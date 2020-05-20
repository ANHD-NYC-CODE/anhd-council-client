import { configure, mount, ShallowWrapper, ReactWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
console.log('------------------------------------------  setting up global envs ')

window.scrollTo = () => {}
window.document.childNodes.length === 0
window.alert = msg => {
  console.log(msg)
}
window.matchMedia = () => ({})

var createElementNSOrig = window.document.createElementNS
window.document.createElementNS = function(namespaceURI, qualifiedName) {
  if (namespaceURI === 'http://www.w3.org/2000/svg' && qualifiedName === 'svg') {
    var element = createElementNSOrig.apply(this, arguments)
    element.createSVGRect = function() {}
    return element
  }
  return createElementNSOrig.apply(this, arguments)
}

window.matchMedia = media => ({
  addListener: () => {},
  removeListener: () => {},
  matches: media === '(min-width: 1200px)',
})

ShallowWrapper.prototype.findByTestId = function(attr) {
  let wrapper = this.find(`[data-test-id="${attr}"]`)
  if (Object.keys(arguments).length > 1) {
    Object.keys(arguments).forEach(key => {
      if (key == '0') return
      wrapper = wrapper.find(arguments[key])
    })
  }

  return wrapper
}

ReactWrapper.prototype.findByTestId = function(attr) {
  let wrapper = this.find(`[data-test-id="${attr}"]`)
  if (Object.keys(arguments).length > 1) {
    Object.keys(arguments).forEach(key => {
      if (key == '0') return
      wrapper = wrapper.find(arguments[key])
    })
  }

  return wrapper
}
