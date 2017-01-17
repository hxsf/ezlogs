const Logger = require('./lib/logger')

const DEFAULT_CONFIG = [{
    type: 'console',
}]
module.exports = function build(_opt) {
    const opt = _opt || DEFAULT_CONFIG
    if (opt instanceof Array == false) {
        throw new Error('build config must be a Array')
    }
    const logger = new Logger()
    for (let i = 0; i < opt.length; ++i) {
        try {
            // eslint-disable-next-line global-require, import/no-dynamic-require
            const Appender = require(`./lib/drivers/${opt[i].type}`)
            const appender = new Appender(opt[i])
            logger.appenders.push(appender)
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Log4skynet ERROR: ', e)
        }
    }
    return logger
}
