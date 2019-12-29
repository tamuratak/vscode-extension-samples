import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const rootUrl = vscode.Uri.file(context.extensionPath)
    let inset: vscode.WebviewEditorInset
    let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        if (!vscode.window.activeTextEditor) {
            return;
        }

        inset = vscode.window.createWebviewTextEditorInset(
            vscode.window.activeTextEditor, 5, 10,
            { localResourceRoots: [ rootUrl ] }
            );
        inset.onDidDispose(() => {
            console.log('WEBVIEW disposed...');
        });
        inset.webview.html = getHtml(rootUrl);

    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.increaseHeight', () => {
        inset && inset.updateHeight(inset.height+5)
    })
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.decreaseHeight', () => {
        inset && inset.updateHeight(inset.height-5)
    })
    context.subscriptions.push(disposable);
}

function getHtml(rootUrl: vscode.Uri) {
    const png = rootUrl.with( { scheme: 'vscode-resource', path: path.join(rootUrl.path, './circle.png') }).toString()
    return `<img src="${png}"/>`
}


// this method is called when your extension is deactivated
export function deactivate() {}
