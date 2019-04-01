import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World!');
        const editor = vscode.window.activeTextEditor
        const panel = vscode.window.createWebviewPanel('sample', 'Sample', vscode.ViewColumn.Active, {
            enableScripts: true,
            retainContextWhenHidden: true
        })
        panel.webview.html = 'abc'
        if (editor) {
            vscode.window.showTextDocument(editor.document, editor.viewColumn)
        }
    });
    context.subscriptions.push(disposable);
}
export function deactivate() {}
