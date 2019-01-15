import fs from 'fs';
import path from 'path';

export default class AutoDetect {
    constructor({ appPath, compPrefix, fileExt = '.vue' }) {
        this.appPath = appPath;
        this.compPrefix = compPrefix;
        this.compReg = new RegExp(`<${compPrefix}([a-zA-Z-]+)`, 'ig');
        this.compFiles = [];
        this.fileExt = fileExt;
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
                (item) => item.replace('<', ''),
            );

            useComps.push(...res);
        });

        // unique use component
        useComps = Array.from(new Set(useComps));

        return useComps;
    }
}
