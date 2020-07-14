"use strict";
/*
 * @Author: Innei
 * @Date: 2020-05-23 14:31:11
 * @LastEditTime: 2020-05-23 14:59:51
 * @LastEditors: Innei
 * @FilePath: /mx-web/utils/observable.ts
 * @MIT
 */
exports.__esModule = true;
exports.Observable = void 0;
var Observable = /** @class */ (function () {
    function Observable() {
        this.observers = [];
    }
    Observable.prototype.on = function (event, handler) {
        var isExist = this.observers.some(function (_a) {
            var id = _a.id, callback = _a.callback;
            if (id === event && handler === callback) {
                return true;
            }
            return false;
        });
        if (!isExist) {
            this.observers.push({
                id: event,
                callback: handler
            });
        }
    };
    Observable.prototype.emit = function (event, payload) {
        var _this = this;
        this.observers.map(function (_a) {
            var id = _a.id, callback = _a.callback;
            if (id === event) {
                callback.call(_this, payload);
            }
        });
    };
    Observable.prototype.off = function (event, handler) {
        if (handler) {
            var index = this.observers.findIndex(function (_a) {
                var id = _a.id, callback = _a.callback;
                return id === event && callback === handler;
            });
            if (index !== -1) {
                this.observers.splice(index, 1);
            }
        }
        else {
            var observers_1 = [];
            this.observers.map(function (observer) {
                if (observer.id !== event) {
                    observers_1.push(observer);
                }
            });
            this.observers = observers_1;
        }
    };
    return Observable;
}());
exports.Observable = Observable;
exports["default"] = new Observable();
