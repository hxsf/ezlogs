function ConsoleAppender(conf) {
    if (conf.type !== 'console') {
        throw new Error('')
    }
    this.sep = typeof conf.sep === 'string' ? conf.sep : '#'
    this.level = conf.level
}
ConsoleAppender.prototype.write = function write(...str) {
    // eslint-disable-next-line no-console
    console.log(...str)
}
ConsoleAppender.prototype.close = function close() {

}
module.exports = ConsoleAppender
