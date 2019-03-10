const commonComps = [
    'Pagination',
    'Dialog',
    'Autocomplete',
    'Dropdown',
    'DropdownMenu',
    'DropdownItem',
    'Menu',
    'Submenu',
    'MenuItem',
    'MenuItemGroup',
    'Input',
    'InputNumber',
    'Radio',
    'RadioGroup',
    'RadioButton',
    'Checkbox',
    'CheckboxButton',
    'CheckboxGroup',
    'Switch',
    'Select',
    'Option',
    'OptionGroup',
    'Button',
    'ButtonGroup',
    'Table',
    'TableColumn',
    'DatePicker',
    'TimeSelect',
    'TimePicker',
    'Popover',
    'Tooltip',
    'MessageBox',
    'Breadcrumb',
    'BreadcrumbItem',
    'Form',
    'FormItem',
    'Tabs',
    'TabPane',
    'Tag',
    'Tree',
    'Alert',
    'Notification',
    'Slider',
    'Loading',
    'Icon',
    'Row',
    'Col',
    'Upload',
    'Progress',
    'Spinner',
    'Message',
    'Badge',
    'Card',
    'Rate',
    'Steps',
    'Step',
    'Carousel',
    'Scrollbar',
    'CarouselItem',
    'Collapse',
    'CollapseItem',
    'Cascader',
    'ColorPicker',
    'Transfer',
    'Container',
    'Header',
    'Aside',
    'Main',
    'Footer',
];

const specialComps = [
    {
        name: 'Loading',
        value: 'Loading',
    },
    {
        name: 'MessageBox',
        value: 'MessageBox',
    },
    {
        name: 'Notification',
        value: 'Notification',
    },
    {
        name: 'Message',
        value: 'Message',
    },
];

const specialCompsUse = {
    Loading: `
    Vue.use(Loading.directive);
    Vue.prototype.$loading = Loading.service;
    `,
    MessageBox: `
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    `,
    Notification: `
    Vue.prototype.$notify = Notification;
    `,
    Message: `
    Vue.prototype.$message = Message;
    `,
};

export default {
    commonComps,
    specialComps,
    specialCompsUse,
};
