const classnames = require('my-custom-scheme:classnames');
const lodash = require('twitter:stdlib/lodash');

console.log('Hello, AnyUriSchemePlugin!');
console.log('classnames result is', classnames('classA', 'classB'));
console.log('lodash result is', lodash.cloneDeep({ name: 'dongyuanxin' }));
