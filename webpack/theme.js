const path = require('path')
const fs = require('fs')

const themeObj = {}
const themeData = fs.readFileSync(path.join(__dirname, '../src/theme.less'), 'utf-8')
themeData.split('\n').map((item) => {
    const matchRes = item.match(/^@(.*);/)
    if (matchRes?.[1]) {
        const [key, value] = matchRes[1].split(':')
        themeObj[key] = value
    }
})

module.exports = { themeObj }
