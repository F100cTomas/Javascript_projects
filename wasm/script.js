const memory = new WebAssembly.Memory({ initial: 1 });

const importObject = {
    console: {
      log(arg) {
        console.log(arg);
      },
      write(ptr, length) {
        const bytes = new Uint8Array(memory.buffer, ptr, length);
        const string = new TextDecoder("utf8").decode(bytes);
        console.log(string);
      },
    },
    js: {
        memory: memory,
    }
  };
  
  WebAssembly.instantiateStreaming(fetch("wasm.wasm"), importObject).then(
    (obj) => {
        console.log(obj.instance.exports.main());
    },
  );
  