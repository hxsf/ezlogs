const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const { Console } = require('console')
const { date_format } = require('../date_format')

function FileDateAppender(conf) {
    this.conf = conf
    this.backups = []
    this.level = conf.level
    this.expire = parseInt(conf.expire || 3600 * 24, 10) * 1000
    this.max_backup = conf.max_backup
    this.toggleStream()
    if (this.expire <= 0) {
        throw new Error('expire must be set and must bigger than 60s')
    }
}
FileDateAppender.prototype.toggleStream = function toggleStream() {
    this.date = Date.now()
    const base_path = path.normalize(this.conf.path)
    const filename = `${this.conf.filename + date_format(this.conf.pattern || 'yyyy-MM-dd-HH-mm-ss-SSS')}.log`
    this.full_path = path.join(base_path, filename)
    this.backups.push(this.full_path)
    while (this.backups.length > this.max_backup) {
        try {
            fs.unlinkSync(this.backups.shift())
        } catch (e) {
            // console.log(e.message)
        }
    }
    mkdirp.sync(base_path)
    const temp = this.stream
    this.stream = fs.createWriteStream(this.full_path, {
        flags: 'a',
        defaultEncoding: 'utf8',
        autoClose: true,
    })
    if (temp) {
        temp.end()
    }
    this.console = new Console(this.stream)
}
FileDateAppender.prototype.isToggle = function isToggle() {
    return Date.now() - this.date > this.expire
}
FileDateAppender.prototype.write = function write(...arg) {
    if (this.isToggle()) {
        this.toggleStream()
    }
    this.console.log(...arg)
}
FileDateAppender.prototype.close = function close() {
    this.stream.close()
}

module.exports = FileDateAppender
