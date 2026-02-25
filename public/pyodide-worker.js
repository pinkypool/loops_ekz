// This is a web worker that runs Pyodide

importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

let pyodideReadyPromise;

async function loadPyodideAndPackages() {
  // @ts-ignore
  self.pyodide = await loadPyodide();
}

pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  const { id, code, testCases } = event.data;
  
  if (!code) {
    return;
  }

  await pyodideReadyPromise;
  
  // Create a custom stdout and stderr collector
  let stdoutMessages = [];
  let stderrMessages = [];
  
  // @ts-ignore
  self.pyodide.setStdout({ batched: (msg) => stdoutMessages.push(msg) });
  // @ts-ignore
  self.pyodide.setStderr({ batched: (msg) => stderrMessages.push(msg) });

  try {
    // Basic execution
    // @ts-ignore
    await self.pyodide.runPythonAsync(code);
    
    // If there are test cases, we inject and run them
    let testResults = [];
    if (testCases && testCases.length > 0) {
       for (let i = 0; i < testCases.length; i++) {
         let testCode = testCases[i];
         // Inject the user's code into the test case template
         if (testCode.includes('{{USER_CODE}}')) {
             testCode = testCode.replace('{{USER_CODE}}', code || "");
         }
         
          try {
           // @ts-expect-error type override
           await self.pyodide.runPythonAsync(testCode);
           testResults.push({ passed: true, index: i });
         } catch (err) {
           let errorMsg = err.message;
           // Parse AssertionError to only show the message
           if (errorMsg.includes('AssertionError:')) {
             const parts = errorMsg.split('AssertionError:');
             if (parts.length > 1) {
               errorMsg = parts[1].trim();
             }
           }
           testResults.push({ passed: false, index: i, error: errorMsg });
         }
       }
    }

    self.postMessage({
      id,
      success: true,
      stdout: stdoutMessages.join("\n"),
      stderr: stderrMessages.join("\n"),
      testResults
    });
  } catch (error) {
    self.postMessage({
      id,
      success: false,
      error: error.message,
      stdout: stdoutMessages.join("\n"),
    });
  }
};
