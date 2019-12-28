import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const rootUrl = vscode.Uri.file(context.extensionPath)
    const disposable = vscode.commands.registerCommand('extension.helloWorld', async (args, brgs, crgs) => {
        if (!vscode.window.activeTextEditor) {
            return;
        }

        const inset = vscode.window.createWebviewTextEditorInset(
            vscode.window.activeTextEditor, 5, 30,
            { localResourceRoots: [ rootUrl ] }
            );
        inset.onDidDispose(() => {
            console.log('WEBVIEW disposed...');
        });
        inset.webview.html = getHtml(rootUrl);
        setTimeout(() => {
            inset.updateHeight(3)
        }, 5000)

        /* the following works well.
        const panel = vscode.window.createWebviewPanel(
            'catCoding',
            'Cat Coding',
            vscode.ViewColumn.One,
            {
              localResourceRoots: [ rootUrl ]
            }
          );
        panel.webview.html = getHtml(rootUrl); 
        */
    });
	context.subscriptions.push(disposable);
}

function getHtml(rootUrl: vscode.Uri) {
    const png = rootUrl.with( { scheme: 'vscode-resource', path: path.join(rootUrl.path, './circle.png') }).toString()
    return `<img src="${png}"/>`
}


// this method is called when your extension is deactivated
export function deactivate() {}
