"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Router_1 = require("./Router");
var WRouter = /** @class */ (function (_super) {
    __extends(WRouter, _super);
    function WRouter(routers, launth) {
        var _this = _super.call(this, routers) || this;
        _this.wx = launth;
        return _this;
    }
    WRouter.prototype.go = function (path) {
        switch (this.type) {
            case 'redirectTo':
                this.wx.redirectTo({
                    url: path
                });
                break;
            case 'navigateTo':
                this.wx.navigateTo({
                    url: path
                });
                break;
        }
        return _super.prototype.go.call(this, path);
    };
    WRouter.prototype.back = function (path) {
        this.type = 'back';
        _super.prototype.back.call(this, path);
    };
    WRouter.prototype.redirectTo = function (path) {
        this.type = 'redirectTo';
        this._push(path);
    };
    WRouter.prototype.push = function (path) {
        this.type = 'navigateTo';
        this._push(path);
    };
    return WRouter;
}(Router_1["default"]));
exports["default"] = WRouter;
