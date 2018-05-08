"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Query_1 = require("./Query");
var Router = /** @class */ (function () {
    function Router(routers) {
        this.stack = [];
        this.routerStack = [];
        this.beforeEach = null;
        this.afterEach = null;
        this.parseRouters(routers);
        this.query = new Query_1["default"]();
    }
    Router.prototype.parseRouters = function (routers) {
        var _self = this;
        routers.forEach(function (element) {
            _self.routerStack.push(element.path);
        });
        this.routers = routers;
    };
    Router.prototype.getCurRoute = function (path) {
        var index = this.routerStack.indexOf(path);
        if (index >= 0) {
            return this.routers[index];
        }
        throw new Error(path + ' not found');
    };
    Router.prototype.parsePath = function (path) {
        if (typeof path == 'string') {
            var tpath = path.split('?');
            this.to = __assign({ fullpath: path, params: __assign({}, this.query.parse_query_path(tpath[1] ? tpath[1] : '')) }, this.getCurRoute(tpath[0]));
            return path;
        }
        else {
            if (!path['path']) {
                throw new Error('path can not be empty');
            }
            var fullpath = path['path'] + '?' + this.query.build_query_path(path['params'] ? path['params'] : {});
            this.to = __assign({ fullpath: fullpath }, path, this.getCurRoute(path['path']));
            return fullpath;
        }
    };
    Router.prototype._push = function (path) {
        if (!this.beforeEach) {
            path = this.parsePath(path);
            this.from = this.to;
            this.stack.push(path);
            this.go(path);
        }
        else {
            var _self_1 = this;
            this.from = this.to;
            var dpath = _self_1.parsePath(path);
            this.stack.push(dpath);
            this.beforeEach(this.to, this.from, function (path) {
                if (path === void 0) { path = null; }
                if (!path) {
                    _self_1.go(dpath);
                }
                else {
                    _self_1._push(path);
                }
            });
        }
    };
    Router.prototype.back = function (path) {
        if (path >= 0) {
            return;
        }
        path = -path;
        if (path > this.stack.length) {
            return;
        }
        this.go(this.stack[(this.stack.length - path)]);
    };
    Router.prototype.go = function (path) {
        if (this.afterEach) {
            this.afterEach(this.to, this.from);
        }
        return path;
    };
    return Router;
}());
exports["default"] = Router;
