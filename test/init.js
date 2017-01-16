const logger = require('../index')([{
    type: 'console',
}])
logger.log('abcd')
logger.debug('abcd')
logger.log('abcd')
setTimeout(() => {
    logger.error('bbbb')
    logger.log('ssss')
}, 2001)
