window.L = require('leaflet')
var createElementNSOrig = window.document.createElementNS
window.document.createElementNS = function(namespaceURI, qualifiedName) {
  if (namespaceURI === 'http://www.w3.org/2000/svg' && qualifiedName === 'svg') {
    var element = createElementNSOrig.apply(this, arguments)
    element.createSVGRect = function() {}
    element.layerAdd = function() {}
    element.removePath = function() {}

    return element
  }
  return createElementNSOrig.apply(this, arguments)
}

window.layerAdd = function() {}
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => {
    return {
      fillRect: function() {},
      clearRect: function() {},
      putImageData: function() {},
      createImageData: function() {
        return []
      },
      setTransform: function() {},
      drawImage: function() {},
      save: function() {},
      fillText: function() {},
      restore: function() {},
      beginPath: function() {},
      moveTo: function() {},
      lineTo: function() {},
      closePath: function() {},
      stroke: function() {},
      translate: function() {},
      scale: function() {},
      rotate: function() {},
      arc: function() {},
      fill: function() {},
      transform: function() {},
      rect: function() {},
      clip: function() {},
    }
  },
})
