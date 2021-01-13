const vokenAddress = require('../src')
const privateKey = require('@voken/private-key')
const publicKey = require('@voken/public-key')
const base32 = require('@voken/base32')

const privHex = 'c3e435220cdc80514e25827c2df761b6b6b9de3ade95098b6c3a99e5142d079b'
const bufPrivateKey = Buffer.from(privHex, 'hex')
const strPrivateKey = 'vpriv' + base32.encode(bufPrivateKey)
const bufPublicKey = publicKey.fromPrivateKey(bufPrivateKey)
const address = vokenAddress.fromPublicKey(bufPublicKey)

console.log('privHex:', privHex)
console.log('bufPrivateKey:', bufPrivateKey)
console.log('strPrivateKey:', strPrivateKey)
console.log('bufPublicKey:', bufPublicKey)
console.log('address:', address)

//
// console.log(vokenAddress.isAddress('vbnjAa398KKqj6YJ174EMCAWn1ku3tnF5'))
// console.log(vokenAddress.isAddress('vbnjAa398KKqj6YJ174EMCAWn1ku3tnf5'))
// console.log(vokenAddress.fromPublicKey(Buffer.from('02038de5ca300de53a6bc109c7178d4cb4d0cb626ff824c03872c64291fd04d8fa', 'hex')))
// console.log(vokenAddress.fromBNString('533180594211303616930015660335116885729847629285'))
// console.log(vokenAddress.toBN('vbnjAa398KKqj6YJ174EMCAWn1ku3tnF5').toString())
