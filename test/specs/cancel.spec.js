import test from 'ava';
import axios from 'axios';
import sinon from 'sinon';
import mpAdapter from '../../';

test('should error response', async (t) => {
  let cancel;
  const abortSpy = sinon.spy();

  wx.request = function (config) {
    return {
      abort: abortSpy,
    };
  };

  try {
    setTimeout(() => cancel('message'), 100);
    await axios({
      url: 'foo',
      adapter: mpAdapter,
      cancelToken: new axios.CancelToken((c) => {
        cancel = c;
      }),
    });
  } catch(err) {
    t.is(err.message, 'message');
    t.true(abortSpy.calledOnce);
  }
});
