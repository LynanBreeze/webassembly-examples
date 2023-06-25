importScripts("add.js");
let wasmInstance = null;
const init = async () => {
  wasmInstance = (await Module()).asm;
};
init();

onmessage = async function (e) {
  console.log("Worker: Message received from main script");
  const { type, params } = e.data;
  const { functionName, arguments } = params || {};
  if (type === "excute") {
    if (!wasmInstance) {
      await init();
    }
    postMessage({ params, result: wasmInstance[functionName](...arguments) });
  }
};
