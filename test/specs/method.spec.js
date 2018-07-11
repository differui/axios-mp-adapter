import test from 'ava';
import axios from 'axios';
import sinon from 'sinon';
import mpAdapter from '../../';

test('should transform method', async (t) => {
  const spy = sinon.spy(wx, 'request');

  axios({
    method: 'get',
    url: 'foo',
    adapter: mpAdapter,
  });

  await wait(100);
  t.is(spy.getCall(0).args[0].method, 'GET');
});
