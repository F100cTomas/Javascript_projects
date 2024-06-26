const importObject = {
  jscall: {
    write(str, length) {
      const bytes = new Uint8Array(importObject.memory.mem.buffer, str, length);
      const string = new TextDecoder("utf8").decode(bytes);
      console.log(string);
    }
  },
  memory: {
    mem: new WebAssembly.Memory({ initial: 0 })
  }
};

WebAssembly.instantiateStreaming(fetch("utils.wasm"), importObject).then(
  (obj) => {
    importObject.utils = obj.instance.exports;
    WebAssembly.instantiateStreaming(fetch("main.wasm"), importObject).then(
      (obj) => {
        const exports = obj.instance.exports;
        console.log(exports.main());
      }
    );
  }
);