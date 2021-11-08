/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-require-imports */

const protobufjs = require('protobufjs');

const encoder = require('./encoder');

const { Writer, Reader, Enum, wrappers, util, types, Type, decoder, verifier, converter } = protobufjs;

/**
 * Sets up {@link Type#encode|encode}, {@link Type#decode|decode} and {@link Type#verify|verify}.
 * @returns {Type} `this`
 */
 Type.prototype.setup = function setup() {
  // Sets up everything at once so that the prototype chain does not have to be re-evaluated
  // multiple times (V8, soft-deopt prototype-check).

  var fullName = this.fullName,
      types    = [];
  for (var i = 0; i < /* initializes */ this.fieldsArray.length; ++i)
      types.push(this._fieldsArray[i].resolve().resolvedType);

  // Replace setup methods with type-specific generated functions
  this.encode = encoder(this)({
      Writer : Writer,
      types  : types,
      util   : util
  });
  this.decode = decoder(this)({
      Reader : Reader,
      types  : types,
      util   : util
  });
  this.verify = verifier(this)({
      types : types,
      util  : util
  });
  this.fromObject = converter.fromObject(this)({
      types : types,
      util  : util
  });
  this.toObject = converter.toObject(this)({
      types : types,
      util  : util
  });

  // Inject custom wrappers for common types
  var wrapper = wrappers[fullName];
  if (wrapper) {
      var originalThis = Object.create(this);
      // if (wrapper.fromObject) {
          originalThis.fromObject = this.fromObject;
          this.fromObject = wrapper.fromObject.bind(originalThis);
      // }
      // if (wrapper.toObject) {
          originalThis.toObject = this.toObject;
          this.toObject = wrapper.toObject.bind(originalThis);
      // }
  }

  return this;
};

/**
* Encodes a message of this type. Does not implicitly {@link Type#verify|verify} messages.
* @param {Message<{}>|Object.<string,*>} message Message instance or plain object
* @param {Writer} [writer] Writer to encode to
* @returns {Writer} writer
*/
Type.prototype.encode = function encode_setup(message, writer) {
  return this.setup().encode(message, writer); // overrides this method
};

/**
* Encodes a message of this type preceeded by its byte length as a varint. Does not implicitly {@link Type#verify|verify} messages.
* @param {Message<{}>|Object.<string,*>} message Message instance or plain object
* @param {Writer} [writer] Writer to encode to
* @returns {Writer} writer
*/
Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
  return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
};

/**
* Decodes a message of this type.
* @param {Reader|Uint8Array} reader Reader or buffer to decode from
* @param {number} [length] Length of the message, if known beforehand
* @returns {Message<{}>} Decoded message
* @throws {Error} If the payload is not a reader or valid buffer
* @throws {util.ProtocolError<{}>} If required fields are missing
*/
Type.prototype.decode = function decode_setup(reader, length) {
  return this.setup().decode(reader, length); // overrides this method
};

/**
* Decodes a message of this type preceeded by its byte length as a varint.
* @param {Reader|Uint8Array} reader Reader or buffer to decode from
* @returns {Message<{}>} Decoded message
* @throws {Error} If the payload is not a reader or valid buffer
* @throws {util.ProtocolError} If required fields are missing
*/
Type.prototype.decodeDelimited = function decodeDelimited(reader) {
  if (!(reader instanceof Reader))
      reader = Reader.create(reader);
  return this.decode(reader, reader.uint32());
};
