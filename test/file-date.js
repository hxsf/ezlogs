const logger = require('../index')([{
    type: 'file-date',
    path: './test/logs',
    // level: 'debug',
    filename: 'test',
    expire: 2,
    max_backup: 5
}])
logger.trace('abcd')
// let i = 0
// var clock = setInterval(()=>{
//     logger.fatal('log', i++)
// }, 100)
console.time('a')
console.time('b')
for (var i = 0; i < 300000; i++) {
    logger.fatal('log', i)
}
console.timeEnd('a')
process.on('exit', ()=> console.timeEnd('b'))
// setTimeout(() => {
//     logger.warn('end')
//     clearInterval(clock)
// }, 12000)
