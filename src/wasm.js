

function load_wasm(file, importObject) {

  WebAssembly.instantiateStreaming(fetch(file), importObject)
  .then(results => {

  });

}