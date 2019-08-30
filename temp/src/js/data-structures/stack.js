"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stack = /** @class */ (function () {
    function Stack() {
        this.count = 0;
        this.items = {};
    }
    Stack.prototype.isEmpty = function () {
        return this.count === 0;
    };
    Stack.prototype.size = function () {
        return this.count;
    };
    Stack.prototype.push = function (element) {
        this.items[this.count] = element;
        this.count++;
    };
    Stack.prototype.pop = function () {
        if (this.isEmpty()) {
            return null;
        }
        this.count--;
        var element = this.items[this.count];
        delete this.items[this.count];
        return element;
    };
    Stack.prototype.peek = function () {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.count - 1];
    };
    Stack.prototype.clear = function () {
        this.items = {};
        this.count = 0;
    };
    Stack.prototype.toString = function () {
        if (this.isEmpty()) {
            return '';
        }
        var result = "" + this.items[0];
        for (var i = 1; i < this.count; i++) {
            result += ", " + this.items[i];
        }
        return result;
    };
    return Stack;
}());
exports.default = Stack;
