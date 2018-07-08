import test from 'ava';
import axios from 'axios';
import sinon from 'sinon';
import wxAdapter from '../../';

test('should build url with params', async (t) => {
  const spy = sinon.spy(wx, 'request');

  axios({
    method: 'get',
    url: 'foo',
    params: {
      foo: 'foo',
      bar: 'bar',
    },
    adapter: wxAdapter,
  });

  await wait(100);
  t.is(spy.getCall(0).args[0].url, 'foo?foo=foo&bar=bar');
});
