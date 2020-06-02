/**
 * 安全计算字符串表达式
 * 用闭包减少命名冲突
 */
function calculateExpression() {
    var numRe = /^(\d+\.{0,1}\d*|\.\d+)\D*/;
    var optSet = new Set(['+', '-', '*', '/', '%']);
    var optMap = new Map([
        ['+', 'add'],
        ['-', 'minus'],
        ['*', 'mul'],
        ['/', 'div']
    ]);
    var bracketMap;
    /**
     * 计算括号位置
     * @param {String} expression 字符串表达式
     * @return {Map} 括号位置map
     */
    var getBracketIndex = function(expression) {
        var map = new Map();
        var stack = [];
        var len = expression.length;
        var cur = '';
        for (var i = 0; i < len; i++) {
            cur = expression[i];
            if (cur === '(') {
                stack.push(i);
            } else if (cur === ')') {
                if (!stack.length) {
                    throwError();
                }
                map.set(stack.shift(), i);
            }
        }
        if (stack.length) {
            throwError();
        }
        return map;
    };
    // 抛异常
    var throwError = function() {
        throw new Error('请输入合法的表达式');
    };
    /**
     * 拆分表达式
     * @param {String} expression 字符串表达式
     */
    var splitExpression = function(expression) {
        var stack = [];
        var cur;
        var rightBracketIndex; // 右括号
        var num;
        var subStr = '';
        var prefix = '';
        for (var i = 0, len = expression.length; i < len; i++) {
            cur = expression[i];
            if (cur === ' ') {
                continue;
            }
            if (cur === '(') {
                rightBracketIndex = bracketMap.get(i);
                if (rightBracketIndex === -1) {
                    throwError();
                }
                var res = splitExpression(expression.slice(i + 1, rightBracketIndex));
                stack.push(res.length === 1 ? res[0] : res);
                i = rightBracketIndex;
            } else if (optSet.has(cur)) {
                // 操作符在奇数位
                if (stack.length & 1) {
                    stack.push(cur);
                // 操作符可以有负号或者正号
                } else if (cur === '-' || cur === '+') {
                    if (prefix) {
                        throwError();
                    }
                    prefix = cur;
                } else {
                    throwError();
                }
            } else {
                subStr = expression.slice(i);
                num = numRe.exec(subStr);
                if (!num) {
                    throwError();
                }
                num = num[1];
                i += num.length - 1;
                stack.push(prefix + num);
                prefix = '';
            }
        }
        return stack;
    };
    /**
     * 根据优先级重新组合
     * @param {Array} stack 执行中的部分表达式栈
     */
    var setPriority = function(stack) {
        if (stack.length < 3) {
            return;
        }
        var fOpt = stack[1];
        var sOpt = stack[3];
        if (fOpt === '+' || fOpt === '-') {
            // 加减 没有 乘除模 优先级高
            if (sOpt === '*' || sOpt === '/' || sOpt === '%') {
                stack.splice(2, 3, [stack[2], stack[3], stack[4]]);
            }
        }
    };
    /**
     * 计算值
     * @param {Array} stack 当前表达式栈
     * @return {Number} 表达式计算结果
     */
    var getResult = function(stack) {
        while (stack.length > 1) {
            setPriority(stack);
            var fNum = stack[0];
            if (Array.isArray(fNum)) {
                fNum = getResult(fNum);
            }
            var opt = stack[1];
            var sNum = stack[2];
            if (Array.isArray(sNum)) {
                sNum = getResult(sNum);
            }
            if (opt === '%') {
                stack.splice(0, 3, (+fNum) % (+sNum));
            } else {
                stack.splice(0, 3, (+fNum)[optMap.get(opt)](+sNum));
            }
        }
        return stack[0];
    };
    /**
     * @param {String} 字符串表达式
     * @return {Number} 计算结果
     */
    return function(expression) {
        if (!expression) {
            throwError();
        }
        bracketMap = new getBracketIndex(expression);
        return getResult(splitExpression(expression));
    }
}