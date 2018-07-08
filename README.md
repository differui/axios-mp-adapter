# axios-wx-adapter

<p>
    <a href="LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="Software License" />
    </a>
    <a href="https://github.com/differui/axios-wx-adapter/issues">
        <img src="https://img.shields.io/github/issues/differui/axios-wx-adapter.svg" alt="Issues" />
    </a>
    <a href="https://npmjs.org/package/axios-wx-adapter">
        <img src="https://img.shields.io/npm/v/axios-wx-adapter.svg?style=flat-squar" alt="NPM" />
    </a>
    <a href="https://travis-ci.org/differui/axios-wx-adapter">
        <img src="https://travis-ci.org/differui/axios-wx-adapter.svg?branch=master" />
    </a>
</p>

## Installation

Using npm:

```bash
npm i axios-wx-adapter --save-dev
```

## Example

```js
var axios = require('axios');
var wxAdapter = require('axios-wx-adapter');

axios({
  url: 'https://foo.bar',
  adapter: wxAdapter,
}).then((response) => {
  // handle the response
});
```

## License

&copy; [BinRui Guan](mailto:differui@gmail.com)
