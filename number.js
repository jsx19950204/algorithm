/**
 * 获取小数位长度
 * @param {Number} n 数字或数字字符串
 */
var getDecimalLen = function(n) {
    var re = /\d*\.(\d+)/;
    var res = re.exec(n);
    return res ? res[1].length : 0;
}
/**
 * 加运算
 * 将传入的参数依次相加
 */
Number.prototype.add = function() {
    var args = Array.prototype.slice.call(arguments);
    if (!args.length) {
        return this;
    }
    var n = args.shift();
    var len = Math.max(getDecimalLen(this), getDecimalLen(n));
    var magnification = Math.pow(10, len);
    var res = (this * magnification + n * magnification) / magnification;
    if (args.length) {
        return res.add.apply(res, args);
    }
    return res;
}
/**
 * 减运算
 * 将传入的参数依次相减
 */
Number.prototype.minus = function() {
    var args = Array.prototype.slice.call(arguments);
    if (!args.length) {
        return this;
    }
    var n = args.shift();
    var len = Math.max(getDecimalLen(this), getDecimalLen(n));
    var magnification = Math.pow(10, len);
    var res = (this * magnification - n * magnification) / magnification;
    if (args.length) {
        return res.minus.apply(res, args);
    }
    return res;
}
/**
 * 乘运算
 * 将传入的参数依次相乘
 */
Number.prototype.mul = function() {
    var args = Array.prototype.slice.call(arguments);
    if (!args.length) {
        return this;
    }
    var n = args.shift();
    var len1 = getDecimalLen(this),
        len2 = getDecimalLen(n);
    var magnification1 = Math.pow(10, len1),
        magnification2 = Math.pow(10, len2);
    var denominator = Math.pow(10, len1 + len2);
    var res = (this * magnification1) * (n * magnification2) / denominator;
    if (args.length) {
        return res.mul.apply(res, args);
    }
    return res;
}
/**
 * 除运算
 * 将传入的参数依次相除
 */
Number.prototype.div = function() {
    var args = Array.prototype.slice.call(arguments);
    if (!args.length) {
        return this;
    }
    var n = args.shift();
    var len1 = getDecimalLen(this),
        len2 = getDecimalLen(n);
    var magnification1 = Math.pow(10, len1),
        magnification2 = Math.pow(10, len2);
    var denominator = Math.pow(10, len1 - len2);
    var res = (this * magnification1) / (n * magnification2) / denominator;
    if (args.length) {
        return res.div.apply(res, args);
    }
    return res;
}