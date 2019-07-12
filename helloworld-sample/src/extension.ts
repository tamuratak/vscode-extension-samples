import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const rootUrl = vscode.Uri.file(context.extensionPath)
  const disposable = vscode.commands.registerCommand('extension.helloWorld', async (args, brgs, crgs) => {
    if (!vscode.window.activeTextEditor) {
      return;
    }
    
    const panel = vscode.window.createWebviewPanel(
      'catCoding',
      'Cat Coding',
      { preserveFocus: true, viewColumn: vscode.ViewColumn.Beside },
      { enableScripts: true, localResourceRoots: [ rootUrl ],
        portMapping : [{webviewPort: 3000, extensionHostPort: 4000}]
        }
    );
    panel.webview.html = getHtml();
  });
  context.subscriptions.push(disposable);
}

function getHtml() {
	return `
<!DOCTYPE html><html>
<img src='http://127.0.0.1:3000/?file=abc' />
`
}


// this method is called when your extension is deactivated
export function deactivate() {}