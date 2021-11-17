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

test('Test string map decode', () => {

  require('../../mapusearray/index');

  const root = protobuf.loadSync(path.join(process.cwd(), 'test/fixtures/mapstringarray.proto'));
  const Message = root.lookup("Message");
  const msg1 = Message.encode({ attr: [{  key: '1', value: '2' }, { key: 'a', value: 'b' }] });
  const msg2 = Message.encode({ attr: { '1' : '2', 'a': 'b' } });

  const buf1 = msg1.finish();
  const buf2 = msg2.finish();

  expect(buf1.join(',')).toEqual(buf2.join(','))

  const decode1 = Message.decode(buf1)
  const decode2 = Message.decode(buf2)

  expect(decode1.attr.a).toEqual('b');
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


