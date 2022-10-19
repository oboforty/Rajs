import { as_async } from "./convenience";

export class FileDescriptor {
    constructor(intype, ...params) {
        this._blob = null;
        this._bytes = null;
        this._url = null;

        this._mime = null;
        this._filename = null;

        switch(intype) {
            case 'blob': case 'file': 
                this._blob = params[0];
                this._mime = params[1] || this._blob.type;
                this._filename = params[2] || this._blob.name;
                break;
            case 'array': case 'bytes':
                this._bytes = params[0];
                this._mime = params[1] || null;
                this._filename = params[2] || null;
                break;
            case 'url':
                this._url = params[0];
                this._mime = params[1] || null;
                this._filename = params[2] || null;
                break;
            default:
                console.error("unkonwn file descriptor", intype);
                break;
        }
    }

    get blob() {
        if (this._blob == null) {
            if (this._bytes != null)
                this._blob = convert_bytes_to_blob(this._bytes, this._mime);
            else if (this._url != null)
                return convert_url_to_blob(this._url, this.mime, this.filename).then(p=>{
                    this._blob = p;
                    return this._blob;
                });
        }

        return as_async(this._blob);
    }

    get bytes() {
        if (this._bytes == null) {
            if (this._blob != null)
                return convert_blob_to_bytes(this._blob).then(p=>{
                    this._bytes = p;
                    return this._bytes;
                });
            else if (this._url != null)
                return convert_url_to_bytes(this._url).then(p=>{
                    this._bytes = p;
                    return this._bytes;
                });
        }

        return as_async(this._bytes);
    }

    get url() {
        if (this._url == null) {
            if (this._blob != null)
                this._url = convert_blob_to_url(this._blob);
            else if (this._bytes != null)
                this._url = convert_bytes_to_url(this._bytes, this._mime);
        }

        return as_async(this._url);
    }

    get mime() {
        return this._mime;
    }

    get filename() {
        return this._filename;
    }

    get checksum() {
        if (this._checksum == null) {
            // get md5 of byte array
            this.bytes.then((bytes)=>{
                console.error('TODO: Get md5 of bytes file');
            });
        }

        return as_async(this._checksum);
    }

    async download() {
        if (this._url != null) {
            // download by cached url

            window.open(this._url);
            return;
        }

        // download by content (blob/bytes):
        const blob = await this.blob;
        const filename = this.filename;

        if (navigator.msSaveBlob) {
          // IE 10+
          navigator.msSaveBlob(blob, filename);
        } else {
          const link = document.createElement('a');
  
          // Browsers that support HTML5 download attribute
          if (link.download !== undefined) {
            let url;
            
            console.log(blob)
            // download straight from URL
            // if (this.url != null)
            //     url = this.url;
            // else
                // @Todo: later: call this.url ?
                url = convert_blob_to_url(blob);
                console.log(url)

            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
    }
}

async function convert_blob_to_bytes(blob, encoding) {
    encoding = encoding || "UTF-8";

    return new Promise((resolve, reject) => {
        let reader = new FileReader();
    
        reader.onload = () => {
        // evt.target.result;
          resolve(reader.result);
        };
        reader.onerror = reject;

        reader.readAsArrayBuffer(blob);
    });
}

function convert_bytes_to_blob(bytes, mime) {
    // convert bytes to blob
    return new Blob([new Uint8Array(bytes)], {type: mime});
}

async function convert_url_to_blob(url) {
    return fetch(url).then((resp) => {
        return resp.blob();
    });
}

async function convert_url_to_bytes(url) {
    return fetch(url).then((resp) => {
        return resp.arrayBuffer();
    });
}

function convert_blob_to_url(blob) {
    const _url = window.URL || window.webkitURL;
    return _url.createObjectURL(blob);
}

function convert_bytes_to_url(bytes, mime) {
    // bytes ot blob and then blob to url
    const __blob = new Blob([bytes], { type: mime });
    //const __blob = convert_bytes_to_blob(bytes, mime);

    return convert_blob_to_url(__blob);
}