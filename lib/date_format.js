if (!String.prototype.padStart) {
    // eslint-disable-next-line no-extend-native
    String.prototype.padStart = function padStart(targetLength, padString = ' ') {
        return padString.repeat(targetLength - this.length) + this
    }
}

if (!String.prototype.padEnd) {
    // eslint-disable-next-line no-extend-native
    String.prototype.padEnd = function padEnd(targetLength, padString = ' ') {
        return this + padString.repeat(targetLength - this.length)
    }
}
/**
 *  @ 格式化时间到给定的字符串模版上
 *  @param Date
 *  @return String
 */
function date_format(_format_str, _date) {
    const date = new Date(_date || Date.now())
    const format_str = _format_str || 'yyyy-MM-dd hh:mm:ss.ms'
    const _year = date.getFullYear()
    const _month = String(date.getMonth() + 1).padStart(2, '0')
    const _day = String(date.getDate()).padStart(2, '0')
    const _hour = String(date.getHours()).padStart(2, '0')
    const _min = String(date.getMinutes()).padStart(2, '0')
    const _sec = String(date.getSeconds()).padStart(2, '0')
    const _ms = String(date.getMilliseconds()).padStart(3, '0')

    return format_str.replace('yyyy', _year)
        .replace('MM', _month)
        .replace('dd', _day)
        .replace('hh', _hour)
        .replace('mm', _min)
        .replace('ss', _sec)
        .replace('ms', _ms)
}

module.exports = {
    date_format,
}
