import _ from 'lodash';

export class Util {
  static _generateRandomCodeDigit() {
    var _bitcoinBase58Alphabet =
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    // TODO: use a secure PRG instead of Math.random.
    return _bitcoinBase58Alphabet[
      Math.floor(Math.random() * _bitcoinBase58Alphabet.length)
    ];
  }

  // Generate a random code of the given length of base58 human-readable symbols
  static generateRandomCode(length) {
    return _.times(length, Util._generateRandomCodeDigit).join('');
  }
}
