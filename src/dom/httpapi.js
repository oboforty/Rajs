export class HttpApi {
    constructor(url, at) {
        this.base_url = url;
        this.post_url = {};
        this.access_token = at;

        if (this.base_url[this.base_url.length-1] != '/')
            this.base_url += '/'

        this.options = (a,b)=>b;
    }

    request_callback(group, data, cb) {
        if (data == null)
            data = {};
        if (cb === undefined && typeof data === 'function') {
            cb = data;
            data = {};
        }

        return this.request(group, data).then(cb);
    }

    async request(group, data, headers={}) {
        // @todo: later: how to rate limit anonymous user?
        //   if (access_token == null)
        //     throw "access_token not provided";
        const method = group.split(' ')[0].toUpperCase();

        // normalize url to call
        let _url = group.substr(method.length+1, group.length);
        _url = _url.replace('//', '/');
        _url = _url.replace('//', '/');
        _url = _url.replace('//', '/');
        if (_url[0] == '/')
            _url = _url.substring(1);
        
        if (method == 'GET') {
            data = Object.assign({}, this.post_url, data);

            if (Object.keys(data).length > 0)
                _url += '?' + Object.keys(data).map(key => key + '=' + data[key]).join('&');
        }

        if (!headers['Content-Type'])
            headers['Content-Type'] = 'application/json';
        if (!headers['Authorization'] && this.access_token)
            headers['Authorization'] = 'bearer ' + this.access_token;

        const resp = await fetch(this.base_url+_url, this.options(group, {
            method: method,
            mode: this.mode||'cors',
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            credentials: 'omit',
            body: method == 'GET' ? undefined : JSON.stringify(data),
            headers
        }));

        let content = await resp.text();

        if (resp.headers['content-type'] === 'application/json' || !resp.headers['content-type']) {
          try {
            const js = JSON.parse(content);
            content = js;
          } catch {};
        }

        if (resp.status <= 300)
          return content;
        else
          throw {
            ...resp,
            status: resp.status,
            body: content
          };
    }
}
