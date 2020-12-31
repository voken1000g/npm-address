/// <reference types="node" />
import BN from 'bn.js'

export declare function isAddress(input: String): Boolean;

export declare function fromPublicKey(input: Buffer | number[] | Uint8Array): String;

export declare function fromBNString(input: String | BN): String;

export declare function toBN(address: String): BN;

export declare class InvalidLengthError extends Error {
    code: String
}
