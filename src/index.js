const BN = require('bn.js')
const base32 = require('@voken/base32')
const publicKey = require('@voken/public-key')
const sha = require('@voken/sha')

const isAddress = function (input) {
  try {
    const addr32 = _addressToAddr32(input)

    return base32.isChecksum(addr32)
  } catch {
    return false
  }
}

const fromPublicKey = function (input) {
  const bufPublicKey = publicKey.compress(input)

  const hash20 = sha.sha256(bufPublicKey).slice(-20)
  const addr32 = base32.encode(hash20)

  return _addr32ToAddress(addr32)
}

const fromBNString = function (input) {
  let bnArray = new BN(input).toArray()

  if (bnArray.length > 20) {
    throw EvalError('uint160 overflow')
  }

  while (bnArray.length < 20) {
    bnArray.unshift(0)
  }

  const addr32 = base32.encode(Buffer.from(bnArray))

  return _addr32ToAddress(addr32)
}

const toBN = function (address) {
  const addr32 = _addressToAddr32(address)
  const hash20 = base32.decode(addr32)

  return new BN(hash20)
}

const _addr32ToAddress = function (addr32) {
  return 'v' + addr32
}

const _addressToAddr32 = function (address) {
  if (address.length !== 33) {
    throw new InvalidLengthError('The length of a VOKEN address must be `33`')
  }

  if (address.slice(0, 1) !== 'v') {
    throw new EvalError('A VOKEN address must start with `v`')
  }

  return address.slice(1)
}

class InvalidLengthError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidLengthError";
    this.code = 'INVALID_LENGTH'
  }
}

module.exports = {
  isAddress: isAddress,
  fromPublicKey: fromPublicKey,
  fromBNString: fromBNString,
  toBN: toBN,

  InvalidLengthError: InvalidLengthError,
}
