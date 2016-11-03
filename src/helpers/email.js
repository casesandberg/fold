/* eslint-disable no-param-reassign */
// http://stackoverflow.com/questions/2385347/how-to-remove-the-quoted-text-from-an-email-and-only-show-the-new-text
import _ from 'lodash'
import formatEmails from './formatEmails'

function chopEmailReplies(doc, log) {
  const elements = [
    ...doc.querySelectorAll('blockquote'),
    ...doc.querySelectorAll('.gmail_quote'),
  ]

  _.each(elements, (quote) => {
    log('chopEmailReplies')
    quote.parentNode && quote.parentNode.removeChild(quote)
  })
}

function resizeLargeElements(doc, log) {
  const elements = [
    ...doc.querySelectorAll('table'),
    ...doc.querySelectorAll('div'),
    ...doc.querySelectorAll('td'),
  ]

  _.each(elements, (el) => {
    if (el.width > 599 || parseInt(el.style.width, 10) > 599) {
      log('resizeLargeElements')
      el.style.width = 'auto' //
      el.style.maxWidth = '600px'
    }
  })
}

function resizeImages(doc, log) {
  const elements = [
    ...doc.querySelectorAll('img'),
  ]

  _.each(elements, (el) => {
    if ((el.width === 0 && el.height !== 0) || el.width > 599) {
      log('resizeImages')
      el.style.maxWidth = '100%'
      el.style.height = 'auto'
    }
  })
}

export const formatEmail = (email) => {
  if (typeof DOMParser === 'undefined') { return email } // Abort for RN

  return formatEmails({
    chopEmailReplies,
    resizeLargeElements,
    // Experimental
    resizeImages, // messes with complex newsletters
  })(email)
}
