const logger = require('../index')([{
    type: 'file-number',
    path: './test/logs',
    // level: 'debug',
    filename: 'test',
    max_size: 100000,
    max_backup: 5
}])

console.time('a')
console.time('b')
for (var i = 0; i < 500000; i++) {
    logger.error(i)
}

console.timeEnd('a')
process.on('exit', ()=> console.timeEnd('b'))
