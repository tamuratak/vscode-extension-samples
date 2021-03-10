import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const rootUrl = vscode.Uri.file(context.extensionPath)
  const disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
    if (!vscode.window.activeTextEditor) {
      return;
    }
    
    const panel = vscode.window.createWebviewPanel(
      'catCoding',
      'Cat Coding',
      { viewColumn: vscode.ViewColumn.Beside },
      { enableScripts: true, localResourceRoots: [] }
    );
    panel.webview.html = getHtml();
  });
  context.subscriptions.push(disposable);
}

function getHtml() {
	return `
<!DOCTYPE html><html><head>

</head>
<img src="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/tiger.svg" style="width: 100%">
`
}
// this method is called when your extension is deactivated
export function deactivate() {}