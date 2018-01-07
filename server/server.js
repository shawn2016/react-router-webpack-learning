const express = require('express')
const renderToString = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const serverEntry = require('../dist/server-entry').default
const app = express()
const isDev = process.env.NODE_ENV === 'development'

if (!isDev) {
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
    app.use('/public', express.static(path.resolve(__dirname, '../dist')));
    app.use('*', function (req, res) {
        const appString = renderToString.renderToString(serverEntry)
        const htmlString = template.replace('<!-- app -->', appString)
        res.send(htmlString)
    })
} else {
    const devStstic = require('./utils/dev-static')
    devStstic(app)
}
app.listen(3333, function () {
    console.log('server is listening on 3333')
})