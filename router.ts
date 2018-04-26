
import Query from './query';
class Router
{
    protected routers : Array<{path: String, meta: {}}>;
    protected routerStack : Array<String>;
    protected to : Object;
    protected from : Object;
    protected stack : Array<String>;
    public beforeEach : (to:Object, from : Object, next: Function) => {};
    public afterEach : (to:Object, from : Object) => {};
    protected query : Query;


    constructor (routers : Array<{path: String, meta: {}}>)
    {
        this.stack = [];
        this.routerStack = [];
        this.beforeEach = null;
        this.afterEach = null;
        this.parseRouters(routers);
        this.query = new Query();
    }

    protected parseRouters(routers : Array<{path: String, meta: {}}>)
    {
        let _self = this;
        routers.forEach(element => {
            _self.routerStack.push(element.path);
        });

        this.routers = routers;
    }

    protected getCurRoute(path)
    {
        let index = this.routerStack.indexOf(path);
        if (index >= 0) {
            return this.routers[index];
        }

        throw new Error(path +' not found');
    }

    protected parsePath (path : (String | {path: String, params: Object})) : string
    {
        if (typeof path == 'string') {
            let tpath = path.split('?');
            this.to = {
                fullpath: path,
                params: {...this.query.parse_query_path(tpath[1] ? tpath[1] : '')},
                ...this.getCurRoute(tpath[0])
            };
            return path;
        } else {
            if (!path['path']) {
                throw new Error('path not be empty');
            }
            let fullpath = path['path'] + '?' + this.query.build_query_path(path['params'] ? path['params'] : {});
            this.to = {
                fullpath: fullpath,
                ...path,
                ...this.getCurRoute(path['path'])
            };
            return fullpath;
        }
    }

    protected _push(path : (String | {path: String, params: Object}))
    {
        if (!this.beforeEach) {
            path = this.parsePath(path);
            this.from = this.to;
            this.stack.push(path);
            this.go(path);
        } else {
            let _self = this;
            this.from = this.to;
            var dpath = _self.parsePath(path);
            this.stack.push(dpath);
            this.beforeEach(this.to, this.from, function (path : (String | {path: String, params: Object})  = null) {
                if (!path) {
                    _self.go(dpath);  
                } else {
                    _self._push(path);
                }
            });
        }
    }

    back ( path: number )
    {
        if (path >= 0) {
            return ;
        }

        path = -path;
        if (path > this.stack.length) {
            return ;
        }

        this.go(this.stack[(this.stack.length - path)]);
    }

    protected go (path : String) : String
    {
        if (this.afterEach) {
            this.afterEach(this.to, this.from);
        }
        return path;
    }
}

export default Router;