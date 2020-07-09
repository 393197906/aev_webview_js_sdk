(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.AevWebview = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var _prefix = "$aev_";
    var _splitTag = "@@@";
    var AevWebViewError = /** @class */ (function (_super) {
        __extends(AevWebViewError, _super);
        function AevWebViewError(message) {
            var _this = _super.call(this, message) || this;
            _this.message = message;
            return _this;
        }
        return AevWebViewError;
    }(Error));
    function addPrefix(target) {
        return "" + _prefix + target;
    }
    // 生成回调名
    function generateCallBackName(methodName) {
        return methodName + "callback";
    }
    // 调用flutter
    function call(methodName, params, callback) {
        if (!arguments.length)
            throw new AevWebViewError("call\u65B9\u6CD5\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u53C2\u6570");
        if (typeof methodName !== "string")
            throw new AevWebViewError("methodName\u5FC5\u987B\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32");
        if (!isPlainObject(params))
            throw new AevWebViewError(methodName + "\u65B9\u6CD5\u7684params\u53C2\u6570\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684\u5B57\u9762\u91CF\u5BF9\u8C61");
        var combination = [methodName, JSON.stringify(params)];
        var combinationString = combination.filter(function (item) { return !!item; }).map(function (item) { return addPrefix(item); }).join(_splitTag);
        if (callback) {
            var callBackName = generateCallBackName(addPrefix(methodName));
            combinationString = combinationString + _splitTag + callBackName;
            window[callBackName] = callback;
        }
        if (!window.AevApi)
            throw new AevWebViewError("当前不在aevwebview环境，请检查你的环境");
        window.AevApi.postMessage(combinationString);
    }
    function isPlainObject(value) {
        return Object.getPrototypeOf(value) === null || Object === value.constructor;
    }

    exports.call = call;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
