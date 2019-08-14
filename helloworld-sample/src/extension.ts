import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const rootUrl = vscode.Uri.file(context.extensionPath);
    const disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
        const insetArray: Array<[vscode.WebviewEditorInset, vscode.Range]> = []
        for (let i = 0; i < 30; i++) {
            const line = 20 * i;
            const editor = vscode.window.activeTextEditor;
            const insetRange = new vscode.Range(line, 0, line + 6, 0);
            if (!editor) {
                return;
            }
            const inset = vscode.window.createWebviewTextEditorInset(
                editor, line, 6,
                { localResourceRoots: [ rootUrl ] }
            )
            inset.onDidDispose(() => {
                console.log('WEBVIEW disposed...');
            });
            insetArray.push([inset, insetRange]);
            const range = editor.visibleRanges[0]
            if (!range) {
                continue;
            }
            if (insetRange.intersection(range)) {
                const webview = await inset.createWebview()
                if (webview) {
                    webview.html = getHtml();   
                }
            }
        }

        vscode.window.onDidChangeTextEditorVisibleRanges( async (e) => {
            for (const [inset, insetRange] of insetArray) {
                const range = e.visibleRanges[0]
                if (!range) {
                    return;
                }
                if (insetRange.intersection(range)) {
                    const webview = await inset.createWebview()
                    if (webview) {
                        webview.html = getHtml();   
                    }
                } else {
                    inset.disposeWebview();
                }
            }
        })
    });
    context.subscriptions.push(disposable);
}

function getHtml() {
    return `<img src="https://raw.githubusercontent.com/microsoft/vscode/master/resources/win32/code_150x150.png"/>`
}

// this method is called when your extension is deactivated
export function deactivate() {}
