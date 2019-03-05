export class ConditionFilter {
  constructor({ conditionGroup = undefined } = {}) {
    this._conditionGroup = conditionGroup
  }

  get conditionGroup() {
    return this._conditionGroup
  }

  set conditionGroup(conditionGroup) {
    this._conditionGroup = conditionGroup
  }
}
