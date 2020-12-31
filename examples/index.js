const vokenAddress = require('../src')

console.log(vokenAddress.isAddress('vbnjAa398KKqj6YJ174EMCAWn1ku3tnF5'))
console.log(vokenAddress.isAddress('vbnjAa398KKqj6YJ174EMCAWn1ku3tnf5'))
console.log(vokenAddress.fromPublicKey(Buffer.from('02038de5ca300de53a6bc109c7178d4cb4d0cb626ff824c03872c64291fd04d8fa', 'hex')))
console.log(vokenAddress.fromBNString('533180594211303616930015660335116885729847629285'))
console.log(vokenAddress.toBN('vbnjAa398KKqj6YJ174EMCAWn1ku3tnF5').toString())
