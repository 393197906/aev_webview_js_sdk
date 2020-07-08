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

    var _prefix = "$a_";
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
        var combination = [methodName, JSON.stringify(params)];
        if (callback) {
            var callBackName = generateCallBackName(methodName);
            combination.push(callBackName);
            window[callBackName] = callback;
        }
        var combinationString = combination.filter(function (item) { return !!item; }).map(function (item) { return addPrefix(item); }).join(_splitTag);
        if (!window.AevApi)
            throw new AevWebViewError("当前不在aevwebview环境，请检查你的环境");
        window.AevApi.postMessage(combinationString);
    }

    exports.call = call;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
