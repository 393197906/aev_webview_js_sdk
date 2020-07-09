const _prefix = "$aev_"
const _splitTag = "@@@"

class AevWebViewError extends Error {
    message: string;

    constructor(message: string) {
        super(message);
        this.message = message;
    }
}

function addPrefix(target: string): string {
    return `${_prefix}${target}`
}

// 生成回调名
function generateCallBackName(methodName: string) {
    return `${methodName}callback`
}


// 调用flutter
export function call<P extends { [key: string]: any }>(methodName: string, params: P, callback?: (resultMap: P) => void) {
    if (!arguments.length) throw new AevWebViewError(`call方法至少需要一个参数`);
    if (typeof methodName !== "string") throw new AevWebViewError(`methodName必须是一个字符串`);
    if (!isPlainObject(params)) throw new AevWebViewError(`${methodName}方法的params参数不是一个有效的字面量对象`);
    const combination = [methodName, JSON.stringify(params)]
    let combinationString = combination.filter(item => !!item).map(item => addPrefix(item)).join(_splitTag);
    if (callback) {
        const callBackName = generateCallBackName(addPrefix(methodName));
        combinationString = combinationString + _splitTag + callBackName;
        window[callBackName] = callback
    }
    if (!window.AevApi) throw new AevWebViewError("当前不在aevwebview环境，请检查你的环境");
    window.AevApi.postMessage(combinationString)
}

function isPlainObject(value: any): boolean {
    return Object.getPrototypeOf(value) === null || Object === value.constructor;
}











