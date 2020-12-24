const BN = require('bn.js')
const crypto = require('crypto')
const base32 = require('@voken/base32')

const isAddress = function (address) {
  try {
    const addr32 = _addressToAddr32(address)

    return base32.isChecksum(addr32)
  } catch {
    return false
  }
}

const fromPublicKey = function (publicKey) {
  const hash20 = _publicKeyToHash20(publicKey)
  const addr32 = base32.encode(hash20)

  return _addr32ToAddress(addr32)
}

const fromBN = function (uint160String) {
  let bnArr = new BN(uint160String).toArray()

  if (bnArr.length > 20) {
    throw EvalError('uint160 overflow')
  }

  while (bnArr.length < 20) {
    bnArr.unshift(0)
  }

  let addr32 = base32.encode(Buffer.from(bnArr))

  return _addr32ToAddress(addr32)
}

const addressToBN = function (address) {
  try {
    const addr32 = _addressToAddr32(address)
    const hash20 = base32.decode(addr32)

    return new BN(hash20)
  } catch {
    return false
  }
}

const _sha256 = function (value) {
  return crypto.createHash('sha256').update(value).digest()
}

const _publicKeyToHash20 = function (publicKey) {
  if (publicKey.length === 33) {
    return _sha256(publicKey).slice(-20)
  }

  throw EvalError('public key length should be 33, which is compressed')
}

const _addr32ToAddress = function (addr32) {
  return 'v' + addr32
}

const _addressToAddr32 = function (address) {
  if (address.length !== 33) {
    throw new EvalError('address length does not match')
  }

  if (address.slice(0, 1) !== 'v') {
    throw new EvalError('address should start with `v`')
  }

  return address.slice(1)
}

module.exports = {
  isAddress: isAddress,
  fromPublicKey: fromPublicKey,
  fromBN: fromBN,
  addressToBN: addressToBN
}
