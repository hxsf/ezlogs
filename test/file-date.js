const logger = require('../index')([{
    type: 'file-date',
    path: './test/logs',
    // level: 'debug',
    filename: 'test',
    expire: 2,
    max_backup: 5
}])
logger.trace('abcd')
let i = 0
var clock = setInterval(()=>{
    logger.fatal('log', i++)
}, 100)
setTimeout(() => {
    logger.warn('end')
    clearInterval(clock)
}, 12000)
