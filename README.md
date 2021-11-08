# protobufjs.shim

Shims for protobufjs

## Install

```
npm i protobufjs.shim --save
```

## Shims

### bytes2utf8

#### Usage

```
require('protobufjs.shim/bytes2utf8');

var object = AwesomeMessage.toObject(message, {
  enums: String,  // enums as string names
  longs: String,  // longs as strings (requires long.js)
  bytes: 'utf8',  // bytes encode as utf8 string 
  defaults: true, // includes default values
  arrays: true,   // populates empty arrays (repeated fields) even if defaults=false
  objects: true,  // populates empty objects (map fields) even if defaults=false
  oneofs: true    // includes virtual oneof fields set to the present field's name
});
```


### mapusearray
```
/**
message Config {
  optional uint32         field               = 1;
  optional int32          type                = 2;
}

message Message {
  map<uint32, Config> config = 1;
  optional string     label = 2;
}
*/


require('protobufjs.shim/mapusearray/');

// use array as map
Message.encode({
  config: [{ key: 123, value: { field: 1, type: 2}}]
});
// equal use object
Mesage.encode({
  config: { 123: { field: 1, type: 2 }}
})
```

## Test

```
npm run test
```

## Reference

[protobufjs](https://github.com/protobufjs/protobuf.js)

## Licences
MIT
