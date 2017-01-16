// eslint-disable-next-line
function ExampleAppender (conf) {
    throw new Error('must be extends')
}
ExampleAppender.prototype.write = function write() {

}
ExampleAppender.prototype.close = function close() {

}
module.exports = ExampleAppender
