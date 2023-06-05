/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

let version = null;
let webview = true;

const params = process.argv.splice(2);

for (let i = 0; i < params.length; i++) {
    const item = params[i];

    if (item === '--version' || item === '-V') {
        if (i + 1 < params.length) {
            version = params[i + 1];
            continue;
        }
    }
    if (item === '--webview') {
        if (i + 1 < params.length) {
            webview = params[i + 1];
            continue;
        }
    }
}

if (typeof webview === 'boolean') {
    const envBuildJson = fs.readFileSync(path.join(__dirname, '../src/envBuild.json'), 'utf-8');
    const newJson = JSON.parse(envBuildJson);
    newJson.isWebview = webview;
    fs.writeFileSync(path.join(__dirname, '../src/envBuild.json'), JSON.stringify(newJson, null, '\t'), 'utf-8');
}

if (version !== null) {
    const packageJson = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8');
    const newJson = JSON.parse(packageJson);
    newJson.version = version;
    fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(newJson, null, '\t'), 'utf-8');
}

exec('webpack --config ./webpack.config.cjs', (err, stdout) => {
    if (!err) {
        console.log(stdout);
    } else {
        console.log(err);
    }
});
