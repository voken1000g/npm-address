const BN = require('bn.js')
const crypto = require('crypto')
const base32 = require('@voken/base32')

const isAddress = function (address) {
  try {
    const addr32 = _addressToAddr32(address)
    const checksumAddress = _addr32ToChecksumAddress(addr32)

    return (address === checksumAddress)
  } catch {
    return false
  }
}

const fromPublicKey = function (publicKey) {
  const hash20 = _publicKeyToHash20(publicKey)
  const addr32 = _hash20ToAddr32(hash20)

  return _addr32ToChecksumAddress(addr32)
}

const fromBN = function (uint160String) {
  let bnArr = new BN(uint160String).toArray()

  if (bnArr.length > 20) {
    throw EvalError('uint160 overflow')
  }

  while (bnArr.length < 20) {
    bnArr.unshift(0)
  }

  const buffer = Buffer.from(bnArr)
  let addr32 = _hash20ToAddr32(buffer)

  return _addr32ToChecksumAddress(addr32)
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

const _hash20ToAddr32 = function (hash20) {
  return base32.encode(hash20)
}

const _addr32ToChecksumAddress = function (addr32) {
  const hash32 = _sha256(addr32)
  const addr32Array = addr32.split('')

  let address = 'v'
  addr32Array.forEach(function (c, i) {
    if (hash32[i] > 127) {
      address = address + c.toUpperCase()
    } else {
      address = address + c
    }
  })

  return address
}

const _addressToAddr32 = function (address) {
  if (address.length !== 33) {
    throw new EvalError('address length does not match')
  }

  if (address.slice(0, 1) !== 'v') {
    throw new EvalError('address should start with `v`')
  }

  return address.slice(1).toLowerCase()
}

module.exports = {
  isAddress: isAddress,
  fromPublicKey: fromPublicKey,
  fromBN: fromBN,
  addressToBN: addressToBN
}
