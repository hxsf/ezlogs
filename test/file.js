const logger = require('../index')([{
    type: 'file',
    path: './logs-files',
    level: 'error',
    filename: 'test_log.log'
}])
logger.trace('abcd')
logger.debug('abcd')
logger.info('abcd')
setTimeout(() => {
    logger.error('bbbb')
    logger.warn('ssss')
}, 2001)
