# any-uri-scheme-webpack-plugin

## Description

Let webpack (version greater than or equal to v5) support custom uri protocol, like custom://, twittwer://, weixin:// and so on.

## Quick Start

When you have a custom scheme uri in your code (as shown below):

```javascript
// page.js
const classnames = require('my-custom-scheme:classnames');
const lodash = require('twitter:stdlib/lodash');

console.log('Hello, AnyUriSchemePlugin!');
console.log('classnames result is', classnames('classA', 'classB'));
console.log('lodash result is', lodash.cloneDeep({ name: 'dongyuanxin' }));
```

And you want to convert them to the corresponding npm library: 

- `my-custom-scheme:classnames` ---> `classnames`
- `twitter:stdlib/lodash` ---> `lodash`


If you use webpack to build directly, you will see the error messages in shell:

```shell
Module build failed: UnhandledSchemeError: Reading from "my-custom-scheme:classnames" is not handled by plugins (Unhandled scheme).
Webpack supports "data:" and "file:" URIs by default.
You may need an additional plugin to handle "my-custom-scheme:" URIs.

Module build failed: UnhandledSchemeError: Reading from "twitter:stdlib/lodash" is not handled by plugins (Unhandled scheme).
Webpack supports "data:" and "file:" URIs by default.
You may need an additional plugin to handle "twitter:" URIs.
```

Now please import this any uri scheme webpack plugin for "UnhandledSchemeError":

```javascript
// webpack.config.js
const path = require('path');
const AnyUriSchemePlugin = require('../index.js');

module.exports = {
  entry: './page.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new AnyUriSchemePlugin({
      schemes: [
        'my-custom-scheme:',
        'twitter:',
      ],
      log: {
        open: true,
      },
      handler: (scheme, resolveData) => {
        if (scheme === 'my-custom-scheme:') {
          switch (resolveData.request) {
            case 'my-custom-scheme:classnames': 
              resolveData.request = 'classnames';
              break;
          }
        }
        if (scheme === 'twitter:') {
          switch (resolveData.request) {
            case 'twitter:stdlib/lodash':
              resolveData.request = 'lodash';
              break;
          }
        }
        return resolveData;
      }
    }),
  ],
};
```

## Links

- [Github]()
- [Test cases]()