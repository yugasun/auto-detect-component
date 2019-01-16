
import {
    Form, Input, Button
} from 'ant-design-vue';

const UIPlugin = {};

UIImport.install = (Vue) => {
    Vue.use(Form);
    Vue.use(Input);
    Vue.use(Button);
};

export default UIPlugin;
        