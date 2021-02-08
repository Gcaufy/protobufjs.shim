const path = require('path');
const protobuf = require('protobufjs');
require('../bytes2utf8');

test('city database has Vienna', () => {

  const root = protobuf.loadSync(path.join(process.cwd(), 'test/fixtures/bytes2utf8.proto'));
  const Message = root.lookup("Message");

  const msg = Message.create();

  msg.bytesVal = Buffer.from('hello world');
  msg.bytesRepeated = [ Buffer.from('ni'), Buffer.from('hao') ];

  const obj = msg.$type.toObject(msg);

  expect(obj.bytesVal instanceof Buffer).toBe(true);
  expect(obj.bytesVal).toEqual(Buffer.from('hello world'));
  expect(obj.bytesRepeated[0] instanceof Buffer).toBe(true);

  const obj2 = msg.$type.toObject(msg, { bytes: 'utf8' });

  expect(obj2.bytesVal instanceof Buffer).toBe(false);
  expect(obj2.bytesVal).toBe('hello world');
  expect(obj2.bytesRepeated).toEqual([ 'ni', 'hao' ]);
});

