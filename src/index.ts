const valuePattern = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g

export default function jsonToHtml(content: any) {
  const json = JSON.stringify(content, undefined, 1)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(valuePattern, valueReplacer)
    .replace(/\n/g, '<br />')
    .replace(/  /g, '&nbsp;&nbsp;')
  return getJsonToHtmlTemplate(json)
}

const valueReplacer = (match: string) => '<span class="' + getClassName(match) + '">' + match + '</span>'

const getClassName = (match: string) => {
  if (/^"/.test(match) && /:$/.test(match)) return 'key'
  if (/^"/.test(match)) return 'string'
  if (/true|false/.test(match)) return 'boolean'
  if (/null/.test(match)) return 'null'
  return 'number'
}

const getJsonToHtmlTemplate = (json: string) => {
  if (/^{/.test(json) && /}$/.test(json)) {
    const mainContent = json.substr(1, json.length - 2).replace('<br />', '')
    json = json.substr(0, 1) + `<div class="main">${mainContent}</div>` + json.substr(-1)
  }
  return `
<html>
<head>
<style>
body{margin: 0;background: #2c2c2c;color: #AAA;font-size:16px;}
code {word-spacing: 2px;min-height: 100vh;}
code pre {outline: 1px solid #ccc;padding: 5px;margin: 5px;}
code .string {color: #6b8753;}
code .number {color: #6997C0;}
code .boolean {color: #cd7a1c;font-weight: bold;}
code .null {color: #cd7a1c;font-weight: bold;}
code .key {color: #9776ae;font-weight: bold;}
</style>
</head>
<body>
<code>${json}</code>
</body>
</html>`
}
