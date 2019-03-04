export class StandardizedInput {
  constructor(e) {
    this._value = this.cleanEvent(e)
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
    }

    return { name: e.name, value: e.value }
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
  }
}
