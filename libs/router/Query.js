"use strict";
exports.__esModule = true;
var Query = /** @class */ (function () {
    function Query() {
    }
    Query.prototype.build_query_path = function (params) {
        var spath = '';
        for (var i in params) {
            spath += i + '=' + params[i] + '&';
        }
        if (spath) {
            spath = spath.substr(0, spath.length - 1);
        }
        return spath;
    };
    Query.prototype.parse_query_path = function (path) {
        var params = {};
        var tparams = path.split('&');
        tparams.forEach(function (element) {
            var item = element.split('=');
            if (item[0] && item[1]) {
                params[item[0]] = item[1];
            }
        });
        return params;
    };
    return Query;
}());
exports["default"] = Query;
