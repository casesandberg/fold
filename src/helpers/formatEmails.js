/* eslint-disable no-console */
import _ from 'lodash'

const parser = typeof DOMParser === 'undefined' ? {} : new DOMParser() // abort for RN

function parseHTMLString(string) {
  return parser.parseFromString(string, 'text/html')
}

export const formatEmails = plugins => (email) => {
  const doc = parseHTMLString(email)
  const log = logText => console.log('Format Email:', logText)
  _.each(plugins, plugin => plugin(doc, log))
  return doc.body.innerHTML.replace(/(<br><br>On\s.*\swrote:<br>)/, '')
}

export default formatEmails
