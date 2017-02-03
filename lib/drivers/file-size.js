const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const { Console } = require('console')
const { Writable } = require('stream')
const { date_format } = require('../date_format')

class SizeStream extends Writable {
    constructor(max_size, steam) {
        super({
            decodeStrings: false,
            write(chunk, encoding, next) {
                steam.write(chunk, encoding)
                this.count += chunk.length
                next()
            },
        })
        this.max_size = max_size
        this.count = 0
        this.steam = steam
    }
    isFill() {
        return this.count >= this.max_size
    }
    end(...arg) {
        this.steam.end(...arg)
    }
}

function FileSizeAppender(conf) {
    this.conf = conf
    this.backups = []
    this.level = conf.level
    this.max_size = parseInt(conf.max_size || 1024, 10) * 1024
    this.max_backup = conf.max_backup
    this.toggleStream()
    if (this.max_size <= 0) {
        throw new Error('max_size must be set')
    }
}
FileSizeAppender.prototype.toggleStream = function toggleStream() {
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
    this.SizeStream = new SizeStream(this.max_size, this.stream)
    this.console = new Console(this.SizeStream)
}
FileSizeAppender.prototype.isToggle = function isToggle() {
    return this.SizeStream.isFill()
}
FileSizeAppender.prototype.write = function write(...arg) {
    this.count += 1
    if (this.isToggle()) {
        this.toggleStream()
    }
    this.console.log(...arg)
}
FileSizeAppender.prototype.close = function close() {
    this.stream.close()
}

module.exports = FileSizeAppender
