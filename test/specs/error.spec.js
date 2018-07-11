import test from 'ava';
import axios from 'axios';
import mpAdapter from '../../';

test('should error response', async (t) => {
  wx.request = function (config) {
    setTimeout(() => {
      config.fail({
        data: {
          foo: 'foo',
          bar: 'bar',
        },
        statusCode: 400,
        header: {
          'Content-Type': 'application/json',
        },
      });
    }, 100);
    return {
      abort() {},
    };
  };

  try {
    await axios({
      url: 'foo',
      adapter: mpAdapter,
    })
  } catch(err) {
    t.is(err.code, 400);
    t.is(err.response.data.foo, 'foo');
    t.is(err.response.data.bar, 'bar');
  }
});
