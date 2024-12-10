const CryptoJS = require('crypto-js');
const { SECURITY_KEY_HEX } = require('../../config/envs');


// eslint-disable-next-line max-len
const decrypt = (value) => new Promise((resolve, reject) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(value, SECURITY_KEY_HEX).toString(CryptoJS.enc.Utf8);
    resolve(decrypted);
  } catch (error) {
    reject(error);
  }
});
module.exports = { decrypt };
