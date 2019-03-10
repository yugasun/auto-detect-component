const commonComps = [
    'Affix',
    'Anchor',
    'AutoComplete',
    'Alert',
    'Avatar',
    'BackTop',
    'Badge',
    'Breadcrumb',
    'Button',
    'Calendar',
    'Card',
    'Collapse',
    'Carousel',
    'Cascader',
    'Checkbox',
    'Col',
    'DatePicker',
    'Divider',
    'Dropdown',
    'Form',
    'Icon',
    'Input',
    'InputNumber',
    'Layout',
    'List',
    'LocaleProvider',
    'message',
    'Menu',
    'Modal',
    'notification',
    'Pagination',
    'Popconfirm',
    'Popover',
    'Progress',
    'Radio',
    'Rate',
    'Row',
    'Select',
    'Slider',
    'Spin',
    'Steps',
    'Switch',
    'Table',
    'Transfer',
    'Tree',
    'TreeSelect',
    'Tabs',
    'Tag',
    'TimePicker',
    'Timeline',
    'Tooltip',
    'Upload',
    'Drawer',
    'Skeleton',
    'Comment',
    'ConfigProvider',
];

const specialComps = [
    {
        name: 'Message',
        value: 'message',
    },
    {
        name: 'Notification',
        value: 'notification',
    },
    {
        name: 'Modal',
        value: 'Modal',
    },
];

const specialCompsUse = {
    message: `
    Vue.prototype.$message = message;
    `,
    notification: `
    Vue.prototype.$info = Modal.info;
    Vue.prototype.$success = Modal.success;
    Vue.prototype.$error = Modal.error;
    Vue.prototype.$warning = Modal.warning;
    Vue.prototype.$confirm = Modal.confirm;
    `,
    Modal: `
    Vue.prototype.$notification = notification;
    `,

};

export default {
    commonComps,
    specialComps,
    specialCompsUse,
};
