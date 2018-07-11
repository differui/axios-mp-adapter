import test from 'ava';
import axios from 'axios';
import mpAdapter from '../../';

test('should settle response', async (t) => {
  wx.request = function (config) {
    config.success({
      data: {
        foo: 'foo',
        bar: 'bar',
      },
      statusCode: 200,
      header: {
        'Content-Type': 'application/json',
      },
    });
  };

  const response = await axios({
    url: 'foo',
    adapter: mpAdapter,
  });

  t.is(response.data.foo, 'foo');
  t.is(response.data.bar, 'bar');
  t.is(response.status, 200);
  t.is(response.statusText, '');
  t.is(response.headers['Content-Type'], 'application/json');
});
