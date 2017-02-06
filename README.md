# EZLogs

> EZLogs is an simple and light tool for log

## Usage

1. base
```javascript
const EZlogs = require('ezlogs')
const logger = EZlogs() // Default option is logging to console
logger.trace('abcd')
logger.debug('log1')
logger.info('log2')
logger.warn('log3')
logger.error('log4')
logger.fatal('log5')
```

```
2017-01-23 10:18:18.131 TRACE   ==>  abcd
2017-01-23 10:18:18.131 DEBUG   ==>  log1
2017-01-23 10:18:18.131 INFO    ==>  log2
2017-01-23 10:18:18.131 WARN    ==>  log3
2017-01-23 10:18:18.131 ERROR   ==>  log4
2017-01-23 10:18:18.131 FATAL   ==>  log5
```
2. multiple driver

```javascript
const EZlogs = require('ezlogs')
const logger = EZlogs([{
    type: 'console',
    level: 'trace'
}, {
    type: 'file',
    path: './logs-files',
    filename: 'test_log.log',
    level: 'error'
}]) // All to console, and Only error and fatal to file
logger.trace('abcd')
logger.debug('log1')
logger.info('log2')
logger.warn('log3')
logger.error('log4')
logger.fatal('log5')
```


### Options

| name | optional | which driver can use | remark |
| :---: | :---: | :---: | :------------------------- |
| type | must | all | which driver to use. |
| level | optional | all | default is all to output, e.g. `level = 'error'`,only `error` and `fatal` can output. |
| pattern | optional | file-* | default is 'yyyy-MM-dd-HH-mm-ss-SSS'. the pattern in filename |
| path | must | file-* | `full_file_path = path + filename + pattern + '.log'` |
| filename | must | file-* | `full_file_path = path + filename + pattern + '.log'` |
| max_backup | must | file-* | the max number of logs(file) |
| expire | optional | file-date | How often toggle the log's file, default is `3600 * 24`(one day)  |
| max_size | optional | file-number | the number of per log file, default is `10000` |
| max_size | optional | file-size | the size of per log file, The unit is kb, default is `1024` |

### Drivers

1. console

    ```javascript
    const EZlogs = require('ezlogs')
    const logger = EZlogs([{
        type: 'console',
        level: 'trace',
    }])
    ```

2. file

    ```javascript
    const EZlogs = require('ezlogs')
    const logger = EZlogs([{
        type: 'file',
        path: './logs-files',
        filename: 'test_log.log',
    }])
    ```

3. file-date

    ```javascript
    const EZlogs = require('ezlogs')
    const logger = EZlogs([{
        type: 'file-date',
        path: './test/logs',
        filename: 'test',
        expire: 3600 * 24,
        max_backup: 7,
    }])
    ```

4. file-size

    ```javascript
    const EZlogs = require('ezlogs')
    const logger = EZlogs([{
        type: 'file-size',
        path: './test/logs',
        filename: 'test',
        max_size: 1024 * 10,
        max_backup: 7
    }])
    ```

5. file-number

    ```javascript
    const EZlogs = require('ezlogs')
    const logger = EZlogs([{
        type: 'file-number',
        path: './test/logs',
        filename: 'test',
        max_size: 10 * 10000,
        max_backup: 7
    }])
    ```

## Contributions
- [hxsf](https://github.com/hxsf)
- [yourenyouyu](https://github.com/yourenyouyu)

## License
Apache2.0
