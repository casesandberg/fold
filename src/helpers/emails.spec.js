/* global describe, test, expect, jest, beforeEach */

[
  {
    before: '<div dir="ltr">Are you interested for $10k?</div><div class="gmail_extra"><br><br></div>',
    after: '<div dir="ltr">Are you interested for $10k?</div>',
  }, {
    before: '<div dir="ltr"><div>Hi - just checking in - are you still interested in <a href="http://bench.io">bench.io</a>?</div><div>Thanks,</div><div>Mike</div></div><div class="gmail_extra"><br><br></div>',
    after: '<div dir="ltr"><div>Hi - just checking in - are you still interested in <a href="http://bench.io">bench.io</a>?</div><div>Thanks,</div><div>Mike</div></div>',
  }, {
    before: '<div><div><br><div class="gmail_extra"><br></div></div></div>',
    after: '',
  }, {
    before: '<div><br></div><div>Thanks</div><div>Kush<br><br></div></div>',
    after: '<div><br></div><div>Thanks</div><div>Kush</div></div>',
  }, {
    before: '<div class="">Guntram</div><div class=""><br class=""><div></div><br class=""></div>',
    after: '<div class="">Guntram</div>',
  }, {
    before: '<div><br class=""></div>',
    after: '',
  }, {
    before: '<div><div>Thanks!</div><br class=""></div>',
    after: '<div><div>Thanks!</div></div>',
  }, {
    before: '<div><div><div><div><div><div>Thanks!</div></div></div></div></div><br class=""></div>',
    after: '<div><div><div><div><div><div>Thanks!</div></div></div></div></div></div>',
  },
]

test('FAIL: Your test suite must contain at least one test', () => {
  expect(true).toEqual(true)
})
