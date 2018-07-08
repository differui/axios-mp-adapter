import test from 'ava';
import axios from 'axios';
import sinon from 'sinon';
import wxAdapter from '../../';

test('should use defaults config', async (t) => {
  const spy = sinon.spy(wx, 'request');

  axios({
    url: 'foo',
    adapter: wxAdapter,
  });

  await wait(100);

  t.is(spy.getCall(0).args[0].method, 'GET');
  t.is(spy.getCall(0).args[0].responseType, 'text');
});
