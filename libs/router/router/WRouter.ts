import Router from './Router';
class WRouter extends Router
{
    protected type : String;
    protected wx : Object;

    constructor (routers : Array<{path: String, meta: {}}>, launth : Object)
    {
        super(routers);
        this.wx = launth;
    }

    protected go (path : String) : String
    {
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
        return super.go(path);
    }

    back ( path: number )
    {
        this.type = 'back';
        super.back(path);
    }

    redirectTo(path : (String | {path: String, params: Object}))
    {
        this.type = 'redirectTo';
        this._push(path);
    }

    push(path : (String | {path: String, params: Object}))
    {
        this.type = 'navigateTo';
        this._push(path);
    }
}

export default WRouter;