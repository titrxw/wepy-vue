class Query
{
    build_query_path(params : Object) : String
    {
        let spath = '';
        for (let i in params)
        {
            spath += i + '=' + params[i] + '&';
        }
        if (spath) {
            spath = spath.substr(0, spath.length - 1);
        }

        return spath;
    }

    parse_query_path(path : String) : Object
    {
        let params = {};
        let tparams = path.split('&');
        tparams.forEach((element) => {
            let item = element.split('=');
            if (item[0] && item[1]) {
                params[item[0]] = item[1]
            }
        })

        return params;
    }
}

export default Query;