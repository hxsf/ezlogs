const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const Console = require('console').Console

function FileAppender(conf) {
    const base_path = path.normalize(conf.path)
    const filename = conf.filename
    const full_path = path.join(base_path, filename)
    mkdirp.sync(base_path)
    this.stream = fs.createWriteStream(full_path, {
        flags: 'a',
        defaultEncoding: 'utf8',
    })
    this.console = new Console(this.stream)
}
FileAppender.prototype.write = function write(...arg) {
    this.console.log(...arg)
}
FileAppender.prototype.close = function close() {
    this.stream.close()
}

module.exports = FileAppender
