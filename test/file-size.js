const logger = require('../index')([{
    type: 'file-size',
    path: './test/logs',
    // level: 'debug',
    filename: 'test',
    max_size: 10,
    max_backup: 5
}])

// let i = 0
// var clock = setInterval(()=>{
//     logger.fatal('log', i++)
// }, 10)

// setTimeout(() => {
//     logger.warn('end')
//     clearInterval(clock)
// }, 60000)


console.time('a')
console.time('b')
for (var i = 0; i < 500000; i++) {
    logger.error(i)
}

console.timeEnd('a')
process.on('exit', ()=> console.timeEnd('b'))
