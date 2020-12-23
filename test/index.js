// mnemonic:
// release garbage insect flush endless pizza pony mom order deliver roast eyebrow

const test = require('tape')
const address = require('../src')

const fixtures = require('./fixtures.json')

test('address', function (t) {
  t.test('fromPublicKey', function (t) {
    fixtures.fromPublicKey.forEach(function (f) {
      t.test('publicKey => address: ' + f.publicKey, function (t) {
        const actual = address.fromPublicKey(Buffer.from(f.publicKey, 'hex'))
        t.equal(actual, f.address)
        t.end()
      })
    })

    t.end()
  })

  t.test('isAddress', function (t) {
    fixtures.validAddress.forEach(function (f) {
      t.test('valid address: ' + f, function (t) {
        const actual = address.isAddress(f)
        t.equal(actual, true)
        t.end()
      })
    })

    t.end()
  })

  t.test('isAddress', function (t) {
    fixtures.invalidAddress.forEach(function (f) {
      t.test('invalid address: ' + f.address, function (t) {
        const actual = address.isAddress(f.address)
        t.equal(actual, false)
        t.end()
      })
    })

    t.end()
  })

  t.end()
})
