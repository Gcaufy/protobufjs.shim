const protobufjs = require('protobufjs');

require('./type');

const encoderShim = require('./encoder');

protobufjs.encoder = encoderShim;

