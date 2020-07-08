const _prefix = "$a_"
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
export function call<P = any>(methodName: string, params: P, callback: Function) {
    const combination = [methodName, JSON.stringify(params)]
    if (callback) {
        const callBackName = generateCallBackName(methodName);
        combination.push(callBackName);
        window[callBackName] = callback
    }
    const combinationString = combination.filter(item => !!item).map(item => addPrefix(item)).join(_splitTag);
    alert(123);
    if (!window.AevApi) throw new AevWebViewError("当前不在aevwebview环境，请检查你的环境");
    alert(456)
    window.AevApi.postMessage(combinationString)
}










