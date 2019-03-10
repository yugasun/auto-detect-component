#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const AutoDetect = require('../dist/auto-detect').default;

program
    .version('0.0.1')
    .option('-d, --dir <dir>', 'Detect directory')
    .option('-u, --ui <ui>', 'UI Toolkit Name')
    .option('-e, --ext <ext>', 'File extension', '.vue')
    .option(
        '-o, --output <output>',
        'UI Plugin output directory, default current command pwd',
    )
    .option('-n, --name <name>', 'UI Plugin output file name', 'ui-plugin');

program.on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log("  $ adc -d demo -u element-ui -o plugin");
});

// output help information on unknown command
program.arguments('<command>').action((cmd) => {
    program.outputHelp();
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
    console.log();
});

program.parse(process.argv);

if (!program.dir) {
    program.outputHelp();
    // throw new Error('Detect directory must be set up.');
    return;
}
if (!program.ui) {
    program.outputHelp();
    // throw new Error('UI Toolkit Name must be set up.');
    return;
}

console.log(' Current detect directory: ', program.dir);
console.log(' UI Toolkit Name: ', program.ui);

async function createUIPlugin() {
    const appPath = path.join(process.cwd(), program.dir);

    const autoDetect = new AutoDetect({
        appPath,
        uiName: program.ui,
        fileExt: program.ext,
    });

    const comps = autoDetect.getCompUse();
    const pluginStr = await autoDetect.createUIPlugin(comps);
    const outputDir = program.output
        ? path.join(process.cwd(), program.output)
        : process.cwd();

    // if output directory not exist, auto create it.
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const outputFilename = path.join(outputDir, `${program.name}.js`);

    fs.writeFileSync(outputFilename, pluginStr);

    console.log(chalk.bgGreen(chalk.black(' Auto create UI plugin success. ')));
}

createUIPlugin();
