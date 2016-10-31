import _ from 'lodash'

// http://stackoverflow.com/questions/2385347/how-to-remove-the-quoted-text-from-an-email-and-only-show-the-new-text

function parseHTMLString(string) {
  const parser = new DOMParser()
  return parser.parseFromString(string, 'text/html')
}

function chopQuotedText(doc) {
  const elementsToRemove = [
    ...doc.querySelectorAll('blockquote'),
    ...doc.querySelectorAll('.gmail_quote'),
  ]

  _.each(elementsToRemove, (quote) => {
    quote.parentNode && quote.parentNode.removeChild(quote)
  })
}

function resizeLargeTables(doc) {
  const elementsToResize = [
    ...doc.querySelectorAll('table'),
    ...doc.querySelectorAll('div'),
    ...doc.querySelectorAll('td'),
  ]

  _.map(elementsToResize, (el) => {
    if (el.width > 599 || parseInt(el.style.width, 10) > 599) {
      console.log('LARGE RESIZE') // eslint-disable-line no-console
      el.style.width = 'auto' // eslint-disable-line no-param-reassign
      el.style.maxWidth = '600px' // eslint-disable-line no-param-reassign
    }
  })
}

function resizeImages(doc) {
  const elementsToResize = [
    ...doc.querySelectorAll('img'),
  ]
  _.map(elementsToResize, (el) => {
    if (el.width === 0 || el.width > 599) {
      console.log('IMAGE RESIZE') // eslint-disable-line no-console
      el.style.maxWidth = '100%' // eslint-disable-line no-param-reassign
      el.style.height = 'auto' // eslint-disable-line no-param-reassign
    }
  })
}

export const formatEmail = (string) => { // eslint-disable-line
  if (typeof DOMParser === 'undefined') { return string } // Abort for RN
  const doc = parseHTMLString(string)

  chopQuotedText(doc)
  resizeLargeTables(doc)

  // experimental (messes with complex newsletters)
  resizeImages(doc)

  return doc.body.innerHTML.replace(/(<br><br>On\s.*\swrote:<br>)/, '')
}
