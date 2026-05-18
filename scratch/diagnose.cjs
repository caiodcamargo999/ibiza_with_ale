const ts = require('typescript');
const fs = require('fs');

const filename = 'c:/Users/lenovo/Desktop/DIGITAL MARKETING/03_SOFTWARE, AI AND APP DEVELOPMENT/Rarity Projects/01_Clients Projects/Cilex Ibiza/website_alessandra_ibiza/src/components/TypeformPopup.tsx';
const program = ts.createProgram([filename], { jsx: ts.JsxEmit.ReactJSX });
const diagnostics = ts.getPreEmitDiagnostics(program);

for (const diag of diagnostics) {
  if (diag.file && diag.file.fileName.includes('TypeformPopup')) {
    const { line, character } = ts.getLineAndCharacterOfPosition(diag.file, diag.start);
    console.log(`Error: ${diag.messageText} at line ${line + 1}, col ${character + 1}`);
  }
}
