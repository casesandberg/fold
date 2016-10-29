import _ from 'lodash'

// http://stackoverflow.com/questions/2385347/how-to-remove-the-quoted-text-from-an-email-and-only-show-the-new-text

function parseHTMLString(string) {
  const parser = new DOMParser()
  return parser.parseFromString(string, 'text/html')
}

export const chopQuotedText = (string) => {
  const doc = parseHTMLString(string)

  const elementsToRemove = [
    ...doc.querySelectorAll('blockquote'),
    ...doc.querySelectorAll('.gmail_quote'),
  ]

  _.each(elementsToRemove, (quote) => {
    quote.parentNode && quote.parentNode.removeChild(quote)
  })
  return doc.body.innerHTML.replace(/(<br><br>On\s.*\swrote:<br>)/, '')
}
