const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const { Console } = require('console')
const { date_format } = require('../date_format')

function FileNumberAppender(conf) {
    this.conf = conf
    this.sep = typeof conf.sep === 'string' ? conf.sep : '#'
    this.backups = []
    this.level = conf.level
    this.max_size = parseInt(conf.max_size || 10000, 10)
    this.max_backup = conf.max_backup
    this.toggleStream()
    if (this.max_size <= 0) {
        throw new Error('max_size must be set and must been set')
    }
}
FileNumberAppender.prototype.toggleStream = function toggleStream() {
    this.count = 0
    const base_path = path.normalize(this.conf.path)
    const filename = `${this.conf.filename + date_format(this.conf.pattern || 'yyyy-MM-dd-HH-mm-ss-SSS')}.log`
    this.full_path = path.join(base_path, filename)
    this.backups.push(this.full_path)
    while (this.backups.length > this.max_backup) {
        try {
            fs.unlinkSync(this.backups.shift())
        } catch (e) {
            // disable-enlint no-empty
        }
    }
    mkdirp.sync(base_path)
    const temp = this.stream
    this.stream = fs.createWriteStream(this.full_path, {
        flags: 'a',
        defaultEncoding: 'utf8',
    })
    if (temp) {
        temp.end()
    }
    this.console = new Console(this.stream)
}
FileNumberAppender.prototype.isToggle = function isToggle() {
    return this.count > this.max_size
}
FileNumberAppender.prototype.write = function write(...arg) {
    this.count += 1
    if (this.isToggle()) {
        this.toggleStream()
    }
    this.console.log(...arg)
}
FileNumberAppender.prototype.close = function close() {
    this.stream.close()
}

module.exports = FileNumberAppender
