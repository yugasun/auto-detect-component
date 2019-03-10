import fs from 'fs';
import path from 'path';
import upperCamelCase from 'uppercamelcase';
import inquirer from 'inquirer';
import UIMap from './config/ui-map';

export default class AutoDetect {
    constructor({ appPath, uiName, fileExt = '.vue' }) {
        this.appPath = appPath;
        this.uiName = uiName;
        this.compFiles = [];
        this.fileExt = fileExt;
        this.compPrefix = UIMap[uiName];
        this.compReg = new RegExp(`<${this.compPrefix}([a-zA-Z-]+)`, 'ig');
    }

    initCompFiles(dirPath) {
        const files = fs.readdirSync(dirPath);

        files.forEach((f) => {
            const filename = path.join(dirPath, f);
            const stat = fs.statSync(filename);
            if (stat.isDirectory()) {
                const subDirPath = path.join(dirPath, f);
                // not supposed cache sub vue files variables, it will case stack overflow.
                this.initCompFiles(subDirPath);
            } else if (f.indexOf(this.fileExt) !== -1) {
                this.compFiles.push(filename);
            }
        });
    }

    getCompUse() {
        this.initCompFiles(this.appPath);

        let useComps = [];
        this.compFiles.forEach((filename) => {
            const content = fs.readFileSync(filename);

            const res = (content.toString().match(this.compReg) || []).map(
                (item) => item.replace(`<${this.compPrefix}`, ''),
            );

            useComps.push(...res);
        });

        // unique use component
        useComps = Array.from(new Set(useComps));

        return useComps.map((c) => upperCamelCase(c));
    }

    async createUIPlugin(useComps) {
        const { commonComps, specialComps, specialCompsUse } = require(`./comp-list/${this.uiName}`).default;
        let useStr = [];
        let shouldUseList = useComps.filter((c) => commonComps.indexOf(c) !== -1);

        // generate special components use
        const { special } = await inquirer.prompt({
            type: 'checkbox',
            name: 'special',
            message: 'Please select special components will use?',
            choices: specialComps,
        });

        let importStr = shouldUseList.join(', ');
        shouldUseList.forEach((item) => {
            useStr.push(`Vue.use(${item});`);
        });

        importStr += special.join(', ');

        special.forEach((s) => {
            useStr.push(specialCompsUse[s]);
        })

        const pluginTpl = `
import {
    ${importStr}
} from '${this.uiName}';

const UIPlugin = {};

UIPlugin.install = (Vue) => {
    ${useStr.join('\n    ')}
};

export default UIPlugin;
        `;

        return pluginTpl;
    }
}
