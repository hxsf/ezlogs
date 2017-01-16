const logger = require('../index')([{
    type: 'file',
    path: './logs-files',
    filename: 'test_log.log'
}])
logger.log('abcd')
logger.debug('abcd')
logger.log('abcd')
setTimeout(() => {
    logger.error('bbbb')
    logger.log('ssss')
}, 2001)
