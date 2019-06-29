import * as vscode from 'vscode';
import * as path from 'path';


function getHtml(rootUrl: vscode.Uri) {
    const png = rootUrl.with( { scheme: 'vscode-resource', path: path.join(rootUrl.path, './sample.png') }).toString()
    return `<img src="${png}"/>`
}



export function activate(context: vscode.ExtensionContext) {
    const rootUrl = vscode.Uri.file(context.extensionPath);
    const insetMap: Map<vscode.WebviewEditorInset, boolean> = new Map();
    const insetPositionMap: Map<number, boolean> = new Map();
    const disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {

        vscode.window.onDidChangeTextEditorVisibleRanges( (e) => {
            const range = e.visibleRanges[0]
            if (!vscode.window.activeTextEditor || !range) {
                return;
            }
            for (let i = 0; i < 600; i = i + 30) {
                if (insetPositionMap.has(i) && insetPositionMap.get(i)) {
                    continue
                }
                if (range.start.line - i > 40 || i - range.end.line > 40) {
                    continue
                }
                const inset = vscode.window.createWebviewTextEditorInset(
                    vscode.window.activeTextEditor, i, 3,
                    { localResourceRoots: [ rootUrl ] }
                )
                inset.onDidDispose(() => {
                    console.log('WEBVIEW disposed...');
                    insetPositionMap.set(i, false);
                });
                inset.webview.html = getHtml(rootUrl);
                insetMap.set(inset, true);
                insetPositionMap.set(i, true);
            }
            for (const oldInset of insetMap.keys()) {
                if (range.start.line - oldInset.line > 60 || oldInset.line - range.end.line > 60) {
                    oldInset.dispose();
                    insetMap.delete(oldInset)
                }
            }
        });
    });
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
