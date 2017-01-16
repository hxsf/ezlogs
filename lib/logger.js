const date_format = require('./date_format').date_format

function Logger() {
    this.appenders = []
    process.on('exit', () => {
        for (let i = 0; i < this.appenders.length; i++) {
            this.appenders[i].close()
        }
    })
}
Logger.prototype._out = function _out(_level, ..._str) {
    const str = String.raw`${date_format()} ${_level} ==> ${_str.join(', ')}`
    for (let i = 0; i < this.appenders.length; i++) {
        this.appenders[i].write(str)
    }
}
Logger.prototype.debug = function debug(...str) {
    this._out('DEBUG', ...str)
}
Logger.prototype.info = function info(...str) {
    this._out('INFO', ...str)
}
Logger.prototype.log = function log(...str) {
    this._out('LOG', ...str)
}
Logger.prototype.trace = function trace(...str) {
    this._out('TRACE', ...str)
}
Logger.prototype.warn = function warn(...str) {
    this._out('WARN', ...str)
}
Logger.prototype.error = function error(...str) {
    this._out('ERROR', ...str)
}
Logger.prototype.fatal = function fatal(...str) {
    this._out('FATAL', ...str)
}
module.exports = Logger
