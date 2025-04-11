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
      schemes: ['my-custom-scheme:'],
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
        return resolveData;
      }
    }),
  ],
};