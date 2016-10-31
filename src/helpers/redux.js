import _ from 'lodash'

export const scopeStateToSelectors = (selectorsMap) => {
  return _.reduce(selectorsMap, (result, selectors, scope) => {
    _.each(selectors, (selector, selectorName) => {
      result[selectorName] = (state, ...rest) => { // eslint-disable-line no-param-reassign
        return selector(state[scope], ...rest)
      }
    })
    return result
  }, {})
}
