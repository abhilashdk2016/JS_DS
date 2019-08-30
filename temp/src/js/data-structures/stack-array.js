"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StackArray = /** @class */ (function () {
    function StackArray() {
        this.items = [];
    }
    StackArray.prototype.push = function (element) {
        this.items.push(element);
    };
    StackArray.prototype.pop = function () {
        return this.items.pop();
    };
    StackArray.prototype.peek = function () {
        return this.items[this.items.length - 1];
    };
    StackArray.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    StackArray.prototype.size = function () {
        return this.items.length;
    };
    StackArray.prototype.toArray = function () {
        return this.items;
    };
    StackArray.prototype.toString = function () {
        return this.items.toString();
    };
    StackArray.prototype.clear = function () {
        this.items = [];
    };
    return StackArray;
}());
exports.default = StackArray;
