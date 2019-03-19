export class StandardizedInput {
  constructor(e) {
    this.cleanEvent(e)
  }

  cleanEvent(e) {
    if (Array.isArray(e)) {
      if (e.length) {
        e = { name: e[0].name, value: e.map(v => v.value).join(',') }
      } else {
        e = { name: 'value', value: '' }
      }
    }
    // Convert form event into standardized input
    if (e.target) {
      const target = e.target
      e.name = target.name
      e.value = target.value
      e.rangeKey = target.dataset ? target.dataset.rangeKey : undefined
      e.key = target.dataset ? target.dataset.key : undefined
      e.type = target.type
    }
    this.name = e.name
    this.value = e.value
    this.rangeKey = e.rangeKey
    this.key = e.key
  }
}
