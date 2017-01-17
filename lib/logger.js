const {date_format} = require('./date_format')

function Logger() {
    this.appenders = []
    process.on('exit', () => {
        for (let i = 0; i < this.appenders.length; i++) {
            this.appenders[i].close()
        }
    })
}

const _levelMap = {
    'TRACE': 1,
    'DEBUG': 2,
    'INFO' : 3,
    'WARN' : 4,
    'ERROR': 5,
    'FATAL': 6,    
}

Logger.prototype._output = function _output(_level, ..._str) {
    const str = String.raw`${date_format()} ${_level.padEnd(5)}   ==>  ${_str.join(', ')}`
    for (let i = 0; i < this.appenders.length; i++) {
        let current = this.appenders[i]
        current.level = current.level ? current.level.toUpperCase() : 'TRACE'
        if (_levelMap[_level] >= _levelMap[current.level]){
            current.write(str)
        }
    }
}

Logger.prototype.trace = function trace(...str) {
    this._output('TRACE', ...str)
}

Logger.prototype.debug = function debug(...str) {
    this._output('DEBUG', ...str)
}

Logger.prototype.info = function info(...str) {
    this._output('INFO', ...str)
}

Logger.prototype.warn = function warn(...str) {
    this._output('WARN', ...str)
}

Logger.prototype.error = function error(...str) {
    this._output('ERROR', ...str)
}
Logger.prototype.fatal = function fatal(...str) {
    this._output('FATAL', ...str)
}
module.exports = Logger
