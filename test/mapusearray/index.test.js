const path = require('path');
const protobuf = require('protobufjs');



const objMap = {
  config: {
    '123': {
      field: 2,
      type: 3
    }
  },
  label: 'abcd',
}

// use array for protobuf map
const arrayMap = {
  config: [{
    key: '123',
    value: {
      field: 2,
      type: 3,
    }
  }],
  label: 'abcd',
}

test('Test map user array not equal', () => {

  const root = protobuf.loadSync(path.join(process.cwd(), 'test/fixtures/mapusearray.proto'));
  const Message = root.lookup("Message");
  const msg = Message.create();

  const bufObj = Message.encode(objMap).finish().join(',');
  const bufArr = Message.encode(arrayMap).finish().join(','); 

  expect(bufArr).not.toEqual(bufObj);

});


test('Test map user array equal', () => {

  require('../../mapusearray/index');

  const root = protobuf.loadSync(path.join(process.cwd(), 'test/fixtures/mapusearray.proto'));
  const Message = root.lookup("Message");
  const msg = Message.create();

  const bufObj = Message.encode(objMap).finish().join(',');
  const bufArr = Message.encode(arrayMap).finish().join(','); 

  expect(bufArr).toEqual(bufObj);

});


