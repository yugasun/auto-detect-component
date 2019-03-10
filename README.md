# auto-detect-component

<a href="https://www.npmjs.com/package/auto-detect-component"><img src="https://img.shields.io/npm/dm/auto-detect-component.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/auto-detect-component"><img src="https://img.shields.io/npm/v/auto-detect-component.svg" alt="Version"></a>

Detect UI components used in your project automatically.

## Usage

```shell
# install
npm install auto-detect-component -g

# get command help
adc --help

# run command
# demo is the project directory you need to detect
adc -d demo -u 'element-ui' -o plugin
```

Then use the created plugin file as [Vue plugin](https://vuejs.org/v2/guide/plugins.html):

```js
import Vue from 'vue';
import UIPlugin from './plugin/ui-plugin';

Vue.use(UIPlugin);
```

## TODO

[ ] Unit test.

## Support UI Toolkit

It supports two UI toolkit for Vue:

* [element-ui](https://github.com/ElemeFE/element)
* [ant-design-vue](https://github.com/vueComponent/ant-design-vue)

## License

[MIT](./LICENSE)
