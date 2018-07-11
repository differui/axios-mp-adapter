# axios-mp-adapter

<p>
    <a href="LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="Software License" />
    </a>
    <a href="https://github.com/differui/axios-mp-adapter/issues">
        <img src="https://img.shields.io/github/issues/differui/axios-mp-adapter.svg" alt="Issues" />
    </a>
    <a href="https://npmjs.org/package/axios-mp-adapter">
        <img src="https://img.shields.io/npm/v/axios-mp-adapter.svg?style=flat-squar" alt="NPM" />
    </a>
    <a href="https://travis-ci.org/differui/axios-mp-adapter">
        <img src="https://travis-ci.org/differui/axios-mp-adapter.svg?branch=master" />
    </a>
</p>

## Installation

Using npm:

```bash
npm i axios-mp-adapter --save-dev
```

## Example

```js
var axios = require('axios');
var mpAdapter = require('axios-mp-adapter');

axios({
  url: 'https://foo.bar',
  adapter: mpAdapter,
}).then((response) => {
  // handle the response
});
```

## License

&copy; [BinRui Guan](mailto:differui@gmail.com)
