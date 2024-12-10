const nacl = require("tweetnacl");
const bs58 = require("bs58");
const { MESSAGE } = require("../../config/envs");

class SolanWeb3Helper {
  constructor() {
    this.message = MESSAGE;
  }

  verifyPublicAddressForSignature(publicKey, signature) {
    const verified = nacl.sign.detached.verify(
      new TextEncoder().encode(this.message),
      bs58.decode(signature),
      bs58.decode(publicKey)
    );
    return verified;
  }
}

module.exports = SolanWeb3Helper;
