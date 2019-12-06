"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const valuePattern=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;function jsonToHtml(e){const t=JSON.stringify(e,void 0,1).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(valuePattern,valueReplacer).replace(/\n/g,"<br />").replace(/  /g,"&nbsp;&nbsp;");return getJsonToHtmlTemplate(t)}exports.default=jsonToHtml;const valueReplacer=e=>'<span class="'+getClassName(e)+'">'+e+"</span>",getClassName=e=>/^"/.test(e)&&/:$/.test(e)?"key":/^"/.test(e)?"string":/true|false/.test(e)?"boolean":/null/.test(e)?"null":"number",getJsonToHtmlTemplate=e=>{if(/^{/.test(e)&&/}$/.test(e)){const t=e.substr(1,e.length-2).replace("<br />","");e=e.substr(0,1)+`<div class="main">${t}</div>`+e.substr(-1)}return`\n<html>\n<head>\n<style>\nbody{margin: 0;background: #2c2c2c;color: #AAA;font-size:16px;}\ncode {word-spacing: 2px;min-height: 100vh;}\ncode pre {outline: 1px solid #ccc;padding: 5px;margin: 5px;}\ncode .string {color: #6b8753;}\ncode .number {color: #6997C0;}\ncode .boolean {color: #cd7a1c;font-weight: bold;}\ncode .null {color: #cd7a1c;font-weight: bold;}\ncode .key {color: #9776ae;font-weight: bold;}\n</style>\n</head>\n<body>\n<code>${e}</code>\n</body>\n</html>`};