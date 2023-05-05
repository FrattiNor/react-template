const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

let version = null;

const params = process.argv.splice(2);

for (let i = 0; i < params.length; i++) {
    const item = params[i];

    if (item === '--version' || '-V') {
        if (i + 1 < params.length) {
            version = params[i + 1];
            continue;
        }
    }
}

if (version !== null) {
    const packageJson = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8');

    const newJson = JSON.parse(packageJson);
    newJson.version = version;

    fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(newJson, null, '\t'), 'utf-8');
}

exec('cross-env NODE_ENV=production webpack --config webpack/webpack.prod.js', (err, stdout, stderr) => {
    if (!err) {
        console.log(stdout);
    } else {
        console.log(err);
    }
});
